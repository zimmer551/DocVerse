const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Check for a existing user by matching emailid in db.
 * Encrypt entered pwd with pwd saved in db.
 * Generate JWT if valid creds, for more security
 * @param {*} req 
 * @param {*} res 
 */
const loginController = async(req, res) => {
    try {
        const user = await userModel.findOne({
            username: req?.body?.username,
        })
        if (!user) return res.status(200).send({
            success: false,
            message: `User not found`,
        })

        const isPwdMatch = await bcrypt.compare(req?.body.password, user.password);

        if (!isPwdMatch) return res.status(200).send({
            success: false,
            message: `Invalid Email or Password`,
        })

        // generate jwt sign based on usique _id, secret key, expiration time, use have to relogin after this time
        // use this id key in auth middleware
        const token = jwt.sign({
            id: user._id,
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });

        res.status(200).send({
            success: true,
            message: `Login Success`,
            token,
        });


    } catch (err) {
        console.log(err);
        req.status(500).send({
            success: false,
            message: `Login controller error : ${err}`,
        })
    }
}

/**
 * CB receives req from user and can send res to user
 * Before registering, Check if user's email is existing (existing user)
 * using await since it send an async request
 * @param {*} req  
 * @param {*} res 
 */
const registerController = async(req, res) => {
    try{
        const existingUser = await userModel.findOne({
            emailid: req.body.emailid,
        });
        if (existingUser) return res.status(200).send({
            message: "User already exist",
            success: false,
        })
        const { password } = req.body;
        const salt = await bcrypt.genSalt(); // hash the pwd for 10 times(default).
        const hashedPwd = await bcrypt.hash(password, salt);
        req.body.password = hashedPwd;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({
            message: "Registration successfully",
            success: true,
        })

    } catch(err) {
        console.log(err);
        res.status(500).send({
            success:false,
            message: `Register controller error : ${err.message}`
        })
    }
}

const authController = async(req, res) => {
    try {
        const user = await userModel.findOne({
            _id: req.body.userId,
        })
        
        if (!user) return res.status(200).send({
            success: false,
            message: `User not found`
        })

        res.status(200).send({
            success: true,
            data: {
                name: user.username,
                emailid: user.emailid,
            }
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: `Auth error ${err}`
        })
    }
}

module.exports = {loginController, registerController, authController};