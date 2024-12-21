"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for Task
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String, // The title must be a string
        required: true, // This field is mandatory
        trim: true, // Removes whitespace from both ends of the string
    },
    description: {
        type: String, // The description must be a string
        required: true, // This field is mandatory
        trim: true, // Removes whitespace from both ends of the string
    },
    isCompleted: {
        type: Boolean, // The status must be a boolean value
        default: false, // Defaults to `false` (not completed)
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId, // A reference to the User model
        ref: 'User', // Points to the User collection in the database
    }
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});
// Create the Task model using the schema and interface
const Task = (0, mongoose_1.model)('Task', taskSchema);
exports.default = Task;
