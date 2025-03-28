import mongoose from "mongoose";
import dotenv from "dotenv";
import winston from "winston"; // Logging library

dotenv.config();

/**
 * Logger configuration using winston for better log management.
 */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),//When the log was created.
    winston.format.colorize(),//Makes logs easier to read.
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()], // Logs messages to the console.
});

/**
 * Connects to MongoDB with retry mechanism and best practices.
 */
const connectDB = async (retries = 5, delay = 5000) => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    mongoose.set("strictQuery", true); // Ensures only defined fields can be queried (improves performance).
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Uses the new URL parser.
      useUnifiedTopology: true, // Uses the new MongoDB connection management engine.
    });

    // logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);

    if (retries > 0) {
      logger.warn(`Retrying connection in ${delay / 1000} seconds...`);
      setTimeout(() => connectDB(retries - 1, delay), delay);
    } else {
      logger.error("All retries failed. Exiting process.");
      process.exit(1);
    }
  }
};

export default connectDB;
