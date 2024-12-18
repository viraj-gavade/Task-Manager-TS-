import { Request, Response } from 'express';
import Task from '../Models/task.models.js';

interface IRequest extends Request {
    body: {
      title: string;
      description: string;
      completed?: boolean; // Optional field
    };
  }

export const CreateTask = async (req:IRequest,res:Response)=>{
    const { title,description } = req.body;
    try {
        
        const task = await Task.create({
            title:title,
            description:description
        })

        return res.status(200).json({msg:"Task Created Successfully!",Task:task})
    } catch (error) {
        
    }
}