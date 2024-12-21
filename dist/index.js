"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./src/DataBase/connection")); // Importing database connection
const tasks_routers_1 = __importDefault(require("./src/Routes/tasks.routers")); // Importing task routes
const user_routers_1 = __importDefault(require("./src/Routes/user.routers")); // Importing user routes
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const port = 3000; // Setting the port for the server
const app = (0, express_1.default)(); // Creating the express app
app.set('view engine', 'ejs'); // Setting ejs as the view engine
// Set the views directory for ejs templates
app.set('views', path_1.default.join(__dirname, 'views'));
// Middleware for parsing JSON data in requests
app.use(express_1.default.json());
// Middleware for parsing cookies from requests
app.use((0, cookie_parser_1.default)());
// Enabling CORS for cross-origin resource sharing
app.use((0, cors_1.default)());
// Middleware to parse URL-encoded bodies in requests (like form submissions)
app.use(express_1.default.urlencoded({ extended: true }));
// Establish database connection
(0, connection_1.default)();
// Root route for testing the server, responds with a simple message
// Setting up the routes for tasks and user management
app.use('/api/v1/', tasks_routers_1.default); // Task routes
app.use('/api/v1/auth/user', user_routers_1.default); // User authentication routes
app.use('/home', (req, res) => {
    res.send(`<a href="/api/v1/tasks"><h1>Navigate To Home Page</h1></a>`);
});
// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log("Server is listening on port:-", port); // Log when the server starts
});
