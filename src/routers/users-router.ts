import {usersRepository} from "../dal/users-repository";

import express, {NextFunction, Request, Response} from "express";
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface I_LoginResponce {
    id: string,
    phone: string
}

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        let userFind = await usersRepository.getUser(user.phone);
        if (userFind.length < 1)
            return res.status(401).json({
                message: 'phone or password not correct'
            });
        const compared = await bcrypt.compare(user.password, userFind[0].password);
        if (!compared) {
            return res.status(401).json({
                message: 'phone or password not correct'
            });
        }
        if (compared) {
            // @ts-ignore
            req.session.user_id = userFind[0].id;

            const token = jwt.sign({
                    phone: userFind[0].phone,
                    userId: userFind[0].id
                },
                // @ts-ignore
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                },
            );
            res.cookie("x-access-token" , token, {maxAge: 9999999, sameSite: 'None'});
            return res.status(200).json({
                message: 'Auth Successful',
                userInfo: {
                    userName: userFind[0].phone,
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

router.delete('/logout', (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("x-access-token");
    res.clearCookie("_csrf");
    res.clearCookie("BENS_TOKEN");
    res.send("success");
});

router.post(`/`, async (req: Request, res: Response, next: NextFunction) => {
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