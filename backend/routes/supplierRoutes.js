import express from 'express';
import * as supplierController from '../controllers/supplierControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const supplierRoutes = express.Router();

supplierRoutes.route('/supplier')
    .get(supplierController.fetchAllSuppliers)  // Accessible to all authenticated users
    .post(authMiddleware, supplierController.addSupplier)        // Admin only
    .put(authMiddleware, supplierController.modifySupplier);     // Admin only

supplierRoutes.delete('/supplier/:id', authMiddleware, supplierController.removeSupplier);  // Admin only

export default supplierRoutes;