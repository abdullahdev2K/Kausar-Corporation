import { pool } from '../config/dbConfig.js';

export const getAllCompanies = async () => {
    const query = `SELECT * FROM companies`;
    const [rows] = await pool.execute(query);
    return rows;
};

export const createCompany = async (company_name) => {
    const query = `INSERT INTO companies (company_name) VALUES (?)`;
    const [result] = await pool.execute(query, [company_name]);
    return result;
};

export const updateCompany = async (id, company_name) => {
    const query = `UPDATE companies SET company_name = ? WHERE id = ?`;
    
    // Ensure both id and company_name are defined before executing the query
    if (company_name === undefined || id === undefined) {
        throw new Error('Company name or ID is undefined');
    }
    
    await pool.execute(query, [company_name, id]);
};


export const deleteCompany = async (id) => {
    const query = `DELETE FROM companies WHERE id = ?`;
    await pool.execute(query, [id]);
};