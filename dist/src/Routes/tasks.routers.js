"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controllers_1 = require("../Controllers/tasks.controllers");
const auth_1 = __importDefault(require("../Middlewares/auth"));
const TaskRouter = express_1.default.Router();
TaskRouter.route('/tasks/addtask').post(auth_1.default, tasks_controllers_1.CreateTask);
TaskRouter.route('/tasks').get(auth_1.default, tasks_controllers_1.getAllTasks); // Use GET for fetching tasks
TaskRouter.route('/task/:TaskId/update')
    .post(auth_1.default, tasks_controllers_1.UpdateTask);
TaskRouter.route('/task/:TaskId/delete')
    .post(auth_1.default, tasks_controllers_1.DeleteTask);
exports.default = TaskRouter;
