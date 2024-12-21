import { strict } from 'assert'
import User from '../Models/users.models'
import { Request,Response } from 'express'

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

 export const SignInUser = async (req:IRequest,res:Response):Promise<void>=> {

    const { username , password , email } = req.body
   
    const SearchUser = await User.findOne({
        $or:[{username},{email}]
    })
   
    if(!SearchUser){
        res.status(200).json({
            msg:`There is no such user!`
        })
        return
    }

    const isPasswordCorrect  = await SearchUser.ComparePassword(password)
    if(isPasswordCorrect===false){
        res.status(200).json({
            msg:`Incorrect Password`,
            User:SearchUser
        })
        return
    }
    res.status(200).json({
        msg:`User Logged In!`,
        User:SearchUser
    })
    
}



export const SignOutUser = async (req:IRequest,res:Response):Promise<void>=> {

    res.status(200).clearCookie('refreshtoken').json({
        msg:"USER SIGN OUT SUCCESSFULLY"
    })
    return

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
   res.status(200).json(
    {
        msg:" User created successfully!",
        data : CheckUser
    }
)


}