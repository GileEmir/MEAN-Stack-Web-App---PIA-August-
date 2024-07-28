"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt = __importStar(require("bcryptjs"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let usernameP = req.body.username;
            let passwordP = req.body.password;
            user_1.default.findOne({ username: usernameP })
                .then((user) => {
                if (user && (user.type === 'owner' || user.type === 'decor')) {
                    const passwordMatch = bcrypt.compareSync(passwordP, user.password);
                    if (passwordMatch) {
                        res.json(user);
                    }
                    else {
                        res.status(403).json({ message: 'Unauthorized' });
                    }
                }
                else {
                    res.status(403).json({ message: 'Unauthorized' });
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.admin_login = (req, res) => {
            let usernameP = req.body.username;
            let passwordP = req.body.password;
            user_1.default.findOne({ username: usernameP })
                .then((user) => {
                if (user && (user.type === 'admin')) {
                    const passwordMatch = bcrypt.compareSync(passwordP, user.password);
                    if (passwordMatch) {
                        res.json(user);
                    }
                    else {
                        res.status(403).json({ message: 'Unauthorized' });
                    }
                }
                else {
                    res.status(403).json({ message: 'Unauthorized' });
                }
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.register = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let user = {
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname
            };
            new user_1.default(user).save().then(ok => {
                res.json({ message: "ok" });
            }).catch(err => {
                console.log(err);
            });
        };
    }
}
exports.UserController = UserController;
