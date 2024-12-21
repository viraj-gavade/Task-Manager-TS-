"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("../Controllers/users.controllers");
const UserRouter = express_1.default.Router();
// Route for the GET method to render the signin page (signin.ejs)
UserRouter.route('/signin')
    .get((req, res) => {
    res.render('signin.ejs'); // Render the signin page when GET request is made
})
    .post(users_controllers_1.SignInUser); // Route to handle the POST request for user sign-in
// Route for user sign-out
UserRouter.route('/signout')
    .get(users_controllers_1.SignOutUser); // Route to handle the GET request to sign out
// Route for the GET method to render the signup page (signup.ejs)
UserRouter.route('/signup')
    .get((req, res) => {
    res.render('signup.ejs'); // Render the signup page when GET request is made
})
    .post(users_controllers_1.SignUpUser); // Route to handle the POST request for user sign-up
exports.default = UserRouter;
