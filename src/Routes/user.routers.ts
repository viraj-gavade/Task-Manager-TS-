import express , { Express, Router } from  'express'
import { SignInUser, SignOutUser, SignUpUser } from '../Controllers/users.controllers'
import { Request , Response, NextFunction } from 'express'

const UserRouter:Router = express.Router()

UserRouter.route('/signin')
.get((req:Request,res:Response)=>{
    res.render('signin.ejs')
})
.post(SignInUser)
UserRouter.route('/signout').get(SignOutUser)

UserRouter.route('/signup')
.get((req:Request,res:Response)=>{
    res.render('signup.ejs')
})
.post(SignUpUser)





export default UserRouter