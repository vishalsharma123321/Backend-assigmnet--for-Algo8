import User from "../models/User.js";
import { hashPassword, comparePassword, generateToken } from "../utils/authUtils.js";
import winston from "winston"; // Logging

/**
 * Logger configuration for structured logging.
 */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

/**
 * @desc Signup User
 * @route POST /api/auth/signup
 * @access Public
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password securely
    const hashedPassword = await hashPassword(password);

    // Create new user with role-based access control
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // Default role is "user"
      isAdmin: role === "admin", // Set admin flag if applicable
    });

    logger.info(` New user registered: ${user.email}`);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    logger.error(` Signup Error: ${error.message}`);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Login User
 * @route POST /api/auth/login
 * @access Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);
    logger.info(`User logged in: ${user.email}`);

    res.json({ message: "Login successful", token });
  } catch (error) {
    logger.error(` Login Error: ${error.message}`);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Logout User
 * @route POST /api/auth/logout
 * @access Private (handled on client-side by token removal)
 */
export const logout = (req, res) => {
  logger.info(` User logged out.`);
  res.json({ message: "Logout successful. Please remove the token from the client." });
};
