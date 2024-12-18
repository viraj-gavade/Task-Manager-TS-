import express, { Express } from 'express';
import { CreateTask, DeleteTask, getAllTasks, UpdateTask } from '../Controllers/tasks.controllers';


const TaskRouter = express.Router();


TaskRouter.route('/tasks/addtask').post(CreateTask);


TaskRouter.route('/tasks').get(getAllTasks);  // Use GET for fetching tasks


TaskRouter.route('/task/:TaskId')
  .patch(UpdateTask)
  .delete(DeleteTask);

export default TaskRouter;
