import * as productModel from '../models/productModel.js';
import * as inventoryModel from '../models/inventoryModel.js';
import { upload } from '../middlewares/upload.js';

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};

// Get a product by ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productModel.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        res.status(500).json({ message: 'Failed to fetch product' });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    upload.single('product_image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload failed' });
        }

        try {
            const productData = req.body;

            // Include the uploaded image path
            if (req.file) {
                productData.product_image = req.file.path; // Local file path in 'uploads/' directory
            }

            const newProduct = await productModel.createProduct(productData);

            // Create an inventory record for the new product
            const inventoryData = {
                product_id: newProduct.id,
                quantity: productData.quantity || 0,
                rack: productData.rack, // Fix: Access correct field
                min_quantity: productData.min_quantity, // Fix: Access correct field
                last_updated: new Date(),
            };            
            await inventoryModel.createInventory(inventoryData);

            res.status(201).json({ message: 'Product created successfully', product: newProduct });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: 'Failed to create product' });
        }
    });
};

// Update a product
export const updateProduct = async (req, res) => {
    upload.single('product_image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload failed' });
        }

        const { id } = req.params;
        const productData = req.body;

        try {
            // Include the uploaded image path, if a new file was uploaded
            if (req.file) {
                productData.product_image = req.file.path; // Path to the uploaded image
            }

            // Update the product in the database
            const updated = await productModel.updateProduct(id, productData);
            if (!updated) {
                return res.status(404).json({ message: 'Product not found or update failed' });
            }

            // Update inventory for the product
            const inventoryData = {
                quantity: productData.quantity,
                rack: productData.rack,
                min_quantity: productData.min_quantity,
                last_updated: new Date(),
            };

            console.log(inventoryData);
            const inventoryUpdated = await inventoryModel.updateInventory(id, inventoryData);
            if (!inventoryUpdated) {
                console.warn(`No inventory record found for product ID ${id}, skipping inventory update.`);
            }

            // Fetch and return the updated product
            const updatedProduct = await productModel.getProductById(id);
            res.status(200).json({ message: 'Product and inventory updated successfully', product: updatedProduct });
        } catch (error) {
            console.error(`Error updating product with ID ${id}:`, error);
            res.status(500).json({ message: 'Failed to update product' });
        }
    });
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the corresponding inventory record first
        const inventoryDeleted = await inventoryModel.deleteInventoryByProductId(id);
        if (!inventoryDeleted) {
            return res.status(404).json({ message: 'No inventory record found for the product' });
        }

        // Now delete the product
        const deleted = await productModel.deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product and its inventory deleted successfully' });
    } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};