import express , { Express, Router } from  'express'
import { SignInUser, SignOutUser, SignUpUser } from '../Controllers/users.controllers'


const UserRouter:Router = express.Router()

UserRouter.route('/signin').post(SignInUser)
UserRouter.route('/signout').get(SignOutUser)
UserRouter.route('/signup').post(SignUpUser)





export default UserRouter