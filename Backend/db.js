const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
mongoose.connect("mongodb+srv://admin:Qwertyuiop12345@cluster0.e8xjrrs.mongodb.net/paymentsApp");

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

const User = mongoose.model('User',userSchema);

module.exports = {
    User
}