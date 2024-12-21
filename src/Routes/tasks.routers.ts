import express, { Express } from 'express';
import { CreateTask, DeleteTask, getAllTasks, UpdateTask } from '../Controllers/tasks.controllers';
import VerifyJwt  from '../Middlewares/auth';

const TaskRouter = express.Router();


TaskRouter.route('/tasks/addtask').post(VerifyJwt,CreateTask);


TaskRouter.route('/tasks').get(VerifyJwt,getAllTasks);  // Use GET for fetching tasks


TaskRouter.route('/task/:TaskId/update')
  .post(VerifyJwt,UpdateTask)

TaskRouter.route('/task/:TaskId/delete')
  .post(VerifyJwt,DeleteTask);

export default TaskRouter;
