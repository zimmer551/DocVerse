const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },
    lastName: {
        type: String,
        required: [true, 'last name is required']
    },
    phone: {
        type: String,
        required: [true, 'phone number is required']
    },
    emailid: {
        type: String,
        required: [true, 'email id is required']
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    specialization: {
        type: String,
        required: [true, 'specialization is required']
    },
    experience: {
        type: String,
        required: [true, 'experience is required']
    },
    feePerConsultation: {
        type: Number,
        required: [true, 'fees is required']
    },
    timings: {
        type: Object,
        required: [true, 'work timing is required']
    },
    applicationStatus: {
        type: Object,
        default: "pending",
    }
}, {timestamps: true});

const doctorModel = mongoose.model('doctors', doctorSchema);
module.exports = doctorModel;