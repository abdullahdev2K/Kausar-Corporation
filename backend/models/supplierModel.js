import { pool } from '../config/dbConfig.js';

export const getAllSuppliers = async () => {
    const query = `SELECT * FROM suppliers`;
    const [rows] = await pool.execute(query);
    return rows;
};

export const createSupplier = async (supplier_name, contact_info) => {
    const query = `INSERT INTO suppliers (supplier_name, contact_info) VALUES (?, ?)`;
    const [result] = await pool.execute(query, [supplier_name, contact_info]);
    return result;
};

export const updateSupplier = async (id, supplier_name, contact_info) => {
    const query = `UPDATE suppliers SET supplier_name = ?, contact_info = ? WHERE id = ?`;
    
    // Ensure both id, supplier_name and contact_info are defined before executing the query
    if (supplier_name === undefined || id === undefined || contact_info === undefined) {
        throw new Error('Supplier name or Supplier Contact or ID is undefined');
    }
    
    await pool.execute(query, [supplier_name, contact_info, id]);
};


export const deleteSupplier = async (id) => {
    const query = `DELETE FROM suppliers WHERE id = ?`;
    await pool.execute(query, [id]);
};