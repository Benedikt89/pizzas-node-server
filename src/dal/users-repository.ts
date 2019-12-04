import {IProductItem, IProductToCreate} from "../../../Core/products-types";

const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    phone: {type: String, required: true},
    password: {type: String, required: true},
    // size: {type: Number, required: true},
    // text_long: {type:String, required: true},
    // text_short: {type:String, required: true},
});
const User = mongoose.model('users', userSchema);

export const usersRepository = {

    addUser(user: any): Promise<any> {
        return new Promise ((resolve, reject) => {
            bcrypt.hash(user.password, 10, (err: any, hash: any) => {
                if (err) resolve({error: err});
                else {
                    const newUser = new User({
                        id: new mongoose.Types.ObjectId(),
                        phone: user.phone,
                        password: hash
                    });
                    resolve
                    (
                        newUser.save()
                        .then((result: any) => {
                            return {id: result.id, phone: result.phone}
                        })
                    )
                }
            });
        })
    },
    getUser(user: any):Promise<any> {
        return User.find({phone: user.phone})
    }
};