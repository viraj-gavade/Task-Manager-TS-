import { Request, Response } from 'express';
import Task from '../Models/task.models.js';

interface IRequest extends Request {
  body: {
    title: string;
    description: string;
    completed?: boolean; // Optional field
  };
}

export const CreateTask = async (req: IRequest, res: Response): Promise<void> => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
    });

    if (!task) {
        res.status(404).json({
         msg: 'Task not found!',
       });
       return;
     }
     res.redirect('/api/v1/tasks')
  } catch (error) {
    console.error('Error creating task:', error); // Log the error for debugging
     res.status(500).json({
      msg: 'Something went wrong while creating the task!'
    });
  }
};

export const DeleteTask = async (req: Request, res: Response): Promise<void> => {
  const { TaskId } = req.params;
  try {
    const task = await Task.findByIdAndDelete(TaskId);
    if (!task) {
       res.status(404).json({
        msg: 'Task not found!',
      });
      return;
    }

    res.redirect('/api/v1/tasks')
  } catch (error) {
    console.error('Error deleting task:', error); // Log the error for debugging
     res.status(500).json({
      msg: 'Something went wrong while deleting the task!'
    });
  }
};

export const UpdateTask = async (req: IRequest, res: Response): Promise<void> => {
  const { title, description } = req.body;
  const { TaskId } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(
      TaskId,
      { title, description },
      { new: true } // This ensures the updated document is returned
    );
    if (!task) {
       res.status(404).json({
        msg: 'Task not found!',
      });
      return ;
    }

    res.redirect('/api/v1/tasks')

  } catch (error) {
    console.error('Error updating task:', error); // Log the error for debugging
     res.status(500).json({
      msg: 'Something went wrong while updating the task!'
    });
  }
};

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const allTasks = await Task.find({});
    if (!allTasks || allTasks.length === 0) {
       res.status(404).json({
        msg: 'No tasks found!',
      });
      return
    }

     res.render('index',{
      tasks:allTasks
     })
  } catch (error) {
    console.error('Error fetching tasks:', error); // Log the error for debugging
     res.status(500).json({
      msg: 'Something went wrong while fetching tasks!'
    });
  }
};
