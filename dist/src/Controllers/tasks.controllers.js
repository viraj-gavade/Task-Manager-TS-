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
const CreateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    console.log('Here called !');
    try {
        const task = yield task_models_js_1.default.create({
            title,
            description,
            createdBy: req.user
        });
        console.log(task);
        if (!task) {
            res.status(404).json({
                msg: 'Task not found!',
            });
            return;
        }
        res.redirect('/api/v1/tasks');
    }
    catch (error) {
        console.error('Error creating task:', error); // Log the error for debugging
        res.status(500).json({
            msg: 'Something went wrong while creating the task!'
        });
    }
});
exports.CreateTask = CreateTask;
const DeleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { TaskId } = req.params;
    try {
        const task = yield task_models_js_1.default.findByIdAndDelete(TaskId);
        if (!task) {
            res.status(404).json({
                msg: 'Task not found!',
            });
            return;
        }
        res.redirect('/api/v1/tasks');
    }
    catch (error) {
        console.error('Error deleting task:', error); // Log the error for debugging
        res.status(500).json({
            msg: 'Something went wrong while deleting the task!'
        });
    }
});
exports.DeleteTask = DeleteTask;
const UpdateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const { TaskId } = req.params;
    try {
        const task = yield task_models_js_1.default.findByIdAndUpdate(TaskId, { title, description }, { new: true } // This ensures the updated document is returned
        );
        if (!task) {
            res.status(404).json({
                msg: 'Task not found!',
            });
            return;
        }
        res.redirect('/api/v1/tasks');
    }
    catch (error) {
        console.error('Error updating task:', error); // Log the error for debugging
        res.status(500).json({
            msg: 'Something went wrong while updating the task!'
        });
    }
});
exports.UpdateTask = UpdateTask;
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const userId = req.user._id;
        console.log("userid", userId);
        const allTasks = yield task_models_js_1.default.find({ createdBy: userId });
        console.log(allTasks.length);
        if (!allTasks || allTasks.length === 0) {
            res.render('index', {
                tasks: allTasks,
                user: req.user
            });
            return;
        }
        res.render('index', {
            tasks: allTasks,
            user: req.user
        });
    }
    catch (error) {
        console.error('Error fetching tasks:', error); // Log the error for debugging
        res.status(500).json({
            msg: 'Something went wrong while fetching tasks!'
        });
    }
});
exports.getAllTasks = getAllTasks;
