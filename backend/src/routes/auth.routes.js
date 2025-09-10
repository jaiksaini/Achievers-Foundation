import express from "express";
const router = express.Router();
import { SignUp, LogIn , verifyEmail, getNewAccessToken, userProfile, Logout} from "../controllers/auth.controller.js";
import passport from "passport";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";





// Public Routes..

router.post("/signup", SignUp);
router.post("/login", LogIn);
router.post("/verify-email" , verifyEmail)
router.post("/get-new-access-token" , getNewAccessToken)

// Protected Routes..


router.get("/user-profile" ,accessTokenAutoRefresh, passport.authenticate("jwt", { session: false }),  userProfile)
router.post("/logout" ,accessTokenAutoRefresh, passport.authenticate("jwt", { session: false }), Logout)

export default router;