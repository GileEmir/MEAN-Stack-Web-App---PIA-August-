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
const DEFAULT_PROFILE_PIC_PATH = 'uploads/defaultProfilePic.png';
class UserController {
    constructor() {
        this.getAllUserNames = (req, res) => {
            user_1.default.find({}, 'username') // Fetch all users and return only the username field
                .then(users => {
                const usernames = users.map(user => user.username);
                res.json(usernames);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
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
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let gender = req.body.gender;
            let address = req.body.address;
            let phone_number = req.body.phone_number;
            let email = req.body.email;
            let profilePicPath = req.file ? req.file.path : '';
            let credit_card_number = req.body.credit_card_number;
            let type = req.body.type;
            // Check if the profile picture is the default one
            if (profilePicPath === DEFAULT_PROFILE_PIC_PATH) {
                profilePicPath = DEFAULT_PROFILE_PIC_PATH;
            }
            let user = {
                username: username,
                password: bcrypt.hashSync(password, 8), // Hash the password before saving
                first_name: first_name,
                last_name: last_name,
                gender: gender,
                address: address,
                phone_number: phone_number,
                email: email,
                profile_pic: profilePicPath, // Save the profile picture path
                credit_card_number: credit_card_number,
                type: type
            };
            new user_1.default(user).save().then(ok => {
                res.json({ message: "ok" });
            }).catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
    }
}
exports.UserController = UserController;
