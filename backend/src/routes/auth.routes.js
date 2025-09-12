import express from "express";
const router = express.Router();
import { SignUp, LogIn , verifyEmail, getNewAccessToken, userProfile, Logout, updateProfile, changeUserPassword, sendUserPasswordResetEmail, userPasswordReset, UpdateUserRole} from "../controllers/auth.controller.js";
import passport from "passport";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";




// -----------------------------------------------------
// Public Routes..
// -----------------------------------------------------

router.post("/signup", SignUp);
router.post("/login", LogIn);
router.post("/verify-email" , verifyEmail)
router.post("/get-new-access-token" , getNewAccessToken)
router.post("/reset-password-link" ,sendUserPasswordResetEmail)
router.post("/reset-password/:id/:token" ,userPasswordReset)



// -----------------------------------------------------
// Protected Routes..
// -----------------------------------------------------

router.get("/user-profile" ,accessTokenAutoRefresh, passport.authenticate("jwt", { session: false }),  userProfile)
router.post("/logout" ,accessTokenAutoRefresh, passport.authenticate("jwt", { session: false }), Logout)
router.post("/update-profile-pic" ,accessTokenAutoRefresh, passport.authenticate("jwt", { session: false }), updateProfile)
router.post("/change-password" ,accessTokenAutoRefresh, passport.authenticate("jwt", { session: false }),changeUserPassword )
router.post("/update-role" ,accessTokenAutoRefresh, passport.authenticate("jwt", { session: false }),UpdateUserRole )


export default router;