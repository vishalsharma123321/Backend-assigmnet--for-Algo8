import express from "express";
import { signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", signup);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & return JWT token
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client should remove token)
 * @access  Public (handled on frontend)
 */
router.post("/logout", logout);

export default router;
