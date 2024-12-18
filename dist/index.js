"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./DataBase/connection"));
const tasks_routers_1 = __importDefault(require("./Routes/tasks.routers"));
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Middleware to parse URL-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
(0, connection_1.default)();
app.get('/', (req, res) => {
    res.send('<h1>Hello World!<h1>');
});
app.use('/api/v1/', tasks_routers_1.default);
app.get('/home', (req, res) => {
    res.send('This is the home page');
});
app.listen(port, () => {
    console.log("Server is listining  on port:-", port);
});
