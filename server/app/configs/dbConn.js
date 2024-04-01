const mongoose  = require('mongoose');

// Connect to the local MongoDB database
const connectDB= async()=>{

    try{
        await mongoose.connect(process.env.MONGO_URL);
    }
    catch(err){
        console.error(err);
    }

};

module.exports = connectDB;