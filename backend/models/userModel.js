import { pool } from '../config/dbConfig.js';
import bcrypt from 'bcryptjs';

// User Model
export const createUser = async (fname, lname, mobileno, cnic, email, password, dob, gender, roleId) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (first_name, last_name, mobile_no, cnic, email, password, dob, gender, role_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await pool.execute(query, [fname, lname, mobileno, cnic, email, hashedPassword, dob, gender, roleId]);
  return result;
};

export const findUserByEmail = async (email) => {
  const query = `
    SELECT users.*, roles.role_name AS roleName 
    FROM users 
    LEFT JOIN roles ON users.role_id = roles.id 
    WHERE LOWER(users.email) = LOWER(?)
  `;

  const [rows] = await pool.execute(query, [email.toLowerCase()]);
  // console.log('Queried user rows:', rows);
  return rows[0];
};

export const findUserById = async (userId) => {
  const query = `
    SELECT users.*, roles.role_name AS roleName
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE users.id = ?;
  `;
  const [rows] = await pool.execute(query, [userId]);
  return rows[0];
};

export const updateUserResetToken = async (userId, resetToken, resetExpire) => {
  const query = `
    UPDATE users 
    SET reset_password_token = ?, reset_password_expire = ?
    WHERE id = ?
  `;
  await pool.execute(query, [resetToken, resetExpire, userId]);
};

export const findUserByResetToken = async (resetToken) => {
  const query = `
    SELECT * FROM users
    WHERE reset_password_token = ?
  `;
  const [rows] = await pool.execute(query, [resetToken]);
  return rows[0];
};

export const updateUserPassword = async (userId, hashedPassword) => {
  const query = `
    UPDATE users
    SET password = ?, reset_password_token = NULL, reset_password_expire = NULL
    WHERE id = ?
  `;
  await pool.execute(query, [hashedPassword, userId]);
};

export const updateUserProfile = async (userId, fname, lname, mobileno, cnic, dob, gender, updatedProfilePicture) => {
  let query = `
      UPDATE users
      SET first_name = ?, last_name = ?, mobile_no = ?, cnic = ?, dob = ?, gender = ?
  `;

  const params = [fname, lname, mobileno, cnic, dob, gender];

  if (updatedProfilePicture) {
      query += `, profile_picture = ?`;
      params.push(updatedProfilePicture);
  }

  query += ` WHERE id = ?`;
  params.push(userId);

  await pool.execute(query, params);
};

export const updateUserByAdmin = async (userId, fname, lname, mobileno, cnic, dob, gender, role) => {
  const query = `
      UPDATE users
      SET first_name = ?, last_name = ?, mobile_no = ?, cnic = ?, dob = ?, gender = ?, role_id = ?
      WHERE id = ?
  `;

  const params = [fname ?? null, lname ?? null, mobileno ?? null, cnic ?? null, dob ?? null, gender ?? null, role ?? null, userId];

  await pool.execute(query, params);
};