import { pool } from '../config/dbConfig.js';

export const getAllCustomers = async () => {
    const query = `SELECT * FROM customers`;
    const [rows] = await pool.execute(query);
    return rows;
};

export const createCustomer = async (customer_name, contact_info, address) => {
    const query = `INSERT INTO customers (customer_name, contact_info, address) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(query, [customer_name, contact_info, address]);
    return result;
};

export const updateCustomer = async (id, customer_name, contact_info, address) => {
    const query = `UPDATE customers SET customer_name = ?, contact_info = ?, address = ? WHERE id = ?`;
    
    // Ensure both id, customer_name, contact_info and address are defined before executing the query
    if (customer_name === undefined || id === undefined || contact_info === undefined || address === undefined) {
        throw new Error('Customer name or Customer contact or Customer address or ID is undefined');
    }
    
    await pool.execute(query, [customer_name, contact_info, address, id]);
};


export const deleteCustomer = async (id) => {
    const query = `DELETE FROM customers WHERE id = ?`;
    await pool.execute(query, [id]);
};