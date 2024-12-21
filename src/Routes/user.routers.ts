import express, { Express, Router } from 'express';
import { SignInUser, SignOutUser, SignUpUser } from '../Controllers/users.controllers';
import { Request, Response, NextFunction } from 'express';

const UserRouter: Router = express.Router();

// Route for the GET method to render the signin page (signin.ejs)
UserRouter.route('/signin')
  .get((req: Request, res: Response) => {
    res.render('signin.ejs');  // Render the signin page when GET request is made
  })
  .post(SignInUser);  // Route to handle the POST request for user sign-in

// Route for user sign-out
UserRouter.route('/signout')
  .get(SignOutUser);  // Route to handle the GET request to sign out

// Route for the GET method to render the signup page (signup.ejs)
UserRouter.route('/signup')
  .get((req: Request, res: Response) => {
    res.render('signup.ejs');  // Render the signup page when GET request is made
  })
  .post(SignUpUser);  // Route to handle the POST request for user sign-up

export default UserRouter;
