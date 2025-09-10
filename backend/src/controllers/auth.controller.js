import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateTokens from "../utils/generateTokens.js";
import setTokenCookies from "../utils/setTokenCookies.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import UserRefreshTokenModel from "../models/UserRefreshToken.js";
import sendEmailVerificationEmail from "../utils/sendEmailVerificationEmail.js";
import EmailVerificationModel from "../models/emailVerification.js";

// User Signup

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are Required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(420).json({
        status: "failed",
        message: "User Already exists with this Email.",
      });
    }

    // Hashing a User Password..
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    // Send Email Verifaction Mail with OTP..
    res.status(201).json({
      status: "success",
      message: " SignUp Successful",
      user: { id: newuser._id, email: newuser.email },
    });

    // Sending OTP via Mail
    sendEmailVerificationEmail(req, newuser);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ status: "Failed", message: "Failed to signup a User..." });
  }
};

// Verify
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ status: "Falied", message: "All feilds are required" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ status: "Falied", message: "Email Doesn't Exist" });
    }

    if (existingUser.is_verified) {
      return res
        .status(400)
        .json({ status: "Falied", message: "Email Already Verified" });
    }

    const emailVerification = await EmailVerificationModel.findOne({
      userId: existingUser._id,
      otp,
    });

    if (!emailVerification) {
      if (!existingUser.is_verified) {
        await sendEmailVerificationEmail(req, existingUser);
        return res.status(400).json({
          status: "Falied",
          message: "Invalid OTP , new OTP sent to your Mail",
        });
      }
      return res
        .status(400)
        .json({ status: "Falied", message: "Invalid OTP " });
    }

    const currentTime = new Date();

    const expirationTime = new Date(
      emailVerification.createdAt.getTime() + 10 * 60 * 1000
    );
    if (currentTime > expirationTime) {
      // OTP expired, send new OTP
      await sendEmailVerificationEmail(req, existingUser);
      return res.status(400).json({
        status: "failed",
        message: "OTP expired, new OTP sent to your email",
      });
    }

    // OTP is valid and not expired, mark email as verified
    existingUser.is_verified = true;
    await existingUser.save();

    // Delete email verification document after verification
    await EmailVerificationModel.deleteMany({ userId: existingUser._id });
    return res
      .status(200)
      .json({ status: "success", message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Falied",
      message: "Unable to verify Email , Please Try Again Later",
    });
  }
};

// User Login

export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).json({
        status: " Failed ",
        message: "Email and Password are Required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Invalid Mail or Password" });
    }

    // Check if User's account is verified..
    if (!user.is_verified) {
      return res.status(401).json({
        status: "Failed",
        message: "Please verify your email to login",
      });
    }

    // Comparing passwords..
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "Failed",
        message: " Invalid Mail or password",
      });
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateTokens(user);

    setTokenCookies(
      res,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp
    );

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      status: "Success",
      message: "Logged in SuccessFully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({
        status: "Failed ",
        message: " Failed to Login... (Catch Block)",
      });
  }
};

// Get New Access Token
export const getNewAccessToken = async (req, res) => {
  try {
    // Get new access token using Refresh Token
    const {
      newAccessToken,
      newRefreshToken,
      newAccessTokenExp,
      newRefreshTokenExp,
    } = await refreshAccessToken(req, res);

    // Set New Tokens to Cookie
    setTokenCookies(
      res,
      newAccessToken,
      newRefreshToken,
      newAccessTokenExp,
      newRefreshTokenExp
    );

    res.status(200).send({
      status: "success",
      message: "New tokens generated",
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      access_token_exp: newAccessTokenExp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to generate new token, please try again later",
    });
  }
};

// Get User Profile
export const userProfile = async (req, res) => {
  const user = req.user;
  res.send({user: req.user})
  
}

// Logout..
export const Logout = async (req, res) => {
  try {

    const userRefreshToken = await UserRefreshTokenModel.findOne({ token: refreshToken });

    if (userRefreshToken) {
      // Blacklist the refresh token
      userRefreshToken.blacklisted = true;
      await userRefreshToken.save();
    } else {
      console.log('Refresh token not found in database for blacklisting.');
    }

    // Clear access token and refresh token cookies
    res.clearCookie("accessToken"); 
    res.clearCookie("refreshToken"); 
    res.clearCookie("is_auth"); 
    res.status(200).json({ status: "success", message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to logout, please try again later",
    });
  }
};
