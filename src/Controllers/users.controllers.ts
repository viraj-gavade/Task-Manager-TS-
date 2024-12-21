import { strict } from 'assert';
import User from '../Models/users.models';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Access token secret from environment variables
const ACCESS_TOKEN_SECRETE = process.env.ACCESS_TOKEN_SECRETE as string;

// Extended Request interface to include custom body properties
interface IRequest extends Request {
    body: {
        username: string; // Username of the user
        password: string; // Password of the user
        email: string; // Email of the user
        fullName: string; // Full name of the user
        confirm_password: string; // Confirmation of the password
    };
}

// Interface for a user object
interface User {
    username: string;
    password: string;
    email: string;
    fullName: string;
}

// Controller to handle user sign-in
export const SignInUser = async (req: IRequest, res: Response): Promise<void> => {
    try {
        const { username, password, email } = req.body;

        // Find the user by username or email
        const user = await User.findOne({
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
        const isPasswordCorrect = await user.ComparePassword(password);
        if (!isPasswordCorrect) {
            res.status(401).json({
                msg: "Incorrect password!"
            });
            return;
        }

        // Generate a JWT token with user ID and secret key
        const token = jwt.sign(
            { _id: user._id },
            process.env.ACCESS_TOKEN_SECRETE || "default_secret",
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
        );

        // Send success response with token in a cookie and redirect to tasks
        res.status(200).cookie('refreshtoken', token).redirect('/api/v1/tasks');
    } catch (error) {
        // Handle server-side errors
        console.error("SignInUser Error:", error);
        res.status(500).json({
            msg: "Internal server error!",
        });
    }
};

// Controller to handle user sign-out
export const SignOutUser = async (req: IRequest, res: Response): Promise<void> => {
    // Clear the refresh token cookie and redirect to sign-in page
    res.status(200).clearCookie('refreshtoken').redirect('/api/v1/auth/user/signin');
};

// Controller to handle user sign-up
export const SignUpUser = async (req: IRequest, res: Response): Promise<void> => {
    const {
        username,
        password,
        fullName,
        email,
        confirm_password
    } = req.body;

    // Check if a user already exists with the same username or email
    const FindUser = await User.findOne({
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
    const CreateUser = await User.create({
        username: username,
        password: confirm_password,
        fullName: fullName,
        email: email,
    });

    // Verify the created user exists in the database
    const CheckUser = await User.findById(CreateUser._id);
    if (!CheckUser) {
        res.status(200).json({
            msg: "Something went wrong while creating the user!"
        });
        return;
    }

    // Redirect the user to the sign-in page after successful sign-up
    res.status(200).redirect('/api/v1/auth/user/signin');
};
