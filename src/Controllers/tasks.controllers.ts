import { Request, Response } from 'express';
import UserTask from '../Models/task.models.js';

// Extend the Express Request interface to include custom properties
export interface IRequest extends Request {
  body: {
    title: string; // Task title
    description: string; // Task description
    completed?: boolean; // Optional field for task completion status
  },
  user?: {
    _id: any; // User ID from authentication middleware
  }
}

// Controller to handle task creation
export const CreateTask = async (req: IRequest, res: Response): Promise<void> => {
  const { title, description } = req.body; // Extract title and description from request body
  console.log('Task creation endpoint called!');
  try {
    const task = await UserTask.create({
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
  } catch (error) {
    console.error('Error creating task:', error); // Log errors during task creation
    res.status(500).json({
      msg: 'Something went wrong while creating the task!', // Generic error response
    });
  }
};

// Controller to handle task deletion
export const DeleteTask = async (req: Request, res: Response): Promise<void> => {
  const { TaskId } = req.params; // Extract task ID from request parameters
  try {
    const task = await UserTask.findByIdAndDelete(TaskId); // Find and delete task by ID
    if (!task) {
      res.status(404).json({
        msg: 'Task not found!', // Response if task does not exist
      });
      return;
    }

    res.redirect('/api/v1/tasks'); // Redirect to the tasks list
  } catch (error) {
    console.error('Error deleting task:', error); // Log errors during task deletion
    res.status(500).json({
      msg: 'Something went wrong while deleting the task!', // Generic error response
    });
  }
};

// Controller to handle task updates
export const UpdateTask = async (req: IRequest, res: Response): Promise<void> => {
  const { title, description } = req.body; // Extract updated task details from request body
  const { TaskId } = req.params; // Extract task ID from request parameters
  try {
    const task = await UserTask.findByIdAndUpdate(
      TaskId, // Task ID to update
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
  } catch (error) {
    console.error('Error updating task:', error); // Log errors during task update
    res.status(500).json({
      msg: 'Something went wrong while updating the task!', // Generic error response
    });
  }
};

// Controller to fetch all tasks for the authenticated user
export const getAllTasks = async (req: IRequest, res: Response): Promise<void> => {
  try {
    console.log(req.user); // Log user details for debugging
    const userId = req?.user?._id ; // Extract user ID from request
    console.log('User ID:', userId); // Log user ID for debugging
    const allTasks = await UserTask.find({ createdBy: userId }); // Fetch tasks created by the user
    console.log('Number of tasks fetched:', allTasks.length); // Log the count of tasks fetched

    // Render the tasks view with user data and task list
    res.render('index', {
      tasks: allTasks,
      user: req.user,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error); // Log errors during task retrieval
    res.status(500).json({
      msg: 'Something went wrong while fetching tasks!', // Generic error response
    });
  }
};
