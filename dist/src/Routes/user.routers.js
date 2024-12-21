"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("../Controllers/users.controllers");
const UserRouter = express_1.default.Router();
UserRouter.route('/signin')
    .get((req, res) => {
    res.render('signin.ejs');
})
    .post(users_controllers_1.SignInUser);
UserRouter.route('/signout').get(users_controllers_1.SignOutUser);
UserRouter.route('/signup')
    .get((req, res) => {
    res.render('signup.ejs');
})
    .post(users_controllers_1.SignUpUser);
exports.default = UserRouter;
