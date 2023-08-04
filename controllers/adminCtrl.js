// const doctorModel = require()

const doctorModel = require("../models/doctorModel")
const userModel = require("../models/userModel")

const getList = async (req, res) => {
   try {
        let response = [];
        if (req.body.listType == "doctor") {
            const doctors = await doctorModel.find({});
            response = doctors;
        } else {
            const users = await userModel.find({});
            response = users;
        }
        res.status(200).send({
            success: true,
            message: "List fetched successfully !",
            data: response,
        })
   } catch (error) {
        res.status(500).send({
            message: "Failed while fetching list !",
            error,
        })
   }

}

const changeAccountStatus = async (req, res) => {
    try {
        const {doctorId, applicationStatus} = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {applicationStatus});
        const user = await userModel.findOne({_id: doctor.userId});
        user.notification.push({
            type: "doctor-acc-req-update",
            message: `Doctor account request of ${doctor.username} is ${applicationStatus}`,
            onClickPath: "/notification",
        });
        user.isDoctor = applicationStatus === "approved" ? true : false;
        await user.save();

        res.status(200).send({
            success: true,
            message: "Account status updated",
            data: doctor
        })
    } catch (error) {
        res.status(500).send({
            message: "Failed while change account status !",
            error,
        })
    }
}

module.exports = {
    getList,
    changeAccountStatus,
}