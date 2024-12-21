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
const VerifyJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshtoken;
        if (!token) {
            res.status(401).json({ msg: "Token Not Provided!" });
            return;
        }
        let decoded_token;
        try {
            decoded_token = jsonwebtoken_1.default.verify(token, "JWTSCERTE");
        }
        catch (err) {
            console.log(err);
            res.status(401).json({ msg: "Invalid or Expired T returnoken!" });
        }
        if (!decoded_token || !decoded_token._id) {
            res.status(401).json({ msg: "Invalid Token!" });
            return;
        }
        const user = yield users_models_1.default.findById(decoded_token._id);
        if (!user) {
            res.status(403).json({ msg: "Invalid Access!" });
            return;
        }
        req.user = { _id: user._id, username: user.username }; // Set the user to the request object
        next(); // Proceed to the next middleware
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.default = VerifyJwt;
