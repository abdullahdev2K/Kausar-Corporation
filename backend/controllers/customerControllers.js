import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer } from '../models/customerModel.js';

export const fetchAllCustomers = async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

export const addCustomer = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { customer_name, contact_info, address } = req.body;

    console.log(req.body);

    try {
        const newCustomer = await createCustomer(customer_name, contact_info, address);
        res.status(201).json({ message: 'Customer added successfully', customer: newCustomer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

export const removeCustomer = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const { id } = req.params;
    try {
        await deleteCustomer(id);
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

export const modifyCustomer = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { id, customer_name, contact_info, address } = req.body;

    console.log(req.body);

    if (!id || !customer_name || !contact_info || !address) {
        return res.status(400).json({ message: 'Customer name or Customer contact or Customer address or ID is undefined' });
    }

    try {
        await updateCustomer(id, customer_name, contact_info, address);
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};