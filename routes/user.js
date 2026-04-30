const { Router } = require('express');
const userRouter = Router();
const { userModel, learningPathModel } = require("../db");
const {z} = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const  JWT_SECRET = process.env.JWT_SECRET;

userRouter.post("/signup", async (req, res) =>{
    const emailSchema = z.string().email().min(12);
    const passwordSchema = z.string().min(7).max(50)
                           .refine((password)=> /[A-Z]/.test(password),{
                            message: "atlest one upercase required"
                           })
                           .refine((password)=>/[a-z]/.test(password), {
                            message: "atlest one lowercase required"
                           })
                           .refine((password)=>/[0-9]/.test(password), {
                            message: "atlest one digit required"
                           })
                           .refine((password)=>/[@#!$%^&*]/.test(password), {
                            message: "atlest one symbol required"
                           });
    const usernameSchema = z.string().min(3).max(20);
    try{
        const { userName, email, password } = req.body;
        const safeParseEmail = emailSchema.safeParse(email);
        const safeParsePassword = passwordSchema.safeParse(password);
        const safeParseUserName = usernameSchema.safeParse(userName);
        if(safeParseEmail && safeParsePassword && safeParseUserName){
            const hashedPassword = await bcrypt.hash(password, 5);
            const userId = await userModel.create({
                userName: userName,
                email: email,
                password: hashedPassword
            });
            if(userId){
                return res.json({
                    success: true,
                    msg: "You have successfully signed Up",
                    userId: userId._id
                })
            }
            else{
                return res.status(403).json({
                    msg: "Please Check Your Credentials"
                })
            }
        }
    }
    catch(err){
        return res.status(403).json({
            msg: "Check Your credentials",
            error: err.message
        })
    }
})

userRouter.post("/signin", async (req, res) =>{
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({
            email: email
        });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(user && passwordMatch){
            const token = jwt.sign({userId: user._id}, JWT_SECRET, { expiresIn: '1h' });
            return res.json({
                token: token,
                msg: "You have successfully signed In",
                success: true
            })
        }
        else{
            return res.json({
                msg: "Invalid Credentials"
            })
        }
    }
    catch(err){
        return res.status(403).json({
            msg: "Unauthorized",
            error: err.message
        })
    }
})

userRouter.post("/path", async (req, res)=>{
    try {
        const { path, level, userId } = req.body;
        const userExists = await userModel.findById(userId);
        if (!userExists) {
            return res.status(400).json({ msg: "Invalid User ID" });
        }

        const userpath = await learningPathModel.create({
            userId: userId,
            path: path,
            level: level,
            success: true
        });

        return res.json({
            pathId: userpath._id,
            msg: "Learning Path added Successfully"
        });
    } catch (err) {
        console.error('Error creating Learning Path:', err);
        return res.status(500).json({
            msg: "Internal Server Error",
            error: err.message
        });
    }
});
module.exports = {
    userRouter: userRouter
}