import express from 'express'
import UserM from '../models/user'
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const DEFAULT_PROFILE_PIC_PATH = 'uploads/defaultProfilePic.png';


export class UserController{
    
    
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

    login = (req: express.Request, res: express.Response) => {
        let usernameP = req.body.username;
        let passwordP = req.body.password;
    
        UserM.findOne({ username: usernameP })
        .then((user) => {
            if (user && (user.type === 'owner' || user.type === 'decor') && user.status === 'active') {
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
                        status: user.status
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
                    status: user.status
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
        let profilePicPath = req.file ? req.file.path : '';
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
            status: status
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
    
}