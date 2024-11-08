import { createUser, updateUserByAdmin } from '../models/userModel.js';
import { pool } from '../config/dbConfig.js';

export const getRoleIdByName = async (roleName) => {
    const query = 'SELECT id FROM roles WHERE role_name = ?'; // Assuming the roles table has a 'name' column
    const [rows] = await pool.execute(query, [roleName]);
    return rows.length > 0 ? rows[0].id : null; // Return the ID or null if not found
};

// Controller to fetch all users (for admin and salesperson)
export const getAllUsers = async (req, res) => {
    try {
        const query = `SELECT users.*, roles.role_name AS roleName FROM users JOIN roles ON users.role_id = roles.id`;

        const [users] = await pool.execute(query); // Query all users with role names
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Controller to add a new user (for admin only)
export const addUser = async (req, res) => {
    const { fname, lname, mobileno, cnic, email, password, dob, gender, roleId } = req.body;

    try {
        // Create a new user with the provided roleId
        const result = await createUser(fname, lname, mobileno, cnic, email, password, dob, gender, roleId);
        res.status(201).json({ message: 'User added successfully', userId: result.insertId });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user', error: error.message });
    }
};

// Controller to update a user (for admin)
export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { fname, lname, mobileno, cnic, dob, gender, role } = req.body;

    // Log the parameters for debugging purposes
    console.log("Update parameters:", { userId, fname, lname, mobileno, cnic, dob, gender, role });

    // Check if any required parameter is missing
    if ([userId, fname, lname, mobileno, cnic, dob, gender, role].some(param => param === undefined)) {
        return res.status(400).json({ message: 'All fields are required for updating the user' });
    }

    try {
        const roleId = await getRoleIdByName(role); // Get the role ID based on the role name
        if (!roleId) {
            return res.status(400).json({ message: 'Invalid role provided' });
        }

        await updateUserByAdmin(userId, fname, lname, mobileno, cnic, dob, gender, roleId); // Pass the roleId here
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
};

// Controller to delete a user (for admin)
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
}; 