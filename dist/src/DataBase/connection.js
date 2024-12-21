"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
// Retrieve MongoDB URI from environment variables
// Ensure MONGO_URI is properly defined in the .env file
const MONGO_URI = process.env.MONGO_URI;
// Function to establish a database connection
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Attempt to connect to the MongoDB database
        const connection = yield mongoose_1.default.connect(MONGO_URI);
        // Log successful connection details
        console.log(`Database connected successfully!`);
        console.log(`Host: ${connection.connection.host}`);
    }
    catch (error) {
        // Log a detailed error message
        console.error("Database connection failed:", error);
        // Optionally, exit the process if the connection fails
        process.exit(1); // Exit with a failure code
    }
});
exports.default = connectDB;
