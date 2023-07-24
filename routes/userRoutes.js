const express = require('express');
const { loginController, 
    registerController, 
    authController,
    applyDoctorController,
    getAllNotifications,
 } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// Router object
const router = express.Router();

// routes start-------------------------

// LOGIN || POST
router.post('/login', loginController); // handling a POST request to the '/login' endpoint.

// REGISTER || POST
router.post('/register', registerController);

// AUTH || POST   
router.post('/getUserData', authMiddleware, authController);// authController will be the CB

// Apply Doctor || POST   
router.post('/apply-doctor', authMiddleware, applyDoctorController);// authController will be the CB

// Get Notification || GET   
router.post('/get-all-notifications', authMiddleware, getAllNotifications);// authController will be the CB


module.exports = router;