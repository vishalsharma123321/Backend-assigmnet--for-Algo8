import mongoose from "mongoose";

/**
 * @desc User Schema - Defines the structure for user data in MongoDB
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // Custom error message
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // Ensure email is always stored in lowercase
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Regex validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Exclude password from queries by default
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default users are not admins
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"], // Role-based access control
      default: "user",
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt fields automatically
  }
);

// Index email for faster lookups
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);
export default User;
