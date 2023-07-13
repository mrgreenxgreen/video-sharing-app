import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/UsersRoute.js"
import videoRoutes from "./routes/VideosRoute.js"
import commentRoutes from "./routes/CommentsRoute.js"
import authenticationRoute from "./routes/AuthenticationRoute.js"

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
app.use(express.json());
app.use("/api/auth",authenticationRoute)
app.use("/api/users", userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments", commentRoutes);
app.get("/",(req, res)=>{
res.status(200).json()
})

app.listen(process.env.PORT_NO, ()=>{
    connect();
    console.log(`listening to`+process.env.PORT_NO);
})