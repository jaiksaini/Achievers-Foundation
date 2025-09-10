import mongoose, { Schema } from "mongoose";

const emailVerificationSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref : 'User', required : true},
    otp : {type: String , required : true},
    createdAt : ({type : Date ,default : Date.now, expires: "10m" })
});

const EmailVerificationModel = mongoose.model("EmailVerification", emailVerificationSchema);

export default EmailVerificationModel;