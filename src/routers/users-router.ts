import {usersRepository} from "../dal/users-repository";

const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/login', async (req: any, res: any, next: any) => {
    try{
        const user = req.body;
        let userFind = await usersRepository.getUser(user);
        if (userFind.length < 1 || user.password === userFind.password)
            return res.status(401).json({
                message: 'phone or password not correct'
            });
        bcrypt.compare(user.password, userFind[0].password, (err:any, result:any)=>{
            if (err) {
                return res.status(401).json({
                    message: 'phone or password not correct'
                });
            }
            if (result) {
                return res.status(200).json({
                    message: 'Auth Successful'
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
        let userFind = await usersRepository.getUser(user);
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

router.get(`/:developerId/interviews`, async (ctx: any, next: any) => {
    // debugger;
    // const developers = await ordersRepository.getOrdersForAdmin(ctx.params.developerId);
    // ctx.body = developers;
});


export default router;