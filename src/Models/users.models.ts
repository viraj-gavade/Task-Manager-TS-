import { Model , model , Schema, Document } from "mongoose";
import bcryptjs from 'bcryptjs'

interface User extends Document{
    username : string
    password : string
    email:string
    fullName : string
    HashPassword (Userpassword:string):Promise<string>
    ComparePassword (UserPass:string):Promise<Boolean>
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



UserSchema.pre<User>('save', async function (next) {
    if(!this.isModified('password')) return next()
        
        const salt = await bcryptjs.genSalt(10);
        
        // Hash the password using the salt
        this.password = await bcryptjs.hash(this.password, salt);
        
        // Proceed to save the user
        next();
        
    })
    
    UserSchema.methods.HashPassword = async function (Userpassword:string):Promise<string> {
        
        const salt = await bcryptjs.genSalt(16) 
        const HashPassword = await bcryptjs.hash(Userpassword,salt)
        console.log('User Hashed Password',HashPassword)
        return HashPassword
        
    }
    
    UserSchema.methods.ComparePassword = async function (Userpassword:string):Promise<Boolean> {
        const isPasswordCorrect:Boolean = await bcryptjs.compare(Userpassword,this.password)
        return isPasswordCorrect
        
    }
   
    
    
const UserModel = model<User>('User',UserSchema,) 
export default UserModel;
