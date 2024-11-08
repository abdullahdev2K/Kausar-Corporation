import express from 'express';
import * as roleController from '../controllers/roleControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const roleRoutes = express.Router();

roleRoutes.route('/')
    .get(roleController.fetchRoles)
    .post(authMiddleware, roleController.addRole);

roleRoutes.route('/:id')
    .put(authMiddleware, roleController.modifyRole)
    .delete(authMiddleware, roleController.removeRole);

export default roleRoutes;