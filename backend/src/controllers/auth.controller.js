import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateCookie.js";

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
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ status: "Failed", message: "Failed to signup a User..." });
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

    // Comparing passwords..
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "Failed",
        message: " Invalid Mail or password",
      });
    }

    generateToken(user._id, res);

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
      .json({ status: "Failed ", message: " Failed to Login..." });
  }
};
