import mongoose, {Schema, Document, Model} from "mongoose";
import bcrypt from 'bcryptjs';
import {IUserType} from "../../../../Core/users-types";


export interface IMongoose_User extends IUserType, Document {
    phone: string,
    password: string,
    firstName?: string,
    lastName?: string,
    createdAt: Date,
}

const userSchema:Schema = new Schema({
    phone: {type: String, required: true, unique: true, mach: /[0-9]/},
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    createdAt: Date,
});

//adding methods to schema
userSchema.methods.fullName = function(): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

// hash user password before saving into database and add date
userSchema.pre('save', function(next){
    let now = new Date();

    // @ts-ignore
    if (!this.createdAt) {this.createdAt = now;}

    // @ts-ignore
    this.password =  bcrypt.hashSync(this.password, 10);
    next();
});

const User:Model<IMongoose_User> = mongoose.model('users', userSchema);

export default User