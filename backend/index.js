import express from "express";
const app  = express();
import { connectDB } from "./utils/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/userRoute.js";
import noteRoute from "./Routes/noteRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const _dirname = path.resolve();

// Cors SetUp
const corsOption = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption));


// Routes..
app.use("/api/v1/user",userRoute);
app.use("/api/v1/note",noteRoute);

app.use(express.static(path.join(_dirname , "frontend/dist")));
app.get("*",(_,res)=>{
    res.sendFile(path.join(_dirname , "frontend" , "dist" , "index.html"))
})


// Server Listen
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})