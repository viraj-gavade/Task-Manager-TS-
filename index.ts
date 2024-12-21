import dotenv from "dotenv";
import path from 'path'
// Load environment variables from .env file
dotenv.config();

import { Express,Request,Response } from "express";
import express from "express"
import  connectDB  from './src/DataBase/connection' 
import TaskRouter from "./src/Routes/tasks.routers";
import UserRouter from "./src/Routes/user.routers";
import cookieParser from "cookie-parser";
const port : number = 3000
const app:Express = express()

app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(cookieParser())

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

connectDB()

app.get('/',(req:Request,res:Response)=>{
    res.send('<h1>Hello World!<h1>')
})

app.use('/api/v1/',TaskRouter)
app.use('/api/v1/auth/user',UserRouter)

app.get('/home',(req:Request,res:Response)=>{
    res.render('index.ejs')
})




app.listen(port,()=>{
    console.log("Server is listining  on port:-",port)
})