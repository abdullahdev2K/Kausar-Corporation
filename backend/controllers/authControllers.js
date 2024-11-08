import { findUserByEmail, findUserById, updateUserResetToken, findUserByResetToken, updateUserPassword, updateUserProfile } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.roleName },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        return res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const logoutUser = (req, res) => {
    try {
        // To logout, we simply clear the token. You could also handle invalidating the JWT on the server.
        res.clearCookie('token', { path: '/' });
        return res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to logout" });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash and set reset password token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

        // Update user with reset token and expiry
        await updateUserResetToken(user.id, resetPasswordToken, resetPasswordExpire);

        // Create reset URL pointing to the frontend (port 5173)
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        // Create the email content
        const message = 
        `
            <h1>Password Reset Request</h1>
            <p>You have requested a password reset.</p>
            <p>Please click the following link to reset your password:</p>
            <a href="${resetUrl}" target="_blank">${resetUrl}</a>
            <p>This link will expire in 10 minutes.</p>
        `;

        // Send the email
        await sendEmail({
            email: user.email,
            subject: 'Password Reset',
            message,
        });

        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const resetPassword = async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    try {
        // Hash the token to match it with the database token
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Find the user by reset token and check if token has expired
        const user = await findUserByResetToken(hashedToken);

        if (!user || user.resetPasswordExpire < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        await updateUserPassword(user.id, hashedPassword);

        // Clear reset token and expiry after password reset
        await updateUserResetToken(user.id, null, null);

        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing.' });
        }

        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user.id,
            fname: user.first_name,
            lname: user.last_name,
            email: user.email,
            profilePicture: user.profile_picture || '/assets/default-pic.jpg',
            mobileno: user.mobile_no,
            cnic: user.cnic,
            dob: user.dob,
            gender: user.gender,
            role: user.roleName,  // Use roleName instead of roleId
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateuserProfile = async (req, res) => {
    const { fname, lname, mobileno, cnic, dob, gender } = req.body;
    const profilePicture = req.file ? req.file.path : null; // Save the file path if profile picture is uploaded
    const userId = req.user.userId;

    try {
        const user = await findUserById(userId); // Fetch the current user data
        const updatedProfilePicture = profilePicture || user.profile_picture; // Retain existing profile picture if no new picture is uploaded
        
        await updateUserProfile(userId, fname, lname, mobileno, cnic, dob, gender, updatedProfilePicture);
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error); // Log detailed error message
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};