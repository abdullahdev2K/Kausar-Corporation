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

    const { supplier_name, contact_info } = req.body;

    try {
        const newSupplier = await createSupplier(supplier_name, contact_info);
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

    const { id, supplier_name, contact_info } = req.body;

    if (!id || !supplier_name || !contact_info) {
        return res.status(400).json({ message: 'Supplier name or Supplier Contact or ID is undefined' });
    }

    try {
        await updateSupplier(id, supplier_name, contact_info);
        res.status(200).json({ message: 'Supplier updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};