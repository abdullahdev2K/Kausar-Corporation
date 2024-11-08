import express from 'express';
import * as customerController from '../controllers/customerControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const customerRoutes = express.Router();

customerRoutes.route('/customer')
    .get(customerController.fetchAllCustomers)  // Accessible to all authenticated users
    .post(authMiddleware, customerController.addCustomer)        // Admin only
    .put(authMiddleware, customerController.modifyCustomer);     // Admin only

customerRoutes.delete('/customer/:id', authMiddleware, customerController.removeCustomer);  // Admin only

export default customerRoutes;