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

    const { customer_name, customer_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city, builty_info } = req.body;

    console.log(customer_name, customer_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city, builty_info);

    try {
        const newCustomer = await createCustomer(customer_name, customer_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city, builty_info);
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

    const {
        id,
        customer_name,
        customer_urduname,
        primary_contact,
        secondary_contact,
        primary_address,
        secondary_address,
        city,
        builty_info,
    } = req.body;

    if (!id || !customer_name || !primary_contact || !primary_address || !city) {
        return res.status(400).json({ message: 'Required fields are missing.' });
    }

    try {
        await updateCustomer(
            id,
            customer_name,
            customer_urduname,
            primary_contact,
            secondary_contact,
            primary_address,
            secondary_address,
            city,
            builty_info
        );
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};