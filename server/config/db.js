const mongoose = require('mongoose');
const colors = require('colors');
 
const connectDb = async() => {
try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo DB connected ${mongoose.connection.host}`.bgGreen.white)
} catch(error) {
    console.log(`MongoDB server issue >> ${error}`.bgRed.white);
}
}

module.exports = connectDb;