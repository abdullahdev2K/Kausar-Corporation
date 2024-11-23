import { pool } from '../config/dbConfig.js';

export const getAllCustomers = async () => {
    const query = `SELECT * FROM customers`;
    const [rows] = await pool.execute(query);
    return rows;
};

export const createCustomer = async (customer_name, customer_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city, builty_info) => {
    const query = `
        INSERT INTO customers (customer_name, customer_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city, builty_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [customer_name, customer_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city, builty_info]);
    return result;
};

export const updateCustomer = async (id, customer_name, customer_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city, builty_info) => {
    const query = `
        UPDATE customers 
        SET customer_name = ?, customer_urduname = ?, primary_contact = ?, secondary_contact = ?, primary_address = ?, secondary_address = ?, city = ?, builty_info = ? 
        WHERE id = ?`;

    if (!id || !customer_name || !primary_contact || !primary_address || !city) {
        throw new Error('Required fields are missing.');
    }

    await pool.execute(query, [customer_name, customer_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city, builty_info, id]);
};

export const deleteCustomer = async (id) => {
    const query = `DELETE FROM customers WHERE id = ?`;
    await pool.execute(query, [id]);
};