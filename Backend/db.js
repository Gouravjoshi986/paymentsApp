const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
require('dotenv').config();
mongoose.connect(`${process.env.MONGODB_URI}`);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password_hash: {
        type: String,
        required: true,
    },
});

userSchema.methods.createHash = async function(textPassword){
    const saltRounds = 10;
    const salt = bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(textPassword,salt);
}

userSchema.methods.validatePassword = async function(textPassword){
    return await bcrypt.compare(textPassword,this.password_hash);
}
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User',userSchema);

module.exports = {
    User,
    Account
}