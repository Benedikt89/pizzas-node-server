import {usersRepository} from "../dal/users-repository";

import express from "express";
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req: any, res: any, next: any) => {

    try {
        const user = req.body;
        let userFind = await usersRepository.getUser(user.phone);
        if (userFind.length < 1 || user.password === userFind.password)
            return res.status(401).json({
                message: 'phone or password not correct'
            });
        bcrypt.compare(user.password, userFind[0].password, (err: any, result: any) => {
            if (err) {
                return res.status(401).json({
                    message: 'phone or password not correct'
                });
            }
            if (result) {
                req.session.user_id = user._id;

                // @ts-ignore
                var CSRFToken = uuid.v4();
                req.session.csrfToken = CSRFToken;

                // const token = jwt.sign({
                //         phone: userFind[0].phone,
                //         userId: userFind[0].id
                //     },
                //     process.env.JWT_KEY,
                //     {
                //         expiresIn: "1h"
                //     },
                // );
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: CSRFToken
                })
            }
            res.status(401).json({
                message: 'phone or password not correct'
            });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

router.post(`/`, async (req: any, res: any, next: any) => {
    try {
        const user = req.body;
        let userFind = await usersRepository.getUser(user.phone);
        // @ts-ignore
        if (!userFind.length >= 1) {
            const newUser = await usersRepository.addUser(user);
            console.log(newUser);
            res.send(newUser).status(201)
        } else {
            return res.status(409).json({message: "This Phone Already Used"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

export default router;