const mongoose = require("mongoose");
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL_DEV,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongodb connected");
    } catch(err){
        console.error("MongoDB Connection Failed", err.message);
        process.exit(1);
    }
};
module.exports=connectDB;