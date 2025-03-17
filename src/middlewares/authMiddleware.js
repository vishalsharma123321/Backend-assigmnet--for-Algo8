import jwt from "jsonwebtoken";
import User from "../models/User.js";
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
 * @desc Middleware to protect routes by verifying JWT
 * @access Private (Requires valid token)
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password"); // Exclude password for security

      if (!req.user) {
        logger.warn(" Unauthorized access attempt - Invalid token payload");
        return res.status(401).json({ message: "Not authorized, invalid token payload" });
      }

      logger.info(` User authenticated: ${req.user.email}`);
      next();
    } catch (error) {
      logger.error(` Invalid token: ${error.message}`);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    logger.warn(" Unauthorized access attempt - No token provided");
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

/**
 * @desc Middleware to check if user is an admin
 * @access Private/Admin
 */
const isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    logger.info(` Admin access granted: ${req.user.email}`);
    next();
  } else {
    logger.warn(` Unauthorized admin access attempt by: ${req.user?.email || "Unknown User"}`);
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

export { protect, isAdmin };
