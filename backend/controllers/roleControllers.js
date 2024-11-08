import { getAllRoles, createRole, updateRole, deleteRole } from '../models/roleModel.js';

export const fetchRoles = async (req, res) => {
    try {
        const roles = await getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addRole = async (req, res) => {
    const { role_name } = req.body;
    try {
        const result = await createRole(role_name);
        res.status(201).json({ id: result.insertId, role_name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const modifyRole = async (req, res) => {
    const { id } = req.params;
    const { role_name } = req.body;
    try {
        await updateRole(id, role_name);
        res.json({ message: 'Role updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeRole = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteRole(id);
        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};