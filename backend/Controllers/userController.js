import jwt from "jsonwebtoken";
import {User}  from "../Models/user.model.js";
import bcrypt from "bcrypt";

// Register 
export const  Register = async(req,res)=>{
    try {
        const {fullname , email ,password} = req.body;

        if(!fullname || !email || !password){
            return res.status(401).json({
                message:"All fields are required",
                success:true
            })
        };

        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"user Already exist",
                success:false
            })
        };
        const hasedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            fullname,
            email,
            password:hasedPassword
        })

        await newUser.save();

        return res.status(200).json({
            message:"User Created Successfully",
            success:true,
            newUser
        });
    } catch (error) {
        console.log(error);
    }
};

// Login
export const Login = async(req,res)=>{
    try {
        const {email,password,fullname} = req.body;

        if(!email || !password){
            return res.status(200).json({
                message:"All fields are required.",
                success:false
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Email or password inccorect.",
                success:false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                message:"Incorrect email and password",
                success:false
            })
        };

        const tokenData = {
            userId:user._id
        };

        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:"strict"}).json({
            user,
            token,
            message:"User Login Successfull",
            success:true
        });        
    } catch (error) {
        console.log(error);
    }
};

// Logout
export const Logout = async(req,res)=>{
    try {
        return res.cookie("token","").json({
            message:"Logout Successfull",
            success:true
        });
    } catch (error) {
        console.log(error);
    }
};

// GetUser
export const getUser = async(req,res)=>{
    try {
        const userId = req.user;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findOne({_id:userId}).select("-password");

        if(!user){
            return res.status(401).json({
                message: "User not found"
            });
        }
        return res.json({
            user,
            success:true,
            message:"User retrieved successfully"
        });
    } catch (error) {
        console.log(error);
    }
};