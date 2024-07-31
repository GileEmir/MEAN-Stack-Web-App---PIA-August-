
import { UserController } from '../controllers/user.controller';
import express from 'express';
import multer from 'multer';
import path from 'path'; // Import the path module
import user from '../models/user';

const userRouter = express.Router();


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads')); // Ensure the path is correct
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
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

userRouter.route("/get_requested_users").get(
    (req, res) => new UserController().getRequestedUsers(req, res)
);

userRouter.route("/accept_user").post(
    (req, res) => new UserController().acceptUser(req, res)
);  

userRouter.route("/decline_user").post(
  (req, res) => new UserController().declineUser(req, res)
);  

userRouter.route("/change-password").post(
  (req, res) => new UserController().changePassword(req, res)
);


export default userRouter;