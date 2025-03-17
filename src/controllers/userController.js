import User from "../models/User.js";
import { hashPassword } from "../utils/authUtils.js";
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
 * @desc Get User Profile
 * @route GET /api/users/profile
 * @access Private (Authenticated User)
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    logger.info(` Profile fetched for user: ${user.email}`);
    res.json(user);
  } catch (error) {
    logger.error(` Error fetching profile: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Update User Profile
 * @route PUT /api/users/profile
 * @access Private (Only logged-in user)
 */
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Hash password only if it's updated
    if (req.body.password) {
      user.password = await hashPassword(req.body.password);
    }

    const updatedUser = await user.save();
    logger.info(`Profile updated for user: ${updatedUser.email}`);

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    logger.error(`Error updating profile: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Get All Users (Admin Only)
 * @route GET /api/users
 * @access Private/Admin
 */
export const getAllUsers = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const users = await User.find().select("-password"); // Exclude passwords for security
    logger.info(`Admin fetched all users (${users.length} users)`);

    res.json(users);
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Delete User
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    logger.info(`User deleted: ${user.email}`);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ message: "Server error" });
  }
};
