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
const connection_1 = __importDefault(require("./src/DataBase/connection"));
const tasks_routers_1 = __importDefault(require("./src/Routes/tasks.routers"));
const user_routers_1 = __importDefault(require("./src/Routes/user.routers"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const port = 3000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// Middleware to parse URL-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
(0, connection_1.default)();
app.get('/', (req, res) => {
    res.send('<h1>Hello World!<h1>');
});
app.use('/api/v1/', tasks_routers_1.default);
app.use('/api/v1/auth/user', user_routers_1.default);
app.get('/home', (req, res) => {
    res.render('index.ejs');
});
app.listen(port, () => {
    console.log("Server is listining  on port:-", port);
});
