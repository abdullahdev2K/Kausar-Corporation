import express from 'express';
import * as productControllers from '../controllers/productControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const productRoutes = express.Router();

// Routes for products
productRoutes.get('/', productControllers.getAllProducts); // Get all products
productRoutes.get('/:id', productControllers.getProductById); // Get product by ID
productRoutes.post('/', authMiddleware, productControllers.createProduct); // Create a new product
productRoutes.put('/:id', authMiddleware, productControllers.updateProduct); // Update a product by ID
productRoutes.delete('/:id', authMiddleware, productControllers.deleteProduct); // Delete a product by ID

export default productRoutes;