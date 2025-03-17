import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import { getUserProfile, updateUserProfile, getAllUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/", protect, isAdmin, getAllUsers); // Only Admins can get all users
router.delete("/:id", protect, isAdmin, deleteUser); // Only Admins can delete users

export default router;
