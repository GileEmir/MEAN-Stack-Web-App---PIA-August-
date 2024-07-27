"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    gender: String,
    address: String,
    phone_number: String,
    email: String,
    profile_pic: String,
    credit_card_number: String,
    type: String
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('UserM', userSchema, 'users');
