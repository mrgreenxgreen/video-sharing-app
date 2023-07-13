import express from "express"
import { signup } from "../controllers/AuthenticationController.js" 

const router = express.Router();

//CREATE A USER
router.post("/signup",signup)

//SIGN IN
router.post("/signin")

//GOOGLE AUTH
router.post("/google")

export default router;