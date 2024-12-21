"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controllers_1 = require("../Controllers/tasks.controllers");
const auth_1 = __importDefault(require("../Middlewares/auth"));
const TaskRouter = express_1.default.Router();
// Route to create a new task, with JWT verification middleware
TaskRouter.route('/tasks/addtask').post(auth_1.default, tasks_controllers_1.CreateTask);
// Route to fetch all tasks, with JWT verification middleware
TaskRouter.route('/tasks').get(auth_1.default, tasks_controllers_1.getAllTasks);
// Route to update a specific task by its ID, using POST method (you could consider PUT for updates)
TaskRouter.route('/task/:TaskId/update').post(auth_1.default, tasks_controllers_1.UpdateTask);
// Route to delete a specific task by its ID, using POST method (you could consider DELETE for deletions)
TaskRouter.route('/task/:TaskId/delete').post(auth_1.default, tasks_controllers_1.DeleteTask);
exports.default = TaskRouter;
