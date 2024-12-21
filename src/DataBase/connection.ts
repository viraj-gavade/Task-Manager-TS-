import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

import mongoose from "mongoose";

// Retrieve MongoDB URI from environment variables
// Ensure MONGO_URI is properly defined in the .env file
const MONGO_URI = process.env.MONGO_URI as string;

// Function to establish a database connection
const connectDB = async (): Promise<void> => {
    try {
        // Attempt to connect to the MongoDB database
        const connection = await mongoose.connect(MONGO_URI);

        // Log successful connection details
        console.log(`Database connected successfully!`);
        console.log(`Host: ${connection.connection.host}`);
    } catch (error) {
        // Log a detailed error message
        console.error("Database connection failed:", error);

        // Optionally, exit the process if the connection fails
        process.exit(1); // Exit with a failure code
    }
};

export default connectDB;
