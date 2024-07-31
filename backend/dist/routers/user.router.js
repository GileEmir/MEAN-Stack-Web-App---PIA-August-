"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path")); // Import the path module
const userRouter = express_1.default.Router();
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../../uploads')); // Ensure the path is correct
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
userRouter.route("/login").post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route("/admin_login").post((req, res) => new user_controller_1.UserController().admin_login(req, res));
userRouter.route("/register").post(upload.single('profile_pic'), // Add multer middleware
(req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route("/get_all_usernames").get((req, res) => new user_controller_1.UserController().getAllUserNames(req, res));
userRouter.route("/get_requested_users").get((req, res) => new user_controller_1.UserController().getRequestedUsers(req, res));
userRouter.route("/accept_user").post((req, res) => new user_controller_1.UserController().acceptUser(req, res));
userRouter.route("/decline_user").post((req, res) => new user_controller_1.UserController().declineUser(req, res));
exports.default = userRouter;
