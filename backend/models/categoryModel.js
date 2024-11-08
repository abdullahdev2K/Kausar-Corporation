import { pool } from '../config/dbConfig.js';

export const getAllCategories = async () => {
    const query = `SELECT * FROM categories`;
    const [rows] = await pool.execute(query);
    return rows;
};

export const createCategory = async (category_name) => {
    const query = `INSERT INTO categories (category_name) VALUES (?)`;
    const [result] = await pool.execute(query, [category_name]);
    return result;
};

export const updateCategory = async (id, category_name) => {
    const query = `UPDATE categories SET category_name = ? WHERE id = ?`;
    
    // Ensure both id and category_name are defined before executing the query
    if (category_name === undefined || id === undefined) {
        throw new Error('Category name or ID is undefined');
    }
    
    await pool.execute(query, [category_name, id]);
};


export const deleteCategory = async (id) => {
    const query = `DELETE FROM categories WHERE id = ?`;
    await pool.execute(query, [id]);
};