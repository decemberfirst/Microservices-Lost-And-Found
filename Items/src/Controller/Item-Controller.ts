import { NextFunction, Request, Response } from 'express';
import { Aggregate } from 'mongoose';
import User from '../Modal/User';
import { Item } from '../Modal/Item';
import { CatchAsync, Subjects } from '@codishrohan/common';
import { Appeal } from '../Modal/Appeal';
import { AppError } from '@codishrohan/common';
import { ItemCreatedPublisher } from '../Events/ItemCreatedPublisher';
import { amqpInstance } from '@codishrohan/common';

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
    const item = await Item.create(req.body);

    const aggregateResult: Aggregate<UserDoc[]> = User.aggregate<UserDoc>([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: req.body.lostLocation.coordinates,
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
      message:
        'Item registered successfully and email has been sent to all the users nearby',
      item,
      nearByUsers,
    });
  }
);

export const getAllItems = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const items = await Item.find().populate({
      path: 'registeredBy',
      model: User,
    });
    res.status(200).json(items);
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
