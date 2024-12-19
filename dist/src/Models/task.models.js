"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Defining the schema for Task
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});
// Creating the Task model using the schema and interface
const Task = (0, mongoose_1.model)('Task', taskSchema);
exports.default = Task;
