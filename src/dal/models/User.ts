const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: {type: String, required: true, unique: true, mach: /[0-9]/},
    password: {type: String, required: true},
});

// hash user password before saving into database
userSchema.pre('save', function(next:any){
    // @ts-ignore
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema);

export default User