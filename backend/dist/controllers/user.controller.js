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
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt = __importStar(require("bcryptjs"));
const multer_1 = __importDefault(require("multer"));
const gardenSchedule_1 = __importDefault(require("../models/gardenSchedule"));
const upload = (0, multer_1.default)();
const DEFAULT_PROFILE_PIC_PATH = 'uploads/defaultProfilePic.png';
class UserController {
    constructor() {
        this.changePassword = (req, res) => {
            const username = req.body.username;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;
            user_1.default.findOne({ username: username })
                .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                }
                else {
                    const passwordMatch = bcrypt.compareSync(oldPassword, user.password);
                    if (!passwordMatch) {
                        res.status(403).json({ message: 'Old password is incorrect' });
                    }
                    else {
                        const hashedPassword = bcrypt.hashSync(newPassword, 8);
                        user.password = hashedPassword;
                        return user.save();
                    }
                }
            })
                .then(updatedUser => {
                if (updatedUser) {
                    res.status(200).json({ message: 'Password updated successfully' });
                }
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
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
        this.getAllEmails = (req, res) => {
            user_1.default.find({}, 'email') // Fetch all users and return only the email field
                .then(users => {
                const emails = users.map(user => user.email); // Correctly map to email
                res.json(emails);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let usernameP = req.body.username;
            let passwordP = req.body.password;
            try {
                let user = yield user_1.default.findOne({ username: usernameP });
                if (user && (user.type === 'owner' || user.type === 'decor')) {
                    yield this.checkPhotoUpload(usernameP);
                    // Re-fetch the user to get the updated status
                    user = yield user_1.default.findOne({ username: usernameP });
                    if (!user) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    // Check if the user's status is "active"
                    if (user.status !== 'active' && user.status !== 'blocked') {
                        return res.status(403).json({ message: 'User is not active' });
                    }
                    const passwordMatch = bcrypt.compareSync(passwordP, user.password);
                    if (passwordMatch) {
                        const userResponse = {
                            username: user.username,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            gender: user.gender,
                            address: user.address,
                            phone_number: user.phone_number,
                            email: user.email,
                            profile_pic: user.profile_pic,
                            credit_card_number: user.credit_card_number,
                            type: user.type,
                            status: user.status,
                            companyId: user.companyId
                        };
                        res.json(userResponse);
                    }
                    else {
                        res.status(403).json({ message: 'Unauthorized' });
                    }
                }
                else {
                    res.status(403).json({ message: 'Unauthorized' });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
        this.checkPhotoUpload = (username) => __awaiter(this, void 0, void 0, function* () {
            const decorator = yield user_1.default.findOne({ username, type: 'decor', status: 'active' });
            console.log("Entered the chedkPhotoUpload function");
            if (!decorator) {
                return;
            }
            const jobs = yield gardenSchedule_1.default.find({ workerId: username, completionDate: { $exists: true } });
            for (const job of jobs) {
                if (!job.completionDate) {
                    continue; // Skip this job if completionDate is not defined
                }
                const completionDate = new Date(job.completionDate);
                const now = new Date();
                const photoUploadDate = job.dateOfCompletionPhotoUpload ? new Date(job.dateOfCompletionPhotoUpload) : null;
                // Check if there is no photoUploadDate and if the current time is more than 24 hours past the completionDate
                if (!photoUploadDate && (now.getTime() - completionDate.getTime()) > 24 * 60 * 60 * 1000) {
                    console.log("found a job that is more than 24 hours past the completion date");
                    decorator.status = 'blocked';
                    yield decorator.save();
                    break;
                }
            }
        });
        this.admin_login = (req, res) => {
            let usernameP = req.body.username;
            let passwordP = req.body.password;
            user_1.default.findOne({ username: usernameP })
                .then((user) => {
                if (user && (user.type === 'admin') && user.status === 'active') {
                    const passwordMatch = bcrypt.compareSync(passwordP, user.password);
                    if (passwordMatch) {
                        const userResponse = {
                            username: user.username,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            gender: user.gender,
                            address: user.address,
                            phone_number: user.phone_number,
                            email: user.email,
                            profile_pic: user.profile_pic,
                            credit_card_number: user.credit_card_number,
                            type: user.type,
                            status: user.status,
                            companyId: user.companyId
                        };
                        res.json(userResponse);
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
            let profilePicPath = req.file ? `/uploads/${req.file.filename}` : '';
            let credit_card_number = req.body.credit_card_number;
            let type = req.body.type;
            let status = req.body.status;
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
                type: type,
                status: status,
                companyId: "" // Set companyId to null by default
            };
            new user_1.default(user).save().then(ok => {
                res.json({ message: "ok" });
            }).catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.getRequestedUsers = (req, res) => {
            user_1.default.find({ status: 'requested' })
                .then(users => {
                res.json(users);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.getBlockedUsers = (req, res) => {
            user_1.default.find({ status: 'blocked' })
                .then(users => {
                res.json(users);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.getAllOwners = (req, res) => {
            user_1.default.find({ type: 'owner', status: "active" })
                .then(users => {
                res.json(users);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.getAllDecors = (req, res) => {
            user_1.default.find({ type: 'decor', status: "active" })
                .then(users => {
                res.json(users);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.getUnemployedDecors = (req, res) => {
            user_1.default.find({
                type: 'decor',
                status: "active",
                $or: [
                    { companyId: null },
                    { companyId: "" }
                ]
            })
                .then(users => {
                res.json(users);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.getUserByUsername = (req, res) => {
            const { username } = req.body;
            user_1.default.findOne({ username: username })
                .then(users => {
                res.json(users);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.unblockUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const username = req.body.username;
            console.log(`Received request to unblock user: ${username}`);
            try {
                console.log(`Attempting to update user status to 'active' for username: ${username}`);
                const updatedUser = yield user_1.default.findOneAndUpdate({ username: username, status: 'blocked' }, { status: 'active' }, { new: true });
                if (!updatedUser) {
                    console.log(`User not found or not in requested status: ${username}`);
                    res.status(404).send({ message: 'User not found or not in requested status' });
                    return;
                }
                console.log(`User status updated to 'active' for username: ${username}`);
                // Find all jobs for the user that have been finished but do not have a completion photo uploaded
                console.log(`Finding jobs for user: ${username} that have been finished but do not have a completion photo uploaded`);
                const jobs = yield gardenSchedule_1.default.find({
                    workerId: username,
                    completionDate: { $ne: "" },
                    dateOfCompletionPhotoUpload: ""
                });
                console.log(`Found ${jobs.length} jobs for user: ${username} that need completion photo upload`);
                // Update the dateOfCompletionPhotoUpload field for these jobs to 1 hour after the completionDate
                for (const job of jobs) {
                    if (job.completionDate) {
                        const completionDate = new Date(job.completionDate);
                        const dateOfCompletionPhotoUpload = new Date(completionDate.getTime() + 60 * 60 * 1000); // Add 1 hour
                        job.dateOfCompletionPhotoUpload = dateOfCompletionPhotoUpload.toISOString();
                        yield job.save();
                        console.log(`Updated job with ID: ${job._id} for user: ${username} with dateOfCompletionPhotoUpload: ${dateOfCompletionPhotoUpload.toISOString()}`);
                    }
                    else {
                        console.log(`Job with ID: ${job._id} has an invalid completionDate`);
                    }
                }
                res.status(200).send({ message: 'User status updated to active and jobs updated', user: updatedUser });
                console.log(`Response sent successfully for user: ${username}`);
            }
            catch (err) {
                console.error(`Error updating user status or jobs for username: ${username}`, err);
                res.status(500).send({ message: 'Error updating user status or jobs', error: err });
            }
        });
        this.updateUserWithProfilePic = (req, res) => {
            const { username, first_name, last_name, gender, address, phone_number, email, credit_card_number, type, status } = req.body;
            let profilePicPath = req.file ? `/uploads/${req.file.filename}` : '';
            // Check if the profile picture is the default one
            if (profilePicPath === DEFAULT_PROFILE_PIC_PATH) {
                profilePicPath = DEFAULT_PROFILE_PIC_PATH;
            }
            const updatedUser = {
                first_name,
                last_name,
                gender,
                address,
                phone_number,
                email,
                profile_pic: profilePicPath, // Save the profile picture path
                credit_card_number,
                type,
                status
            };
            user_1.default.findOneAndUpdate({ username: username }, updatedUser, { new: true })
                .then(user => {
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json({ message: "User updated successfully", user });
            })
                .catch(err => {
                res.status(500).json({ message: 'Internal Server Error' });
            });
        };
        this.updateUser = (req, res) => {
            upload.none()(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                const username = req.params.username || req.body.username;
                if (!username) {
                    return res.status(400).json({ message: 'Username is required' });
                }
                const updateData = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    gender: req.body.gender,
                    address: req.body.address,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    credit_card_number: req.body.credit_card_number,
                    type: req.body.type,
                    status: req.body.status
                };
                // Check if at least one field is provided for update
                const hasUpdateFields = Object.values(updateData).some(value => value !== undefined);
                if (!hasUpdateFields) {
                    return res.status(400).json({ message: 'At least one field is required to update' });
                }
                try {
                    const updatedUser = yield user_1.default.findOneAndUpdate({ username: username }, updateData, { new: true });
                    if (!updatedUser) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
                }
                catch (err) {
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            }));
        };
        this.employDecor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { companyId, decorId } = req.body;
            try {
                const user = yield user_1.default.findOne({ _id: decorId, type: 'decor' });
                if (!user) {
                    return res.status(404).json({ message: 'Decorator not found' });
                }
                user.companyId = companyId;
                yield user.save();
                res.status(200).json({ message: 'Decorator employed successfully', user });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    acceptUser(req, res) {
        const username = req.body.username;
        user_1.default.findOneAndUpdate({ username: username, status: 'requested' }, { status: 'active' }, { new: true })
            .then(updatedUser => {
            if (!updatedUser) {
                res.status(404).send({ message: 'User not found or not in requested status' });
            }
            else {
                res.status(200).send({ message: 'User status updated to active', user: updatedUser });
            }
        })
            .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Error updating user status', error: err });
        });
    }
    declineUser(req, res) {
        const username = req.body.username;
        user_1.default.findOneAndUpdate({ username: username, status: 'requested' }, { status: 'deactivated' }, { new: true })
            .then(updatedUser => {
            if (!updatedUser) {
                res.status(404).send({ message: 'User not found or not in requested status' });
            }
            else {
                res.status(200).send({ message: 'User status updated to active', user: updatedUser });
            }
        })
            .catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Error updating user status', error: err });
        });
    }
}
exports.UserController = UserController;
