import express from 'express';
import * as categoryController from '../controllers/categoryControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const categoryRoutes = express.Router();

categoryRoutes.route('/category')
    .get(categoryController.fetchAllCategories)  // Accessible to all authenticated users
    .post(authMiddleware, categoryController.addCategory)        // Admin only
    .put(authMiddleware, categoryController.modifyCategory);     // Admin only

categoryRoutes.delete('/category/:id', authMiddleware, categoryController.removeCategory);  // Admin only

export default categoryRoutes;