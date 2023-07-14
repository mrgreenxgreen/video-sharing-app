import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/UsersRoute.js"
import videoRoutes from "./routes/VideosRoute.js"
import commentRoutes from "./routes/CommentsRoute.js"
import authenticationRoute from "./routes/AuthenticationRoute.js"
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()

const connect = ()=>{
    try{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to DB")
    })}
    catch{err=>{throw err}}
}
//middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth",authenticationRoute)
app.use("/api/users", userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments", commentRoutes);
app.get("/",(req, res)=>{
res.status(200).json()
})

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

app.listen(process.env.PORT_NO, ()=>{
    connect();
    console.log(`listening to`+process.env.PORT_NO);
})