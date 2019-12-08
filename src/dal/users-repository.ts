const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
import User from '../dal/models/User';


export const usersRepository = {

    addUser(user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const newUser = new User({
                id: new mongoose.Types.ObjectId(),
                phone: user.phone,
                password: user.password
            });
            resolve
            (
                newUser.save()
                    .then((result: any) => {
                        return {id: result.id, phone: result.phone}
                    })
            )
        });
    },
    getUser(userPhone: string): Promise<any> {
        return User.find({phone: userPhone})
    },
    getUsers(): Promise<any> {
        return User.find()
    }
};