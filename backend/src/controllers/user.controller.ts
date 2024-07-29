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
            if (user && (user.type === 'owner' || user.type === 'decor')) {
            const passwordMatch = bcrypt.compareSync(passwordP, user.password);
            if (passwordMatch) {
                res.json(user);
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
            if (user && (user.type === 'admin')) {
            const passwordMatch = bcrypt.compareSync(passwordP, user.password);
            if (passwordMatch) {
                res.json(user);
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
    
        new UserM(user).save().then(ok => {
            res.json({ message: "ok" });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
    }


}