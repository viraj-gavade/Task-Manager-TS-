import User from '../Models/users.models'
import { Request,Response } from 'express'

interface IRequest extends Request{
    body:{
        username:string,
        password:string,
        email:string,
        fullName:string
    }
}

 export const SignInUser = async (req:Request,res:Response):Promise<void>=> {


    res.send('This is the sign in user controller')
}



export const SignOutUser = async (req:Request,res:Response):Promise<void>=> {
    res.send('This is the sign out user controller')

}


export const SignUpUser = async (req:Request,res:Response):Promise<void>=> {
    res.send('This is the sign Up user controller')

}