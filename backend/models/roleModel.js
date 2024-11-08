import { pool } from '../config/dbConfig.js';

export const getAllRoles = async () => {
    const query = `SELECT * FROM roles`;
    const [rows] = await pool.execute(query);
    return rows;
};

export const createRole = async (role_name) => {
    const query = `INSERT INTO roles (role_name) VALUES (?)`;
    const [result] = await pool.execute(query, [role_name]);
    return result;
};

export const updateRole = async (id, role_name) => {
    const query = `UPDATE roles SET role_name = ? WHERE id = ?`;
    
    if (role_name === undefined || id === undefined) {
        throw new Error('Role name or ID is undefined');
    }
    
    await pool.execute(query, [role_name, id]);
};

export const deleteRole = async (id) => {
    const query = `DELETE FROM roles WHERE id = ?`;
    await pool.execute(query, [id]);
};