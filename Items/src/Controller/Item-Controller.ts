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

const MAX_DISTANCE = 30000; // 30 km

type UserDoc = {
  username: string;
  profilePicture: string;
  email: string;
  _id: string;
  userLocation: {
    type: string;
    coordinates: [number, number];
  };
  Tokens: number;
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
    try {
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
        // Separate $match stage for filtering non-claimed items
        {
          $match: {
            hasOwnerClaimed: false,
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

      // Sort populatedItems by distance in ascending order
      populatedItems.sort((a: any, b: any) => a.distance - b.distance);

      res.status(200).json(populatedItems);
    } catch (err) {
      next(err);
    }
  }
);

export const getMyItems = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) return next(new AppError('User not found', 404));

    const userItems = await Item.find({ registeredBy: userId });

    let populatedItems: any = await Item.populate(userItems, [
      { path: 'registeredBy', select: 'username profilePicture _id' },
      {
        path: 'appeals',
        populate: { path: 'appealedBy', select: 'username profilePicture _id' },
      },
    ]);

    res.status(200).json(populatedItems.reverse());
  }
);
export const editItem = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError('Item not found', 404));
  await Item.findByIdAndUpdate(id, {
    itemDescription: req.body.itemDescription,
    itemCategory: req.body.itemCategory,
    postType: req.body.postType,
    itemName: req.body.itemName,
  });

  res.status(200).json({
    message: 'Item updated successfully',
  });
});

export const deleteItem = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError('Item not found', 404));
  const item = await Item.findOneAndDelete({
    registeredBy: req.user?.id,
    _id: id,
  });
  if (!item) return next(new AppError('Item not found', 404));
  res.status(200).json({
    message: 'Item deleted successfully',
  });
});

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

    const appealDoc = await Appeal.findOne({
      appealedBy: { $ne: request.user?.id },
      _id: appealId,
      item: itemId,
    });
    if (!appealDoc) return next(new AppError('Appeal Cant be accepted', 404));

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

    await User.findByIdAndUpdate(appealDoc.appealedBy, {
      $inc: { Tokens: 10 },
    });

    await itemDOC.save();
    await appealDoc.save();

    response.status(200).json({
      message: 'Appeal accepted successfully',
    });
  }
);

export const deleteAppeal = CatchAsync(async (req, res, next) => {
  const { appealId, itemId } = req.params;
  const relevantPost = await Item.findById(itemId);
  if (!relevantPost) return next(new AppError('Item not found', 404));
  console.log(relevantPost.get('registeredBy'));
  if (relevantPost.get('registeredBy').toString() !== req.user?.id)
    return next(
      new AppError('You dont have permission to do this operation', 404)
    );
  const appeal = await Appeal.findOneAndDelete({
    _id: appealId,
    item: itemId,
  });
  if (!appeal) return next(new AppError('Appeal not found', 404));
  res.status(200).json({
    message: 'Appeal deleted successfully',
  });
});

export const getTokens = CatchAsync(async (req, res, next) => {
  const user = await User.findById(req.user?.id);
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({
    tokens: user.Tokens,
  });
});

export const filterItems = CatchAsync(async (req, res, next) => {
  const { filterBy } = req.params;
  if (!filterBy) return next(new AppError('Filter not found', 404));
  let items;
  if (filterBy == 'lost-items') {
    items = await Item.find({ postType: 'LOST' });
  } else if (filterBy == 'found-items') {
    items = await Item.find({ postType: 'FOUND' });
  } else {
    items = await Item.find();
  }
  // populate the items
  let populatedItems: any = await Item.populate(items, [
    { path: 'registeredBy', select: 'username profilePicture _id' },
    {
      path: 'appeals',
      populate: { path: 'appealedBy', select: 'username profilePicture _id' },
    },
  ]);

  res.status(200).json(populatedItems.reverse());
});

export const searchByCategory = CatchAsync(async (req, res, next) => {
  const { category } = req.params;
  if (!category) return next(new AppError('Category not found', 404));
  const items = await Item.find({ itemCategory: category });
  let populatedItems: any = await Item.populate(items, [
    { path: 'registeredBy', select: 'username profilePicture _id' },
    {
      path: 'appeals',
      populate: { path: 'appealedBy', select: 'username profilePicture _id' },
    },
  ]);

  res.status(200).json(populatedItems.reverse());
});
