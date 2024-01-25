import express from 'express';
import { protectRoute } from '@codishrohan/common';
import {
  registerItem,
  getSingleItem,
  getAllItems,
  AcceptAppeal,
  AppealForItem,
} from '../Controller/Item-Controller';

const Router = express.Router();

Router.post('/register', protectRoute, registerItem);
Router.get('/all', protectRoute, getAllItems);
Router.get('/:id', protectRoute, getSingleItem);
Router.post('/:id/appeal', protectRoute, AppealForItem);
Router.post('/:itemId/accept/:appealId', protectRoute, AcceptAppeal);

export { Router as ItemRoutes };
