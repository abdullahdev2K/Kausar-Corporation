import express from 'express';
import * as companyController from '../controllers/companyControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const companyRoutes = express.Router();

companyRoutes.route('/')
    .get(companyController.fetchAllCompanies)  // Accessible to all authenticated users
    .post(authMiddleware, companyController.addCompany)        // Admin only
    .put(authMiddleware, companyController.modifyCompany);     // Admin only

companyRoutes.delete('/company/:id', authMiddleware, companyController.removeCompany);  // Admin only

export default companyRoutes;