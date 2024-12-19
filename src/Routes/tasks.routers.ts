import express, { Express } from 'express';
import { CreateTask, DeleteTask, getAllTasks, UpdateTask } from '../Controllers/tasks.controllers';


const TaskRouter = express.Router();


TaskRouter.route('/tasks/addtask').post(CreateTask);


TaskRouter.route('/tasks').get(getAllTasks);  // Use GET for fetching tasks


TaskRouter.route('/task/:TaskId/update')
  .post(UpdateTask)

TaskRouter.route('/task/:TaskId/delete')
  .post(DeleteTask);

export default TaskRouter;
