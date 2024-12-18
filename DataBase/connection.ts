import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();



import mongoose from "mongoose";


// Assuming MONGO_URI is defined in your .env file
const MONGO_URI = process.env.MONGO_URI as string;

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(MONGO_URI);
        console.log(`Database connected successfully!\nHost: ${connection.connection.host}`);
    } catch (error) {
        // Handle or log the error
        console.error("Database connection failed:", error);
    }
}

export default connectDB;
