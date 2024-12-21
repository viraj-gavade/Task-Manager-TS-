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
const SignInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const SearchUser = yield users_models_1.default.findOne({
        $or: [{ username }, { email }]
    });
    if (!SearchUser) {
        res.status(200).json({
            msg: `There is no such user!`
        });
        return;
    }
    const isPasswordCorrect = yield SearchUser.ComparePassword(password);
    if (isPasswordCorrect === false) {
        res.status(200).json({
            msg: `Incorrect Password`,
            User: SearchUser
        });
        return;
    }
    res.status(200).json({
        msg: `User Logged In!`,
        User: SearchUser
    });
});
exports.SignInUser = SignInUser;
const SignOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).clearCookie('refreshtoken').json({
        msg: "USER SIGN OUT SUCCESSFULLY"
    });
    return;
});
exports.SignOutUser = SignOutUser;
const SignUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fullName, email, confirm_password } = req.body;
    const FindUser = yield users_models_1.default.findOne({
        $or: [{ username }, { email }]
    });
    if (FindUser) {
        res.status(200).json({
            msg: "User Already Exists!"
        });
        return;
    }
    if (password !== confirm_password) {
        res.status(200).json({
            msg: " Passwords doesn't match!"
        });
        return;
    }
    const CreateUser = yield users_models_1.default.create({
        username: username,
        password: confirm_password,
        fullName: fullName,
        email: email,
    });
    const CheckUser = yield users_models_1.default.findById(CreateUser._id);
    if (!CheckUser) {
        res.status(200).json({
            msg: "Something went wrong while creating the user!"
        });
        return;
    }
    res.status(200).json({
        msg: " User created successfully!",
        data: CheckUser
    });
});
exports.SignUpUser = SignUpUser;
