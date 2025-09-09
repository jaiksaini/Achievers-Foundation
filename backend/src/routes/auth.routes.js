import express from "express";
const router = express.Router();
import { SignUp, LogIn } from "../controllers/auth.controller.js";





// Public Routes..

router.post("/signup", SignUp);
router.post("/login", LogIn);
// router.post("/verify-email" , Verifyemail)



export default router;