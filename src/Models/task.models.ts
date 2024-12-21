import mongoose, { Document, Schema, model } from "mongoose";

// Define an interface for the Task document
interface Itask extends Document {
    title: string; // The title of the task
    isCompleted: boolean; // Status of the task (completed or not)
    description: string; // Detailed description of the task
    createdBy?: mongoose.Types.ObjectId; // Reference to the User who created the task
}

// Define the schema for Task
const taskSchema: Schema<Itask> = new Schema(
    {
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
            type: mongoose.Schema.Types.ObjectId, // A reference to the User model
            ref: 'User', // Points to the User collection in the database
        }
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Create the Task model using the schema and interface
const Task = model<Itask>('Task', taskSchema);

export default Task;
