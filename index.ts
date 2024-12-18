import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

import { Express,Request,Response } from "express";
import express from "express"
import  connectDB  from './DataBase/connection' 
import TaskRouter from "./Routes/tasks.routers";
const port : number = 3000
const app:Express = express()

app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

connectDB()

app.get('/',(req:Request,res:Response)=>{
    res.send('<h1>Hello World!<h1>')
})

app.use('/api/v1/',TaskRouter)
app.get('/home',(req:Request,res:Response)=>{
    res.send('This is the home page')
})




app.listen(port,()=>{
    console.log("Server is listining  on port:-",port)
})