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
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 16
    },
    password: {
        type: String,
        required: true,
        maxlength: 16
    },
    email: {
        type: String,
        required: true,
        maxlength: 16
    },
    fullName: {
        type: String,
        required: true,
        maxlength: 16
    }
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        const salt = yield bcryptjs_1.default.genSalt(10);
        // Hash the password using the salt
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        // Proceed to save the user
        next();
    });
});
UserSchema.methods.HashPassword = function (Userpassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(16);
        const HashPassword = yield bcryptjs_1.default.hash(Userpassword, salt);
        console.log('User Hashed Password', HashPassword);
        return HashPassword;
    });
};
UserSchema.methods.ComparePassword = function (Userpassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isPasswordCorrect = yield bcryptjs_1.default.compare(Userpassword, this.password);
        return isPasswordCorrect;
    });
};
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
