import mongoose  from "mongoose";

// MongoDb Connection
export const connectDB = (req,res)=>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("DataBase Connected");
    }).catch((error)=>{
        console.log(error);
    })
};