import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import { 
    getUserProfile, 
    updateUserProfile, 
    getAllUsers, 
    deleteUser 
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get logged-in user profile
 * @access  Private (Requires authentication)
 */
router.get("/profile", protect, getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private (User must be logged in)
 */
router.put("/profile", protect, updateUserProfile);

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin only)
 * @access  Private/Admin
 */
router.get("/", protect, isAdmin, getAllUsers);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user by ID (Admin only)
 * @access  Private/Admin
 */
router.delete("/:id", protect, isAdmin, deleteUser);

export default router;
