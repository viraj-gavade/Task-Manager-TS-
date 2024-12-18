import { Request, Response } from 'express';
import Task from '../Models/task.models.js';

interface IRequest extends Request {
    body: {
      title: string;
      description: string;
      completed?: boolean; // Optional field
    };
  }

export const CreateTask = async (req:IRequest,res:Response):Promise<Response>=>{
    const { title,description } = req.body;
    try {
        
        const task = await Task.create({
            title:title,
            description:description
        })

        return res.status(200).json({msg:"Task Created Successfully!",Task:task})
    } catch (error) {
        return res.status(201).json({msg:"Something Went Wrong while creating task!"})
    }
}



export const DeleteTask  = async (req:Request,res:Response):Promise<Response>=>{

        const { TaskId } = req.params
    try {
            const task = await Task.findByIdAndDelete(TaskId)

        return res.status(200).json({msg:"Task deleted Successfully!"})
    } catch (error) {
        return res.status(201).json({msg:"Something Went Wrong while  deleting task!"})

    }
}


export const UpdateTask   = async (req:IRequest,res:Response):Promise<Response>=>{

        const { title, description} = req.body
        const { TaskId } = req.params
    try {
            const task = await Task.findByIdAndUpdate(TaskId,{
                title:title,
                description:description
            })

        return res.status(200).json({msg:"Task Updated Successfully!"})
    } catch (error) {
        return res.status(201).json({msg:"Something Went Wrong while updating task !"})

    }
}