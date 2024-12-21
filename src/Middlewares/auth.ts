import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../Models/users.models';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Define custom IRequest interface to include user details
export interface IRequest extends Request {
    user?: {
        _id: any;
        username?: string;
        password?: string;
        email?: string;
        fullName?: string;
    };
}

// Middleware to verify JSON Web Token (JWT) and authenticate the user
const VerifyJwt = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Retrieve the token from the request cookies
        const token = req.cookies?.refreshtoken;
        if (!token) {
            // If no token is provided, respond with an unauthorized error
            res.status(401).json({ msg: "Token Not Provided!" });
            return;
        }

        let decoded_token: JwtPayload | undefined;
        try {
            // Verify and decode the JWT using the secret key
            decoded_token = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as JwtPayload;
        } catch (err) {
            // Handle token verification errors
            console.error("Token verification error:", err);
            res.status(401).json({ msg: "Invalid or Expired Token!" });
            return;
        }

        // Check if the decoded token contains a valid user ID
        if (!decoded_token || !decoded_token._id) {
            res.status(401).json({ msg: "Invalid Token!" });
            return;
        }

        // Find the user associated with the decoded token's user ID
        const user = await User.findById(decoded_token._id);
        if (!user) {
            // If no user is found, respond with a forbidden error
            res.status(403).json({ msg: "Invalid Access!" });
            return;
        }

        // Attach the authenticated user's details to the request object
        req.user = { _id: user._id, username: user.username };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle unexpected errors during the authentication process
        console.error("JWT verification middleware error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export default VerifyJwt;
