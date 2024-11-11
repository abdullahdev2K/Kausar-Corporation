import { getAllCompanies, createCompany, updateCompany, deleteCompany } from '../models/companyModel.js';

export const fetchAllCompanies = async (req, res) => {
    try {
        const companies = await getAllCompanies();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

export const addCompany = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { company_name } = req.body;
    try {
        const newCompany = await createCompany(company_name);
        res.status(201).json({ message: 'Company added successfully', company: newCompany });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

export const modifyCompany = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { id, company_name } = req.body;

    if (!id || !company_name) {
        return res.status(400).json({ message: 'Company name or ID is undefined' });
    }

    try {
        await updateCompany(id, company_name);
        res.status(200).json({ message: 'Company updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

export const removeCompany = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const { id } = req.params;
    try {
        await deleteCompany(id);
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};