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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUser = exports.SignOutUser = exports.SignInUser = void 0;
const SignInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('This is the sign in user controller');
});
exports.SignInUser = SignInUser;
const SignOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('This is the sign out user controller');
});
exports.SignOutUser = SignOutUser;
const SignUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('This is the sign Up user controller');
});
exports.SignUpUser = SignUpUser;
