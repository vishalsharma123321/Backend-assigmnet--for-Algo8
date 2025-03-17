import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @desc    Hashes the user password before storing it in the database
 * @param   {string} password - The plain text password
 * @returns {Promise<string>} - The hashed password
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
  return await bcrypt.hash(password, salt);
};

/**
 * @desc    Compares an entered password with the hashed password in the database
 * @param   {string} enteredPassword - The password entered by the user
 * @param   {string} hashedPassword - The stored hashed password
 * @returns {Promise<boolean>} - True if passwords match, otherwise false
 */
export const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

/**
 * @desc    Generates a JWT token for authentication
 * @param   {string} userId - The unique ID of the user
 * @returns {string} - The generated JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour for security
  });
};
