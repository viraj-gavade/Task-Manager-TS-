import express, { Express } from 'express';
import { CreateTask, DeleteTask, getAllTasks, UpdateTask } from '../Controllers/tasks.controllers';
import VerifyJwt from '../Middlewares/auth';

const TaskRouter = express.Router();

// Route to create a new task, with JWT verification middleware
TaskRouter.route('/tasks/addtask').post(VerifyJwt, CreateTask);

// Route to fetch all tasks, with JWT verification middleware
TaskRouter.route('/tasks').get(VerifyJwt, getAllTasks);

// Route to update a specific task by its ID, using POST method (you could consider PUT for updates)
TaskRouter.route('/task/:TaskId/update').post(VerifyJwt, UpdateTask);

// Route to delete a specific task by its ID, using POST method (you could consider DELETE for deletions)
TaskRouter.route('/task/:TaskId/delete').post(VerifyJwt, DeleteTask);

export default TaskRouter;
