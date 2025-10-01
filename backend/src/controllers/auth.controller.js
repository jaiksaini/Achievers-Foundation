import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import generateTokens from "../utils/generateTokens.js";
import setTokenCookies from "../utils/setTokenCookies.js";
import sendEmailVerificationEmail from "../utils/sendEmailVerificationEmail.js";
import transporter from "../config/emailConfig.js";

// -----------------------------------------------------
// User Signup
// -----------------------------------------------------
export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        status: "failed",
        message: "User already exists with this email.",
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Signup successful",
      user: { id: newUser.id, email: newUser.email, is_auth: true },
    });

    await sendEmailVerificationEmail(req, newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to signup user",
    });
  }
};

// -----------------------------------------------------
// Verify Email
// -----------------------------------------------------
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "failed", message: "Email doesn't exist" });
    }

    if (existingUser.is_verified) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email already verified" });
    }

    const emailVerification = await prisma.emailVerification.findFirst({
      where: { userId: existingUser.id, otp },
    });

    if (!emailVerification) {
      await sendEmailVerificationEmail(req, existingUser);
      return res.status(400).json({
        status: "failed",
        message: "Invalid OTP, new OTP sent to your email",
      });
    }

    const expirationTime = new Date(
      emailVerification.createdAt.getTime() + 10 * 60 * 1000
    );
    if (new Date() > expirationTime) {
      await sendEmailVerificationEmail(req, existingUser);
      return res.status(400).json({
        status: "failed",
        message: "OTP expired, new OTP sent to your email",
      });
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { is_verified: true },
    });

    await prisma.emailVerification.deleteMany({
      where: { userId: existingUser.id },
    });

    return res
      .status(200)
      .json({ status: "success", message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Unable to verify email, please try again later",
    });
  }
};

// -----------------------------------------------------
// User Login
// -----------------------------------------------------
export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Email and Password are required",
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid email or password" });
    }

    if (!user.is_verified) {
      return res.status(401).json({
        status: "failed",
        message: "Please verify your email to login",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
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
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profilePic: user.profilePic,
      },
      status: "success",
      message: "Logged in successfully",
      is_auth: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to login (server error)",
    });
  }
};

// -----------------------------------------------------
// Get User Profile
// -----------------------------------------------------
export const userProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profilePic: true,
        is_verified: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------------------------------
// Logout
// -----------------------------------------------------
export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const userRefreshToken = await prisma.userRefreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (userRefreshToken) {
      await prisma.userRefreshToken.update({
        where: { token: refreshToken },
        data: { blacklisted: true },
      });
    }

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

// -----------------------------------------------------
// Upload Profile Picture
// -----------------------------------------------------
export const uploadProfile = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.profilePic) {
      const oldPath = path.join(process.cwd(), user.profilePic);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePic: `uploads/profile_pics/${req.file.filename}` },
    });

    res.json({ message: "Profile picture updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------------------------------
// Change Password (after login)
// -----------------------------------------------------
export const changeUserPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "New Password and Confirm New Password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Passwords don't match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: newHashPassword },
    });

    res
      .status(200)
      .json({ status: "success", message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to change password, please try again later",
    });
  }
};

// -----------------------------------------------------
// Forgot Password (send reset email)
// -----------------------------------------------------
export const sendUserPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email is required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "Email doesn't exist" });
    }

    const secret = user.id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
    const token = jwt.sign({ userID: user.id }, secret, { expiresIn: "15m" });

    const resetLink = `http://localhost:5173/new-password/${user.id}/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password Reset Link",
      html: `<p>Hello ${user.name},</p><p>Please <a href="${resetLink}">click here</a> to reset your password.</p>`,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset email sent. Please check your email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to send password reset email. Please try again later.",
    });
  }
};

// -----------------------------------------------------
// Reset Password
// -----------------------------------------------------
export const userPasswordReset = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { id, token } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    const new_secret = user.id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
    jwt.verify(token, new_secret);

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Passwords don't match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: newHashPassword },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password Reset Successful",
      html: `<p>Hello ${user.name},</p><p>Your password has been reset successfully.</p>`,
    });

    res
      .status(200)
      .json({ status: "success", message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        status: "failed",
        message: "Token expired. Please request a new reset link.",
      });
    }
    res.status(500).json({
      status: "failed",
      message: "Unable to reset password. Please try again later.",
    });
  }
};

// -----------------------------------------------------
// Contact Admin
// -----------------------------------------------------
export const ContactAdmin = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email is required" });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: "Contact Us - New Message",
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({
      status: "success",
      message: "Your message has been sent successfully",
    });
  } catch (error) {
    console.error("ContactAdmin Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
