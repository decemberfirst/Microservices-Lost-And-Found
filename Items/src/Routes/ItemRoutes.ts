import express from 'express';
import { protectRoute } from '@codishrohan/common';
import {
  registerItem,
  getSingleItem,
  getAllItems,
  AcceptAppeal,
  AppealForItem,
  getMyItems,
  editItem,
  deleteItem,
  deleteAppeal,
  getTokens,
  filterItems,
  searchByCategory,
} from '../Controller/Item-Controller';
import { upload } from '../Controller/Multer';
import multer from 'multer';

const Router = express.Router();

Router.post(
  '/register',
  protectRoute,
  multer(upload).array('images', 4),
  registerItem
);
Router.get('/tokens', protectRoute, getTokens);
Router.get('/all', protectRoute, getAllItems);
Router.get('/my-items', protectRoute, getMyItems);
Router.put('/:id/edit', protectRoute, editItem);
Router.get('/:id', protectRoute, getSingleItem);
Router.get('/categoryfilter/:category', protectRoute, searchByCategory);
Router.get('/filter/:filterBy', protectRoute, filterItems);
Router.post('/:id/appeal', protectRoute, AppealForItem);
Router.post('/:itemId/accept/:appealId', protectRoute, AcceptAppeal);
Router.delete('/:itemId/delete/:appealId', protectRoute, deleteAppeal);
Router.delete('/:id/delete', protectRoute, deleteItem);

export { Router as ItemRoutes };
