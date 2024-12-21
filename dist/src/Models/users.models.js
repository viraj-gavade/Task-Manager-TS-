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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Define the schema for the User model
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String, // The username must be a string
        required: true, // This field is mandatory
        maxlength: 16, // Maximum length of the username is 16 characters
    },
    password: {
        type: String, // The password must be a string
        required: true, // This field is mandatory
        maxlength: 16, // Maximum length of the password is 16 characters
    },
    email: {
        type: String, // The email must be a string
        required: true, // This field is mandatory
        maxlength: 16, // Maximum length of the email is 16 characters
    },
    fullName: {
        type: String, // The full name must be a string
        required: true, // This field is mandatory
        maxlength: 16, // Maximum length of the full name is 16 characters
    }
});
// Middleware to hash the password before saving the user
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Skip hashing if the password field is not modified
        if (!this.isModified('password'))
            return next();
        // Generate a salt for hashing
        const salt = yield bcryptjs_1.default.genSalt(10);
        // Hash the password using the generated salt
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        // Proceed to save the user
        next();
    });
});
// Method to hash a given password
UserSchema.methods.HashPassword = function (Userpassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(16); // Generate a stronger salt
        const HashPassword = yield bcryptjs_1.default.hash(Userpassword, salt); // Hash the given password
        console.log('User Hashed Password', HashPassword); // Log the hashed password (for debugging purposes)
        return HashPassword;
    });
};
// Method to compare a given password with the stored password
UserSchema.methods.ComparePassword = function (Userpassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isPasswordCorrect = yield bcryptjs_1.default.compare(Userpassword, this.password); // Compare passwords
        return isPasswordCorrect;
    });
};
// Create and export the User model
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
