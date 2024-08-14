import express from 'express'
import UserM from '../models/user'
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import multer from 'multer';
import gardenSchedule from '../models/gardenSchedule';

const upload = multer();

const DEFAULT_PROFILE_PIC_PATH = 'uploads/defaultProfilePic.png';


export class UserController{
    changePassword = (req: express.Request, res: express.Response) => {
        const username = req.body.username;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        UserM.findOne({ username: username })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                } else {
                    const passwordMatch = bcrypt.compareSync(oldPassword, user.password);
                    if (!passwordMatch) {
                        res.status(403).json({ message: 'Old password is incorrect' });
                    } else {
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
    }
    
    
    getAllUserNames = (req: express.Request, res: express.Response) => {
        UserM.find({}, 'username') // Fetch all users and return only the username field
        .then(users => {
            const usernames = users.map(user => user.username);
            res.json(usernames);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    getAllEmails = (req: express.Request, res: express.Response) => {
        UserM.find({}, 'email') // Fetch all users and return only the email field
        .then(users => {
            const emails = users.map(user => user.email); // Correctly map to email
            res.json(emails);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    login = async (req: express.Request, res: express.Response) => {
        let usernameP = req.body.username;
        let passwordP = req.body.password;
        
        try {
            let user = await UserM.findOne({ username: usernameP });
        
            if (user && (user.type === 'owner' || user.type === 'decor')) {
            await this.checkPhotoUpload(usernameP);
        
            // Re-fetch the user to get the updated status
            user = await UserM.findOne({ username: usernameP });
        
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
             // Check if the user's status is "active"
             if (user.status !== 'active'  && user.status !== 'blocked' ) {
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
            } else {
                res.status(403).json({ message: 'Unauthorized' });
            }
            } else {
            res.status(403).json({ message: 'Unauthorized' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    checkPhotoUpload = async (username: string) => {
        const decorator = await UserM.findOne({ username, type: 'decor', status: 'active' });
        
        console.log("Entered the chedkPhotoUpload function");
        if (!decorator) {
            return;
        }
    
        const jobs = await gardenSchedule.find({ workerId: username, completionDate: { $exists: true } });
    
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
                await decorator.save();
                break;
            }
        }
    };

    admin_login = (req: express.Request, res: express.Response) => {
        let usernameP = req.body.username;
        let passwordP = req.body.password;

        UserM.findOne({ username: usernameP })
        .then((user) => {
            if (user && (user.type === 'admin') && user.status === 'active' ) {
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
            } else {
                res.status(403).json({ message: 'Unauthorized' });
            }
            } else {
                res.status(403).json({ message: 'Unauthorized' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }
    
    register = (req: express.Request, res: express.Response) => {
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

        new UserM(user).save().then(ok => {
            res.json({ message: "ok" });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }


    getRequestedUsers = (req: express.Request, res: express.Response) => {
        UserM.find({ status: 'requested' })
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    getBlockedUsers = (req: express.Request, res: express.Response) => {
        UserM.find({ status: 'blocked' })
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }


    getAllOwners = (req: express.Request, res: express.Response) => {
        UserM.find({ type : 'owner' , status: "active"})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    getAllDecors = (req: express.Request, res: express.Response) => {
        UserM.find({ type : 'decor' , status: "active"})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }

    getUnemployedDecors = (req: express.Request, res: express.Response) => {
        UserM.find({ 
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
    }

    getUserByUsername = (req: express.Request, res: express.Response) => {
        const {username} = req.body;
        UserM.findOne({ username : username })
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }


    acceptUser(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): void {
        const username = req.body.username; 

        UserM.findOneAndUpdate({ username: username, status: 'requested' }, { status: 'active' }, { new: true })
            .then(updatedUser => {
                if (!updatedUser) {
                    res.status(404).send({ message: 'User not found or not in requested status' });
                } else {
                    res.status(200).send({ message: 'User status updated to active', user: updatedUser });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ message: 'Error updating user status', error: err });
            });
    }

    declineUser(req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>): void {
        const username = req.body.username; 

        UserM.findOneAndUpdate({ username: username, status: 'requested' }, { status: 'deactivated' }, { new: true })
            .then(updatedUser => {
                if (!updatedUser) {
                    res.status(404).send({ message: 'User not found or not in requested status' });
                } else {
                    res.status(200).send({ message: 'User status updated to active', user: updatedUser });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ message: 'Error updating user status', error: err });
            });
    }
    
    unblockUser = async (req: Request, res: Response): Promise<void> => {
        const username = req.body.username;
        console.log(`Received request to unblock user: ${username}`);
    
        try {
            console.log(`Attempting to update user status to 'active' for username: ${username}`);
            const updatedUser = await UserM.findOneAndUpdate(
                { username: username, status: 'blocked' },
                { status: 'active' },
                { new: true }
            );
            
            if (!updatedUser) {
                console.log(`User not found or not in requested status: ${username}`);
                res.status(404).send({ message: 'User not found or not in requested status' });
                return;
            }
            
            console.log(`User status updated to 'active' for username: ${username}`);
            
            // Find all jobs for the user that have been finished but do not have a completion photo uploaded
            console.log(`Finding jobs for user: ${username} that have been finished but do not have a completion photo uploaded`);
            const jobs = await gardenSchedule.find({
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
                    await job.save();
                    console.log(`Updated job with ID: ${job._id} for user: ${username} with dateOfCompletionPhotoUpload: ${dateOfCompletionPhotoUpload.toISOString()}`);
                } else {
                    console.log(`Job with ID: ${job._id} has an invalid completionDate`);
                }
            }
            
            res.status(200).send({ message: 'User status updated to active and jobs updated', user: updatedUser });
            console.log(`Response sent successfully for user: ${username}`);
            } catch (err) {
                console.error(`Error updating user status or jobs for username: ${username}`, err);
                res.status(500).send({ message: 'Error updating user status or jobs', error: err });
            }
    };
    
    updateUserWithProfilePic = (req: Request, res: Response) => {
        const {
            username,
            first_name,
            last_name,
            gender,
            address,
            phone_number,
            email,
            credit_card_number,
            type,
            status
        } = req.body;
    
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
    
        UserM.findOneAndUpdate({ username: username }, updatedUser, { new: true })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json({ message: "User updated successfully", user });
            })
            .catch(err => {
                res.status(500).json({ message: 'Internal Server Error' });
            });
    }
            
    updateUser = (req: express.Request, res: express.Response) => {
        upload.none()(req, res, async (err) => {
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
                const updatedUser = await UserM.findOneAndUpdate({ username: username }, updateData, { new: true });
    
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
    
                return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
            } catch (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }

    employDecor = async (req: express.Request, res: express.Response) => {
        const { companyId, decorId } = req.body;
    
        try {
            const user = await UserM.findOne({ _id: decorId, type: 'decor' });
    
            if (!user) {
                return res.status(404).json({ message: 'Decorator not found' });
            }
    
            user.companyId = companyId;
            await user.save();
    
            res.status(200).json({ message: 'Decorator employed successfully', user });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

}