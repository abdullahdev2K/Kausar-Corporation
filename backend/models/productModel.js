import { pool } from '../config/dbConfig.js';

// Get all products with category and company names
export const getAllProducts = async () => {
    const query = `
        SELECT 
            products.*, 
            categories.category_name AS categoryName, 
            companies.company_name AS companyName,
            inventory.quantity, 
            inventory.rack, 
            inventory.min_quantity, 
            DATE_FORMAT(inventory.last_updated, '%Y-%m-%d, %H:%i:%s') AS lastUpdated
        FROM 
            products
        JOIN 
            categories ON products.category_id = categories.id
        JOIN 
            companies ON products.company_id = companies.id
        LEFT JOIN 
            inventory ON products.id = inventory.product_id
    `;
    const [products] = await pool.execute(query); // Fetch all products with category and company names
    return products; // Return the products data
};


// Get a product by ID
export const getProductById = async (id) => {
    const query = `SELECT products.*, inventory.quantity, inventory.rack, inventory.min_quantity FROM products LEFT JOIN inventory ON products.id = inventory.product_id WHERE products.id = ?`;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
};

// Create a new product
export const createProduct = async (productData) => {
    const query = `
        INSERT INTO products (product_code, company_id, category_id, product_name, product_urduname, description, UOM, Cost, WholeSale, Retail, Cash, service_charges, Packing, product_image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
        productData.product_code || null,
        productData.company_id || null,
        productData.category_id || null,
        productData.product_name || null,
        productData.product_urduname || null,
        productData.description || null,
        productData.UOM || null,
        productData.Cost || null,
        productData.WholeSale || null,
        productData.Retail || null,
        productData.Cash || null,
        productData.service_charges || null,
        productData.Packing || null,
        productData.product_image || null // Path stored in 'uploads/'
    ];

    const [result] = await pool.execute(query, values);
    return { id: result.insertId, ...productData };
};

export const updateProduct = async (id, productData) => {
    console.log("Product ID:", id);
    console.log("Product Data:", productData);

    const query = `
        UPDATE products 
        SET 
            product_code = ?, 
            company_id = ?, 
            category_id = ?, 
            product_name = ?, 
            product_urduname = ?, 
            description = ?, 
            UOM = ?, 
            Cost = ?, 
            WholeSale = ?, 
            Retail = ?, 
            Cash = ?,
            service_charges =?,
            Packing = ?, 
            product_image = ?
        WHERE id = ?
    `;

    // Replace undefined values with null
    const values = [
        productData.product_code || null,
        productData.company_id || null,
        productData.category_id || null,
        productData.product_name || null,
        productData.product_urduname || null,
        productData.description || null,
        productData.UOM || null,
        productData.Cost || null,
        productData.Wholesale || null,
        productData.Retail || null,
        productData.Cash || null,
        productData.service_charges || null,
        productData.Packing || null,
        productData.product_image || null,
        id // Ensure the ID is passed correctly
    ];

    try {
        const [result] = await pool.execute(query, values);

        // Log the result for debugging
        console.log("Update Result:", result);

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error executing updateProduct query:", error);
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (id) => {
    const query = `DELETE FROM products WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result.affectedRows > 0;
};