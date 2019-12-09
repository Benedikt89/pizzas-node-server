import mongoose, {DocumentQuery} from "mongoose";
import User, {IMongoose_User} from '../dal/models/User';
import {IUserType} from "../../../Core/users-types";
import {I_LoginResponce} from "../routers/users-router";


export const usersRepository = {

    addUser(user: IUserType): Promise<I_LoginResponce | never> {
            const newUser = new User({
                id: new mongoose.Types.ObjectId(),
                phone: user.phone,
                password: user.password
            });
            return newUser.save().then( doc => {
                return {
                    id: doc.id, phone: doc.phone
                }
            })
    },

    getUser(userPhone: string): DocumentQuery<IMongoose_User[], IMongoose_User> & {} {
        return User.find({phone: userPhone});
    },

    getUsers(): DocumentQuery<IMongoose_User[], IMongoose_User> & {} {
        return User.find()
    }
};