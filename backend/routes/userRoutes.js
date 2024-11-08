import express from 'express';
import * as userController from '../controllers/userControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

// Route to fetch all users (accessible by admin and salesperson)
userRoutes.get('/', userController.getAllUsers);

// Route to add a new user (admin only)
userRoutes.post('/add-user', authMiddleware, userController.addUser);

// Route to update a user (admin only)
userRoutes.put('/update-user/:userId', authMiddleware, userController.updateUser);

// Route to delete a user (admin only)
userRoutes.delete('/delete-user/:userId', authMiddleware, userController.deleteUser);

export default userRoutes;