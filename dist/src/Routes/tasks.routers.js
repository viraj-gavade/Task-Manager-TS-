"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controllers_1 = require("../Controllers/tasks.controllers");
const TaskRouter = express_1.default.Router();
TaskRouter.route('/tasks/addtask').post(tasks_controllers_1.CreateTask);
TaskRouter.route('/tasks').get(tasks_controllers_1.getAllTasks); // Use GET for fetching tasks
TaskRouter.route('/task/:TaskId/update')
    .post(tasks_controllers_1.UpdateTask);
TaskRouter.route('/task/:TaskId/delete')
    .post(tasks_controllers_1.DeleteTask);
exports.default = TaskRouter;
