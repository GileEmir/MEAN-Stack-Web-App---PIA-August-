import express from 'express'
import UserM from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response) => {
        let usernameP = req.body.username;
        let passwordP = req.body.password;
    
        UserM.findOne({ username: usernameP, password: passwordP })
            .then((user) => {
                if (user && (user.type === 'owner' || user.type === 'decor')) {
                    res.json(user);
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
    
        UserM.findOne({ username: usernameP, password: passwordP })
            .then((user) => {
                if (user && (user.type === 'admin')) {
                    res.json(user);
                } else {
                    res.status(403).json({ message: 'Unauthorized' });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    }

    
    register = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;

        let user = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname
        }

        new UserM(user).save().then(ok=>{
            res.json({message: "ok"})
        }).catch(err=>{
            console.log(err)
        })
    }
}