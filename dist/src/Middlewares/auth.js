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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_models_1 = __importDefault(require("../Models/users.models"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Middleware to verify JSON Web Token (JWT) and authenticate the user
const VerifyJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Retrieve the token from the request cookies
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshtoken;
        if (!token) {
            // If no token is provided, respond with an unauthorized error
            res.status(401).json({ msg: "Token Not Provided!" });
            return;
        }
        let decoded_token;
        try {
            // Verify and decode the JWT using the secret key
            decoded_token = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "default_secret");
        }
        catch (err) {
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
        const user = yield users_models_1.default.findById(decoded_token._id);
        if (!user) {
            // If no user is found, respond with a forbidden error
            res.status(403).json({ msg: "Invalid Access!" });
            return;
        }
        // Attach the authenticated user's details to the request object
        req.user = { _id: user._id, username: user.username };
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // Handle unexpected errors during the authentication process
        console.error("JWT verification middleware error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.default = VerifyJwt;
