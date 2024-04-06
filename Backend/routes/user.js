const express = require('express')
const zod = require('zod')
const {User} = require('../db')
const {authMiddleware} = require('../middleware')
const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');

const router = express.Router();

const UserSchema = zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string().min(6)
})

router.post('./signup',async (req,res)=>{
    const isUserValidated = UserSchema.safeParse(req.body);
    if (!isUserValidated) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const isUserAlreadyPresent = await User.findOne({
        username:req.body.username
    })
    if (isUserAlreadyPresent) {
        return res.status(411).json({
            message: "Email Already Present"
        })
    }

    const newUser = new User({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
    });
    const salt = 'Creating Hashed Password'
    const hashedPassword = await newUser.createHash(req.body.password,salt);
    newUser.password_hash = hashedPassword;
    await newUser.save();

    const userId = newUser._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET)

    return res.status(200).json({
        message:"User Created Successfully",
        token:token
    })
})
module.exports = router;


