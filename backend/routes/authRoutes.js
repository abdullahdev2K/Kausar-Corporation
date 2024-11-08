import express from 'express';
import * as authController from '../controllers/authControllers.js';
import { check } from 'express-validator';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/upload.js';

const authRoutes = express.Router();

authRoutes.post('/login', authController.login);

authRoutes.post('/logout', authController.logoutUser);

authRoutes.post('/forgot-password', authController.forgotPassword);
authRoutes.put('/reset-password/:resetToken', authController.resetPassword);

authRoutes.use(authMiddleware);

// Protected route to fetch user profile
authRoutes.route('/profile')
    .get(authController.getUserProfile)
    .put(upload.single('profilePicture'), authController.updateuserProfile);

export default authRoutes;