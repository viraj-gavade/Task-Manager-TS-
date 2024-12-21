import { strict } from 'assert'
import User from '../Models/users.models'
import { Request,Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const ACCESS_TOKEN_SECRETE = process.env.ACCESS_TOKEN_SECRETE as string;

interface IRequest extends Request{
    body:{

        username:string,
        password:string,
        email:string,
        fullName:string,
        confirm_password:string
    }
}

interface User {
    username:string,
    password:string,
    email:string,
    fullName:string
}

export const SignInUser = async (req: IRequest, res: Response): Promise<void> => {
    try {
        const { username, password, email } = req.body;

        // Find the user by username or email
        const user = await User.findOne({
            $or: [{ username }, { email }]
        });

        // If the user doesn't exist, send an error response
        if (!user) {
             res.status(404).json({
                msg: "User not found!"
            });
            return
        }

        // Verify the provided password
        const isPasswordCorrect = await user.ComparePassword(password);
        if (!isPasswordCorrect) {
             res.status(401).json({
                msg: "Incorrect password!"
            });
            return
        }

        // Generate a JWT token
        const token = jwt.sign(
            { _id: user._id },
            process.env.ACCESS_TOKEN_SECRETE || "default_secret",
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
        );

        // Send success response with user data and token
        res.status(200).cookie('refreshtoken',token).redirect('/api/v1/tasks')
    } catch (error) {
        // Handle any server errors
        console.error("SignInUser Error:", error);
        res.status(500).json({
            msg: "Internal server error!",
        });
    }
};





export const SignOutUser = async (req:IRequest,res:Response):Promise<void>=> {

    res.status(200).clearCookie('refreshtoken').redirect('/api/v1/auth/user/signin')

}


export const SignUpUser = async (req:IRequest,res:Response):Promise<void>=> {
   const {
     username,
     password,
     fullName,
     email ,
     confirm_password
   } = req.body

   const FindUser = await User.findOne({
    $or:[{username},{email}]
   })
   if(FindUser){
    res.status(200).json(
        {
            msg:"User Already Exists!"
        }
    )
    return
   }

   if(password!==confirm_password){
    res.status(200).json(
        {
            msg:" Passwords doesn't match!"
        }
    )
    return
   }
   const CreateUser= await User.create({
    username:username,
    password:confirm_password,
    fullName:fullName,
    email:email ,
   })

   const CheckUser = await User.findById(CreateUser._id)
   if(!CheckUser){
    res.status(200).json(
        {
            msg:"Something went wrong while creating the user!"
        }
    )
    return 
   }
   res.status(200).redirect('/api/v1/auth/user/signin')

}
