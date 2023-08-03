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

module.exports = {
    getList,
}