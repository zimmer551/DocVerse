// Designing user schema

const mongoose = require('mongoose');
 /**
     * encryp the pwd while saving to db
     * decrypt during login
     * generate new token to secure app
     */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'] 
    },
    emailid: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    remember: {
        type: Boolean,
        required: [false, 'remember is not required']
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    notification: {
        type: Array,
        default: [],
    },
    seenNotification: {
        type: Array,
        default: [],
    }

})

const userModel = mongoose.model('users', userSchema); // collection name, schema name    
module.exports = userModel;