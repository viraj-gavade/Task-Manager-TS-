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
exports.UpdateTask = exports.DeleteTask = exports.CreateTask = void 0;
const task_models_js_1 = __importDefault(require("../Models/task.models.js"));
const CreateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const task = yield task_models_js_1.default.create({
            title: title,
            description: description
        });
        return res.status(200).json({ msg: "Task Created Successfully!", Task: task });
    }
    catch (error) {
        return res.status(201).json({ msg: "Something Went Wrong while creating task!" });
    }
});
exports.CreateTask = CreateTask;
const DeleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { TaskId } = req.params;
    try {
        const task = yield task_models_js_1.default.findByIdAndDelete(TaskId);
        return res.status(200).json({ msg: "Task deleted Successfully!" });
    }
    catch (error) {
        return res.status(201).json({ msg: "Something Went Wrong while  deleting task!" });
    }
});
exports.DeleteTask = DeleteTask;
const UpdateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const { TaskId } = req.params;
    try {
        const task = yield task_models_js_1.default.findByIdAndUpdate(TaskId, {
            title: title,
            description: description
        });
        return res.status(200).json({ msg: "Task Updated Successfully!" });
    }
    catch (error) {
        return res.status(201).json({ msg: "Something Went Wrong while updating task !" });
    }
});
exports.UpdateTask = UpdateTask;
