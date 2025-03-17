import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default users are not admins
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"], // Role-based access
      default: "user",
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt fields automatically
  }
);

const User = mongoose.model("User", userSchema);
export default User;
