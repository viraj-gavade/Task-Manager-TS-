import { Document,Schema,Model,model } from "mongoose";
import { title } from "process";

// Defining an interface for the Task document

interface Itask extends Document {
    title:string
    isCompleted : boolean
    description : string
}


// Defining the schema for Task
const taskSchema: Schema<Itask> = new Schema(
    {
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
        
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
);

// Creating the Task model using the schema and interface
const Task = model<Itask>('Task', taskSchema);

export default Task;