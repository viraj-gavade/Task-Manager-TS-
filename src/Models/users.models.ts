import { Model , model , Schema, Document } from "mongoose";

interface User extends Document{
    username : string
    password : string
    email:string
    fullName : string
}


const   UserSchema : Schema<User> = new Schema(
    {
        username : {
            type:String,
            required:true,
            maxlength:16
        },
        password:{
            type:String,
            required:true,
            maxlength:16  
        },
        email:{
            type:String,
            required:true,
            maxlength:16    
        },
        fullName:{
            type:String,
            required:true,
            maxlength:16    
        }
    }
)

const UserModel = model<User>('User',UserSchema,) 


export default UserModel;
