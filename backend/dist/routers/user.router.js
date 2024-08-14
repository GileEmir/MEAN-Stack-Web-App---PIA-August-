"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path")); // Import the path module
const fs_1 = __importDefault(require("fs"));
const userRouter = express_1.default.Router();
// Ensure the uploads directory exists
const uploadDir = path_1.default.resolve(__dirname, '..', '..', 'uploads');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir);
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
userRouter.route("/login").post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route("/admin_login").post((req, res) => new user_controller_1.UserController().admin_login(req, res));
userRouter.route("/register").post(upload.single('profile_pic'), // Add multer middleware
(req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route("/get_all_usernames").get((req, res) => new user_controller_1.UserController().getAllUserNames(req, res));
userRouter.route("/get_all_emails").get((req, res) => new user_controller_1.UserController().getAllEmails(req, res));
userRouter.route("/get_requested_users").get((req, res) => new user_controller_1.UserController().getRequestedUsers(req, res));
userRouter.route("/get_blocked_users").get((req, res) => new user_controller_1.UserController().getBlockedUsers(req, res));
userRouter.route("/accept_user").post((req, res) => new user_controller_1.UserController().acceptUser(req, res));
userRouter.route("/decline_user").post((req, res) => new user_controller_1.UserController().declineUser(req, res));
userRouter.route("/unblock_user").post((req, res) => new user_controller_1.UserController().unblockUser(req, res));
userRouter.route("/change-password").post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route("/updateUserWithProfilePic").post(upload.single('profile_pic'), // Middleware to handle file upload
(req, res) => new user_controller_1.UserController().updateUserWithProfilePic(req, res));
userRouter.route("/updateUser").post((req, res) => new user_controller_1.UserController().updateUser(req, res));
userRouter.route("/get_all_owners").get((req, res) => new user_controller_1.UserController().getAllOwners(req, res));
userRouter.route("/getUserByUsername").post((req, res) => new user_controller_1.UserController().getUserByUsername(req, res));
userRouter.route("/get_all_decors").get((req, res) => new user_controller_1.UserController().getAllDecors(req, res));
userRouter.route("/get_unemployed_decors").get((req, res) => new user_controller_1.UserController().getUnemployedDecors(req, res));
userRouter.route("/employ-decor").post((req, res) => new user_controller_1.UserController().employDecor(req, res));
exports.default = userRouter;
