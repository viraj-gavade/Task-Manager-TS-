"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUser = exports.SignOutUser = exports.SignInUser = void 0;
const users_models_1 = __importDefault(require("../Models/users.models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Access token secret from environment variables
const ACCESS_TOKEN_SECRETE = process.env.ACCESS_TOKEN_SECRETE;
// Controller to handle user sign-in
const SignInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        // Find the user by username or email
        const user = yield users_models_1.default.findOne({
            $or: [{ username }, { email }]
        });
        // If the user doesn't exist, send a 404 response
        if (!user) {
            res.status(404).json({
                msg: "User not found!"
            });
            return;
        }
        // Verify the provided password using the model's method
        const isPasswordCorrect = yield user.ComparePassword(password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                msg: "Incorrect password!"
            });
            return;
        }
        // Generate a JWT token with user ID and secret key
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRETE || "default_secret", { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" });
        // Send success response with token in a cookie and redirect to tasks
        res.status(200).cookie('refreshtoken', token).redirect('/api/v1/tasks');
    }
    catch (error) {
        // Handle server-side errors
        console.error("SignInUser Error:", error);
        res.status(500).json({
            msg: "Internal server error!",
        });
    }
});
exports.SignInUser = SignInUser;
// Controller to handle user sign-out
const SignOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear the refresh token cookie and redirect to sign-in page
    res.status(200).clearCookie('refreshtoken').redirect('/api/v1/auth/user/signin');
});
exports.SignOutUser = SignOutUser;
// Controller to handle user sign-up
const SignUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fullName, email, confirm_password } = req.body;
    // Check if a user already exists with the same username or email
    const FindUser = yield users_models_1.default.findOne({
        $or: [{ username }, { email }]
    });
    if (FindUser) {
        res.status(200).json({
            msg: "User Already Exists!"
        });
        return;
    }
    // Ensure the passwords match
    if (password !== confirm_password) {
        res.status(200).json({
            msg: "Passwords don't match!"
        });
        return;
    }
    // Create a new user in the database
    const CreateUser = yield users_models_1.default.create({
        username: username,
        password: confirm_password,
        fullName: fullName,
        email: email,
    });
    // Verify the created user exists in the database
    const CheckUser = yield users_models_1.default.findById(CreateUser._id);
    if (!CheckUser) {
        res.status(200).json({
            msg: "Something went wrong while creating the user!"
        });
        return;
    }
    // Redirect the user to the sign-in page after successful sign-up
    res.status(200).redirect('/api/v1/auth/user/signin');
});
exports.SignUpUser = SignUpUser;
