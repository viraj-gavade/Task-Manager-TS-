import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../Models/users.models';
import { Request, Response, NextFunction } from 'express';
import { Mongoose } from 'mongoose';
import express,{ Express } from 'express';
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
export interface IRequest extends Request {
        user?: {
            _id: any;
            username?: string;
            password?: string;
            email?: string;
            fullName?: string;
        }
    }


const VerifyJwt = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies?.refreshtoken;
        if (!token) {
            res.status(401).json({ msg: "Token Not Provided!" });
            return;
        }

        let decoded_token: JwtPayload | undefined;
        try {
            decoded_token = jwt.verify(token, "JWTSCERTE" ) as JwtPayload;
        } catch (err) {
            console.log(err)
             res.status(401).json({ msg: "Invalid or Expired T returnoken!" });
        }

        if (!decoded_token || !decoded_token._id) {
             res.status(401).json({ msg: "Invalid Token!" })
             return        
            }

        const user = await User.findById(decoded_token._id);
        if (!user) {
             res.status(403).json({ msg: "Invalid Access!" })
              return
        }

        req.user = { _id: user._id , username: user.username }; // Set the user to the request object
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export default VerifyJwt;
