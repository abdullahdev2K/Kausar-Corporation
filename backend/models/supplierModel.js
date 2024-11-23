import { pool } from '../config/dbConfig.js';

export const getAllSuppliers = async () => {
    const query = `SELECT * FROM suppliers`;
    const [rows] = await pool.execute(query);
    return rows;
};

export const createSupplier = async (supplier_name, supplier_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city) => {
    const query = `
        INSERT INTO suppliers (supplier_name, supplier_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [supplier_name, supplier_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city]);
    return result;
};

export const updateSupplier = async (id, supplier_name, supplier_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city) => {
    const query = `
        UPDATE suppliers 
        SET supplier_name = ?, supplier_urduname = ?, primary_contact = ?, secondary_contact = ?, primary_address = ?, secondary_address = ?, city = ? 
        WHERE id = ?`;

    if (!id || !supplier_name || !primary_contact || !primary_address || !city) {
        throw new Error('Required fields are missing.');
    }

    await pool.execute(query, [supplier_name, supplier_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city, id]);
};


export const deleteSupplier = async (id) => {
    const query = `DELETE FROM suppliers WHERE id = ?`;
    await pool.execute(query, [id]);
};