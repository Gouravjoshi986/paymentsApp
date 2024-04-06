const express = require('express');
const { authMiddleware } = require('../middleware')
const { Account } = require('../db');
const mongoose = require('mongoose')

const router = express.Router();

router.get('/balance',authMiddleware,async (req,res)=>{
    try {
        const account = await Account.findOne({userId:req.userId})
        if(!account){
            return res.status(404).json({
                message:"NO account found for the requested user Id"
            });
        }
        res.json({balance:account.balance});
    } catch (err) {
        res.status(500).json({message:"Internal Server Error"})
    }
})

router.post('/transfer',authMiddleware,async (req,res)=>{
    try {
        const mongooseSession = mongoose.startSession();
        mongooseSession.startTransaction();
        const {amount,to} = req.body;

        const account = await Account.findOne({userId:req.userID}).session(mongooseSession);
        if(!account){
            await mongooseSession.abortTransaction();
            return res.status(404).json({
                message: "No User/Account Found"
            });
        }
        if(account.balance<amount){
            await mongooseSession.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Funds"
            })
        }

        const toAccount = Account.findOne({userId:to}).session(mongooseSession);
        if (!toAccount) {
            await mongooseSession.abortTransaction();
            return res.status(400).json({
                message: "Cannot find the user you are trying to send to"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(mongooseSession);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(mongooseSession);

        await mongooseSession.commitTransaction();
        res.json({
            message: "Transfer successful"
        });

    } catch (err) {
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
});

module.exports = router