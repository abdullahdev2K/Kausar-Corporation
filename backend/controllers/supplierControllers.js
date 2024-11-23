import { deleteSupplier, getAllSuppliers, createSupplier, updateSupplier } from '../models/supplierModel.js';

export const fetchAllSuppliers = async (req, res) => {
    try {
        const suppliers = await getAllSuppliers();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

export const addSupplier = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { supplier_name, supplier_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city } = req.body;

    console.log(req.body);

    try {
        const newSupplier = await createSupplier(supplier_name, supplier_urduname, primary_contact, secondary_contact, primary_address, secondary_address, city);
        res.status(201).json({ message: 'Supplier added successfully', supplier: newSupplier });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

export const removeSupplier = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const { id } = req.params;
    try {
        await deleteSupplier(id);
        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};

export const modifySupplier = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const {
        id,
        supplier_name,
        supplier_urduname,
        primary_contact,
        secondary_contact,
        primary_address,
        secondary_address,
        city,
    } = req.body;

    if (!id || !supplier_name || !primary_contact || !primary_address || !city) {
        return res.status(400).json({ message: 'Required fields are missing.' });
    }

    try {
        await updateSupplier(
            id,
            supplier_name,
            supplier_urduname,
            primary_contact,
            secondary_contact,
            primary_address,
            secondary_address,
            city
        );
        res.status(200).json({ message: 'Supplier updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};