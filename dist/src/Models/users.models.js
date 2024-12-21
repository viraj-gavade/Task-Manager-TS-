"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
