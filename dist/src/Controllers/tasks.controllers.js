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
exports.getAllTasks = exports.UpdateTask = exports.DeleteTask = exports.CreateTask = void 0;
const task_models_js_1 = __importDefault(require("../Models/task.models.js"));
// Controller to handle task creation
const CreateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body; // Extract title and description from request body
    console.log('Task creation endpoint called!');
    try {
        const task = yield task_models_js_1.default.create({
            title, // Task title
            description, // Task description
            createdBy: req.user // Associate task with the authenticated user
        });
        console.log(task); // Log the created task for debugging
        if (!task) {
            res.status(404).json({
                msg: 'Task not found!', // Response when task creation fails
            });
            return;
        }
        res.redirect('/api/v1/tasks'); // Redirect to the tasks list
    }
    catch (error) {
        console.error('Error creating task:', error); // Log errors during task creation
        res.status(500).json({
            msg: 'Something went wrong while creating the task!', // Generic error response
        });
    }
});
exports.CreateTask = CreateTask;
// Controller to handle task deletion
const DeleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { TaskId } = req.params; // Extract task ID from request parameters
    try {
        const task = yield task_models_js_1.default.findByIdAndDelete(TaskId); // Find and delete task by ID
        if (!task) {
            res.status(404).json({
                msg: 'Task not found!', // Response if task does not exist
            });
            return;
        }
        res.redirect('/api/v1/tasks'); // Redirect to the tasks list
    }
    catch (error) {
        console.error('Error deleting task:', error); // Log errors during task deletion
        res.status(500).json({
            msg: 'Something went wrong while deleting the task!', // Generic error response
        });
    }
});
exports.DeleteTask = DeleteTask;
// Controller to handle task updates
const UpdateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body; // Extract updated task details from request body
    const { TaskId } = req.params; // Extract task ID from request parameters
    try {
        const task = yield task_models_js_1.default.findByIdAndUpdate(TaskId, // Task ID to update
        { title, description }, // New task details
        { new: true } // Ensure the updated document is returned
        );
        if (!task) {
            res.status(404).json({
                msg: 'Task not found!', // Response if task does not exist
            });
            return;
        }
        res.redirect('/api/v1/tasks'); // Redirect to the tasks list
    }
    catch (error) {
        console.error('Error updating task:', error); // Log errors during task update
        res.status(500).json({
            msg: 'Something went wrong while updating the task!', // Generic error response
        });
    }
});
exports.UpdateTask = UpdateTask;
// Controller to fetch all tasks for the authenticated user
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(req.user); // Log user details for debugging
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id; // Extract user ID from request
        console.log('User ID:', userId); // Log user ID for debugging
        const allTasks = yield task_models_js_1.default.find({ createdBy: userId }); // Fetch tasks created by the user
        console.log('Number of tasks fetched:', allTasks.length); // Log the count of tasks fetched
        // Render the tasks view with user data and task list
        res.render('index', {
            tasks: allTasks,
            user: req.user,
        });
    }
    catch (error) {
        console.error('Error fetching tasks:', error); // Log errors during task retrieval
        res.status(500).json({
            msg: 'Something went wrong while fetching tasks!', // Generic error response
        });
    }
});
exports.getAllTasks = getAllTasks;
