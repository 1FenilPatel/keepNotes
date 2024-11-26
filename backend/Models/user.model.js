import mongoose, { model } from "mongoose";

const userSchema = mongoose.Schema({
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
});

export const User = mongoose.model("User",userSchema);

