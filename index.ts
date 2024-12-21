import dotenv from "dotenv";
import path from 'path';
// Load environment variables from .env file
dotenv.config();

import { Express, Request, Response } from "express";
import express from "express";
import connectDB from './src/DataBase/connection'; // Importing database connection
import TaskRouter from "./src/Routes/tasks.routers"; // Importing task routes
import UserRouter from "./src/Routes/user.routers"; // Importing user routes
import cookieParser from "cookie-parser";
import cors from "cors";

const port: number = 3000; // Setting the port for the server
const app: Express = express(); // Creating the express app

app.set('view engine', 'ejs'); // Setting ejs as the view engine

// Set the views directory for ejs templates
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing JSON data in requests
app.use(express.json());

// Middleware for parsing cookies from requests
app.use(cookieParser());

// Enabling CORS for cross-origin resource sharing
app.use(cors());

// Middleware to parse URL-encoded bodies in requests (like form submissions)
app.use(express.urlencoded({ extended: true }));

// Establish database connection
connectDB();

// Root route for testing the server, responds with a simple message


// Setting up the routes for tasks and user management
app.use('/api/v1/', TaskRouter);  // Task routes
app.use('/api/v1/auth/user', UserRouter);  // User authentication routes
app.use('/home', (req:Request,res:Response)=>{
    res.send(`<a href="/api/v1/tasks"><h1>Navigate To Home Page</h1></a>`)
}); 



// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log("Server is listening on port:-", port); // Log when the server starts
});
