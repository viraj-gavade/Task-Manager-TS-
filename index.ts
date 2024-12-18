import { Express,Request,Response } from "express";
import express from "express"

const port : number = 3000

const app:Express = express()


app.get('/',(req:Request,res:Response)=>{
    res.send('<h1>Hello World!<h1>')
})


app.get('/home',(req:Request,res:Response)=>{
    res.send('This is the home page')
})




app.listen(port,()=>{
    console.log("Server is listining  on port:-",port)
})