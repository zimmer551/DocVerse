const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require("../models/doctorModel");

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

        // generate jwt sign based on unique _id, secret key, expiration time, use have to relogin after this time
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
        const existingUserEmail = await userModel.findOne({
            emailid: req.body.emailid,
        });

        const existingUserName = await userModel.findOne({
            username: req.body.username,
        });

        const existingUser = (existingUserEmail && existingUserName);

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
                name: user.username || user.firstName + " " + user.lastName,
                emailid: user.emailid,
                isDoctor: user.isDoctor,
                isAdmin: user.isAdmin,
                notification: user.notification,
                seenNotification: user.seenNotification,
                phone: user.phone,
            }
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: `Auth error ${err}`
        })
    }
}


/**
 * Apply Doctor Controller
 * @param {*} req 
 * @param {*} res 
 * Save the form data in doctor model
 * Notify admin about the request along with data and on click route
 * Scenario of multiple admin should created
 */
const applyDoctorController = async(req, res) => {
    try {
        const newDoctor = await doctorModel({...req.body, appicationStatus: "pending"});
        await newDoctor.save();
        const admin = await userModel.findOne({isAdmin: true});
        admin.notification.push({
            type: "apply-doctor-request",
            message: `${newDoctor.username} - applied for a doctor account.`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.username,
                onClickPath: "admin/doctors"
            }
        })
        await userModel.findByIdAndUpdate(admin._id, {notification: admin.notification});
        res.status(201).send({
            success: true,
            message: "Doctor account applied successfully !"
        })
    } catch (err) {
        console.error("apply doctor", {err});
        res.status(500).send({
            success: false,
            err,
            message: "Error while applying as doctor",
        })
    }
}

const getAllNotifications = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId});
        const {notification} = user;
        user.seenNotification = user.seenNotification.concat(notification);
        user.notification = [];
        const updatedUser = await user.save();
        delete updatedUser.password;
        res.status(200).send({
            success: true,
            message: "All notifications marked as read",
            data: updatedUser,
        })
    } catch (error) {
        console.log("Notif. ctrl error ",{error});
        res.status(500).send({
            success: false,
            message: `Failed to fetch notification`,
            error,
        })
    }
}

const deleteAllNotifications = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId});
        user.seenNotification = [];
        const updatedUser = await user.save();
        delete updatedUser.password;
        res.status(200).send({
            success: true,
            message: "All notifications marked as read",
            data: updatedUser,
        })
    } catch (error) {
        console.log("Notif. ctrl error ",{error});
        res.status(500).send({
            success: false,
            message: `Failed to fetch notification`,
            error,
        })
    }
}

const bookDoctorController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({_id: req.body.doctorId});
        doctor.notification.push({
            type: "doctor-booking-request",
            message: `${req.body.username} - applied for a booking.`,
            data: {
                userId: doctor.userId,
                patientName: req.body.username,
                onClickPath: "/"
            }
        });
        doctor.bookings.push({
            userId: doctor.userId,
            patientName: req.body.username,
            onClickPath: "/"
        });
        
        console.log({doctor})
        const updateddoc = await doctor.save()
        res.status(200).send({
            message: "Booking notified to doctor !",
            success: true,
            data: updateddoc,
        })  

    } catch (error) {
        res.status(500).send({
            success: false,
            message: `Failed to Book doctor`,
            error,
        })
    }
}

module.exports = {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotifications,
    deleteAllNotifications,
    bookDoctorController,
};