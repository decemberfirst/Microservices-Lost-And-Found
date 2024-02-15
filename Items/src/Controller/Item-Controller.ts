import { NextFunction, Request, Response } from 'express';
import { Aggregate } from 'mongoose';
import User from '../Modal/User';
import { Item } from '../Modal/Item';
import { CatchAsync, Subjects } from '@codishrohan/common';
import { Appeal } from '../Modal/Appeal';
import { AppError } from '@codishrohan/common';
import { ItemCreatedPublisher } from '../Events/ItemCreatedPublisher';
import { amqpInstance } from '@codishrohan/common';
import { uploadFile } from './Google_Cloud_Blob';
import { Readable } from 'stream';

const MAX_DISTANCE = 100000; // 20km

type UserDoc = {
  username: string;
  profilePicture: string;
  email: string;
  _id: string;
  userLocation: {
    type: string;
    coordinates: [number, number];
  };
};

export const registerItem = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.registeredBy = req.user?.id;
    req.body.lostLocation = JSON.parse(req.body.lostLocation);

    const points: [number, number] = [
      Number(req.body.lostLocation.coordinates[0]),
      Number(req.body.lostLocation.coordinates[1]),
    ];

    const itemImages = [] as string[];
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      for (const file of req.files as Express.Multer.File[]) {
        const fileBuffer = file.buffer;
        const fileName = `${Date.now()}-${file.originalname}`;

        await uploadFile(Readable.from(fileBuffer), fileName);
        itemImages.push(
          `https://storage.googleapis.com/rohansbucke/${fileName}`
        );
      }
    }
    req.body.itemImages = itemImages;
    const item = await Item.create(req.body);

    const aggregateResult: Aggregate<UserDoc[]> = User.aggregate<UserDoc>([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: points,
          },
          spherical: true,
          distanceField: 'distance',
          maxDistance: MAX_DISTANCE,
        },
      },
      {
        $project: {
          email: 1,
          _id: 0,
        },
      },
    ]);

    const nearByUsers: UserDoc[] = await aggregateResult.exec();
    new ItemCreatedPublisher(amqpInstance.client).start().publishMessage({
      subject: Subjects.ItemCreated,
      data: {
        itemCategory: item.itemCategory,
        nearByUsers: nearByUsers,
        type: item.postType,
        itemLink: `reclamify.com/api/v1/items/${item._id}`,
      },
    });

    res.status(201).json({
      message: 'Item registered successfully',
      item,
      nearByUsers,
    });
  }
);

export const getAllItems = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?.id);
    if (!user) return next(new AppError('User not found', 404));

    const items = await Item.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: user.userLocation.coordinates,
          },
          spherical: true,
          distanceField: 'distance',
          maxDistance: MAX_DISTANCE,
          distanceMultiplier: 0.001, // to convert meters to km
        },
      },
    ]);

    let populatedItems: any = await Item.populate(items, {
      path: 'registeredBy appeals',
    });

    populatedItems = await User.populate(populatedItems, {
      path: 'appeals.appealedBy',
      select: 'username profilePicture',
    });

    console.log(populatedItems);
    res.status(200).json(populatedItems);
  }
);

export const getMyItems = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) return next(new AppError('User not found', 404));
    const userItems = await Item.find({ registeredBy: userId }).populate({
      path: 'registeredBy',
      select: 'username ',
    });

    res.status(200).json(userItems);
  }
);

export const getSingleItem = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  }
);

export const AppealForItem = CatchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    request.body.item = request.params.id;
    request.body.appealedBy = request.user?.id;

    const item = await Item.findById(request.params.id);
    if (!item) return next(new AppError('Item not found', 404));
    if (item.postType === 'FOUND') {
      request.body.appealType = 'CLAIM-FOUND';
    } else {
      request.body.appealType = 'CLAIM-MY';
    }

    const AppealedDOC = await Appeal.create(request.body);
    response.status(201).json({
      message: 'Appeal created successfully',
      AppealedDOC,
    });
  }
);

export const AcceptAppeal = CatchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { appealId } = request.params;
    const { itemId } = request.params;

    const appealDoc = await Appeal.findById(appealId);
    if (!appealDoc)
      return next(new AppError('No appeal found with that id', 404));

    const itemDOC = await Item.findOne({
      _id: itemId,
      registeredBy: request.user?.id,
    });
    if (!itemDOC)
      return next(
        new AppError('You dont have permission to do this operation', 404)
      );
    if (itemDOC.hasOwnerClaimed)
      return next(new AppError('Item was already claimed', 400));

    itemDOC.hasOwnerClaimed = true;
    appealDoc.isAccepted = true;

    await itemDOC.save();
    await appealDoc.save();

    response.status(200).json({
      message: 'Appeal accepted successfully',
    });
  }
);
