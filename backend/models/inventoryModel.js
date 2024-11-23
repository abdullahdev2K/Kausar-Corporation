import { pool } from '../config/dbConfig.js';

export const createInventory = async (inventoryData) => {
    const query = `
        INSERT INTO inventory (product_id, quantity, rack, min_quantity, last_updated)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
        inventoryData.product_id,
        inventoryData.quantity,
        inventoryData.rack,
        inventoryData.min_quantity,
        inventoryData.last_updated,
    ];

    const [result] = await pool.execute(query, values);
    return { id: result.insertId, ...inventoryData };
};

export const updateInventory = async (productId, inventoryData) => {
    const query = `
        UPDATE inventory
        SET quantity = ?, rack = ?, min_quantity = ?, last_updated = ?
        WHERE product_id = ?
    `;
    const values = [
        inventoryData.quantity,
        inventoryData.rack,
        inventoryData.min_quantity,
        inventoryData.last_updated,
        productId,
    ];

    const [result] = await pool.execute(query, values);
    return result.affectedRows > 0; // Return true if the update was successful
};

export const deleteInventoryByProductId = async (productId) => {
    const query = 'DELETE FROM inventory WHERE product_id = ?';
    return pool.execute(query, [productId]); // Adjust based on your database library
};