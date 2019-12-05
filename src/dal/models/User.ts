const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: {type: String, required: true, unique: true, mach: /[0-9]/},
    password: {type: String, required: true},
    // size: {type: Number, required: true},
    // text_long: {type:String, required: true},
    // text_short: {type:String, required: true},
});
// hash user password before saving into database
userSchema.pre('save', function(next:any){
    // @ts-ignore
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
export const User = mongoose.model('users', userSchema);