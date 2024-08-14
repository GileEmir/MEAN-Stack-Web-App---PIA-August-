
import { UserController } from '../controllers/user.controller';
import express from 'express';
import multer from 'multer';
import path from 'path'; // Import the path module
import fs from 'fs';

const userRouter = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


userRouter.route("/login").post(
  (req, res) => new UserController().login(req, res)
);
userRouter.route("/admin_login").post(
  (req, res) => new UserController().admin_login(req, res)
);
userRouter.route("/register").post(
  upload.single('profile_pic'), // Add multer middleware
  (req, res) => new UserController().register(req, res)
);
userRouter.route("/get_all_usernames").get(
    (req, res) => new UserController().getAllUserNames(req, res)
);
userRouter.route("/get_all_emails").get(
  (req, res) => new UserController().getAllEmails(req, res)
);

userRouter.route("/get_requested_users").get(
    (req, res) => new UserController().getRequestedUsers(req, res)
);
userRouter.route("/get_blocked_users").get(
  (req, res) => new UserController().getBlockedUsers(req, res)
);

userRouter.route("/accept_user").post(
    (req, res) => new UserController().acceptUser(req, res)
);  

userRouter.route("/decline_user").post(
  (req, res) => new UserController().declineUser(req, res)
);  

userRouter.route("/unblock_user").post(
  (req, res) => new UserController().unblockUser(req, res)
); 

userRouter.route("/change-password").post(
  (req, res) => new UserController().changePassword(req, res)
);
userRouter.route("/updateUserWithProfilePic").post(
  upload.single('profile_pic'), // Middleware to handle file upload
  (req, res) => new UserController().updateUserWithProfilePic(req, res)
);
userRouter.route("/updateUser").post(
  (req, res) => new UserController().updateUser(req, res)
);

userRouter.route("/get_all_owners").get(
  (req, res) => new UserController().getAllOwners(req, res)
);

userRouter.route("/getUserByUsername").post(
  (req, res) => new UserController().getUserByUsername(req, res)
);

userRouter.route("/get_all_decors").get(
  (req, res) => new UserController().getAllDecors(req, res)
);

userRouter.route("/get_unemployed_decors").get(
  (req, res) => new UserController().getUnemployedDecors(req, res)
);
userRouter.route("/employ-decor").post(
  (req, res) => new UserController().employDecor(req, res)
);

export default userRouter;