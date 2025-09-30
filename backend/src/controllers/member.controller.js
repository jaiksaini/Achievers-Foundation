// import Member from "../models/memberModel.js";
// import bcrypt from "bcrypt";
// import hbs from "hbs";
// import path from "path";
// import fs from "fs";
// import transporter from "../config/emailConfig.js";
// import generateTokensMember from "../utils/generateTokens-member.js";
// import setTokensCookies from "../utils/setTokenCookies.js";
// import MemberRefreshTokenModel from "../models/MemberRefreshToken.js";

// // function to generate random password
// const generatePassword = (length = 8) => {
//   const chars =
//     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
//   let pass = "";
//   for (let i = 0; i < length; i++) {
//     pass += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return pass;
// };

// // --------------------------
// // Apply for Membership (Public)
// // --------------------------
// export const applyForMembership = async (req, res) => {
//   try {
//     const { name, email, phone, address } = req.body;

//     if (!name || !email) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Name and Email are required",
//       });
//     }

//     // Check if already exists
//     const existingMember = await Member.findOne({ email });
//     if (existingMember) {
//       return res.status(409).json({
//         status: "failed",
//         message: "Member with this email already applied",
//       });
//     }

//     const newMember = await new Member({
//       name,
//       email,
//       phone,
//       address,
//     }).save();

//     res.status(201).json({
//       status: "success",
//       message: "Membership application submitted",
//       member: newMember,
//     });
//   } catch (error) {
//     console.error("Error in applyForMembership:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to apply for membership",
//     });
//   }
// };

// // --------------------------
// // Approve Member (Admin Only)
// // --------------------------
// export const approveMember = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const member = await Member.findById(id);

//     if (!member) {
//       return res.status(404).json({
//         status: "failed",
//         message: "Member not found",
//       });
//     }

//     // generate & hash password
//     const plainPassword = generatePassword();
//     member.password = await bcrypt.hash(plainPassword, 10);
//     member.status = "approved";
//     member.joinedAt = Date.now();
//     await member.save();

//     // Load Handlebars template
//     const templatePath = path.join(
//       process.cwd(),
//       "src",
//       "templates",
//       "approvalTemplate.hbs"
//     );
//     const templateSource = fs.readFileSync(templatePath, "utf8");

//     // Compile with hbs
//     const template = hbs.compile(templateSource);

//     // Render final HTML with data
//     const html = template({
//       name: member.name,
//       email: member.email,
//       password: plainPassword,
//     });

//     // Send email
//     await transporter.sendMail({
//       from: `"NGO Team" <${process.env.Email_USER}>`,
//       to: member.email,
//       subject: "Your Membership Approved 🎉",
//       html,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Member approved and email sent successfully",
//       member,
//     });
//   } catch (error) {
//     console.error("Error in approveMember:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to approve member",
//     });
//   }
// };

// // --------------------------
// // Reject Member (Admin Only)
// // --------------------------
// export const rejectMember = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const member = await Member.findById(id);

//     if (!member) {
//       return res.status(404).json({
//         status: "failed",
//         message: "Member not found",
//       });
//     }

//     // Load rejection template
//     const templatePath = path.join(
//       process.cwd(),
//       "src",
//       "templates",
//       "rejectionTemplate.hbs"
//     );
//     const templateSource = fs.readFileSync(templatePath, "utf8");

//     // Compile template
//     const template = hbs.compile(templateSource);
//     const html = template({ name: member.name });

//     // Send rejection email
//     await transporter.sendMail({
//       from: `"NGO Team" <${process.env.Email_USER}>`,
//       to: member.email,
//       subject: "Membership Application Rejected",
//       html,
//     });

//     // Delete member from database
//     await Member.findByIdAndDelete(id);

//     res.status(200).json({
//       status: "success",
//       message: "Member rejected, email sent, and data deleted",
//     });
//   } catch (error) {
//     console.error("Error in rejectMember:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to reject member",
//     });
//   }
// };

// // --------------------------
// // Get All Members (Admin)
// // --------------------------
// export const getAllMembers = async (req, res) => {
//   try {
//     const members = await Member.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       status: "success",
//       count: members.length,
//       members,
//     });
//   } catch (error) {
//     console.error("Error in getAllMembers:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to fetch members",
//     });
//   }
// };

// // --------------------------
// // Get Approved Members (Public)
// // --------------------------
// export const getApprovedMembers = async (req, res) => {
//   try {
//     const members = await Member.find({ status: "approved" }).sort({
//       joinedAt: -1,
//     });

//     res.status(200).json({
//       status: "success",
//       count: members.length,
//       members,
//     });
//   } catch (error) {
//     console.error("Error in getApprovedMembers:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to fetch approved members",
//     });
//   }
// };

// // --------------------------
// // Get Pending Requests (Admin)
// // --------------------------
// export const getPendingMembers = async (req, res) => {
//   try {
//     const members = await Member.find({ status: "pending" }).sort({
//       createdAt: -1,
//     });

//     res.status(200).json({
//       status: "success",
//       count: members.length,
//       members,
//     });
//   } catch (error) {
//     console.error("Error in getPending Members:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to fetch pending members",
//     });
//   }
// };

// // --------------------------
// // Delete Member (Admin Only)
// // --------------------------
// export const deleteMember = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const member = await Member.findByIdAndDelete(id);

//     if (!member) {
//       return res.status(404).json({
//         status: "failed",
//         message: "Member not found",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "Member deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error in deleteMember:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to delete member",
//     });
//   }
// };

// // ---------------------------------------------
// // Member Login
// // ---------------------------------------------

// export const MemberLogIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // console.log(email,password);

//     if (!email || !password) {
//       return res.status(402).json({
//         status: " Failed ",
//         message: "Email and Password are Required",
//       });
//     }

//     const member = await Member.findOne({ email });
//     // console.log(member);

//     if (!member) {
//       return res
//         .status(401)
//         .json({ status: "Failed", message: "Invalid Mail or Password" });
//     }

//     // Comparing passwords..
//     const isMatch = await bcrypt.compare(password, member.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         status: "Failed",
//         message: " Invalid Mail or password",
//       });
//     }

//     const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
//       await generateTokensMember(member);

//     setTokensCookies(
//       res,
//       accessToken,
//       refreshToken,
//       accessTokenExp,
//       refreshTokenExp
//     );

//     res.status(200).json({
//       member: {
//         id: member._id,
//         email: member.email,
//         name: member.name,
//         phone: member.phone,
//         address: member.address,
//         profilePic: member.profilePic,
//       },
//       status: "Success",
//       message: "Logged in SuccessFully",
//       is_auth: "true",
//     });
//     // console.log("succeessssssssssssssssssss");
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({
//       status: "Failed ",
//       message: " Failed to Login... (Catch Block)",
//     });
//   }
// };

// // ---------------------------------------------
// // Member Login
// // ---------------------------------------------
// export const memberProfile = async (req, res) => {
//   try {
//     const member = await Member.findById(req.user._id).select("-password");
//     if (!member) {
//       return res.status(404).json({ status: "Failed", message: "Member not found" });
//     }
//     res.json({ member });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ---------------------------------------------
// // Member Profilepic
// // ---------------------------------------------
// export const uploadProfile = async (req, res) => {
//   try {
//     const memberId = req.params.id;
//     const member = await Member.findById(memberId);

//     if (!member) return res.status(404).json({ message: "User not found" });

//     // If user already has a profile picture, delete old one
//     if (member.profilePic) {
//       const oldPath = path.join(process.cwd(), "src", member.profilePic);
//       if (fs.existsSync(oldPath)) {
//         fs.unlinkSync(oldPath);
//         // console.log("Deleted old profile pic:", oldPath);
//       }
//     }

//     // Save new path in DB
//     member.profilePic = `uploads/profile_pics/${req.file.filename}`;
//     await member.save();

//     res.json({ message: "Profile picture updated", member });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ---------------------------------------------
// // Member Logout
// // ---------------------------------------------
// export const MemberLogout = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;

//     const userRefreshToken = await MemberRefreshTokenModel.findOne({ token: refreshToken });

//     if (userRefreshToken) {
//       // Blacklist the refresh token
//       userRefreshToken.blacklisted = true;
//       await userRefreshToken.save();
//     } else {
//       console.log('Refresh token not found in database for blacklisting.');
//     }

//     // Clear access token and refresh token cookies
//     res.clearCookie("accessToken");
//     res.clearCookie("refreshToken");
//     res.clearCookie("is_auth");
//     res.status(200).json({ status: "success", message: "Logout successful" });
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to logout, please try again later",
//     });
//   }
// };

// // -----------------------------------------------------
// // if User wants to change his password after Login..
// // -----------------------------------------------------
// export const changeUserPassword = async (req, res) => {
//   try {
//     const {  password, confirmPassword } = req.body;

//     // Check if both password and confirmPassword are provided
//     if (!password || !confirmPassword) {
//       return res.status(400).json({
//         status: "failed",
//         message: "New Password and Confirm New Password are required",
//       });
//     }

//     // Check if password and confirmPassword match
//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         status: "failed",
//         message: "New Password and Confirm New Password don't match",
//       });
//     }

//     // Generate salt and hash new password
//     const salt = await bcrypt.genSalt(10);
//     const newHashPassword = await bcrypt.hash(password, salt);

//     // Update user's password
//     await Member.findByIdAndUpdate(req.user._id, {
//       $set: { password: newHashPassword },
//     });

//     // Send success response
//     res
//       .status(200)
//       .json({ status: "success", message: "Password changed successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to change password, please try again later",
//     });
//   }
// };

//* COntrollers with MySql

import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import hbs from "hbs";
import transporter from "../config/emailConfig.js";
import generateTokensMember from "../utils/generateTokens-member.js";
import setTokensCookies from "../utils/setTokenCookies.js";

//? ---------------------------------------------
// Function to generate random password
//? ---------------------------------------------
const generatePassword = (length = 8) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};

//* ---------------------------------------------
//? Apply for Membership (Public)
//* ---------------------------------------------
export const applyForMembership = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ status: "failed", message: "Name and Email are required" });
    }

    const existingMember = await prisma.member.findUnique({ where: { email } });
    if (existingMember) {
      return res.status(409).json({
        status: "failed",
        message: "Member with this email already applied",
      });
    }

    const newMember = await prisma.member.create({
      data: { name, email, phone, address, status: "PENDING" },
    });

    res.status(201).json({
      status: "success",
      message: "Membership application submitted",
      member: newMember,
    });
  } catch (error) {
    console.error("Error in applyForMembership:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to apply for membership" });
  }
};

//* ---------------------------------------------
//? Approve Member (Admin Only)
//* ---------------------------------------------
export const approveMember = async (req, res) => {
  try {
    const { id } = req.params;
    const memberId = parseInt(id, 10);

    if (isNaN(memberId)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid member ID" });
    }

    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member) {
      return res
        .status(404)
        .json({ status: "failed", message: "Member not found" });
    }

    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const updatedMember = await prisma.member.update({
      where: { id: memberId },
      data: {
        password: hashedPassword,
        status: "APPROVED",
        joinedAt: new Date(),
      },
    });

    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "approvalTemplate.hbs"
    );
    const templateSource = fs.readFileSync(templatePath, "utf8");
    const template = hbs.compile(templateSource);
    const html = template({
      name: updatedMember.name,
      email: updatedMember.email,
      password: plainPassword,
    });

    await transporter.sendMail({
      from: `"NGO Team" <${process.env.EMAIL_USER}>`,
      to: updatedMember.email,
      subject: "Your Membership Approved 🎉",
      html,
    });

    res.status(200).json({
      status: "success",
      message: "Member approved and email sent successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("Error in approveMember:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to approve member" });
  }
};

//* ---------------------------------------------
//? Reject Member (Admin Only)
//* ---------------------------------------------
export const rejectMember = async (req, res) => {
  try {
    const { id } = req.params;
    const memberId = parseInt(id, 10);
    console.log(memberId);
    

    if (isNaN(memberId)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid member ID" });
    }

    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member) {
      return res
        .status(404)
        .json({ status: "failed", message: "Member not found" });
    }

    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "rejectionTemplate.hbs"
    );
    const templateSource = fs.readFileSync(templatePath, "utf8");
    const template = hbs.compile(templateSource);
    const html = template({ name: member.name });

    await transporter.sendMail({
      from: `"NGO Team" <${process.env.EMAIL_USER}>`,
      to: member.email,
      subject: "Membership Application Rejected",
      html,
    });

    await prisma.member.delete({ where: { id:memberId } });

    res.status(200).json({
      status: "success",
      message: "Member rejected, email sent, and data deleted",
    });
  } catch (error) {
    console.error("Error in rejectMember:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to reject member" });
  }
};

//* ---------------------------------------------
//? Get All Members (Admin)
//* ---------------------------------------------
export const getAllMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ status: "success", count: members.length, members });
  } catch (error) {
    console.error("Error in getAllMembers:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to fetch members" });
  }
};

//* ---------------------------------------------
//? Get Approved Members (Public)
//* ---------------------------------------------
export const getApprovedMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      where: { status: "APPROVED" },
      orderBy: { joinedAt: "desc" },
    });
    res.status(200).json({ status: "success", count: members.length, members });
  } catch (error) {
    console.error("Error in getApprovedMembers:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to fetch approved members" });
  }
};

//* ---------------------------------------------
//? Get Pending Members (Admin)
//* ---------------------------------------------
export const getPendingMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ status: "success", count: members.length, members });
  } catch (error) {
    console.error("Error in getPendingMembers:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to fetch pending members" });
  }
};

//! ---------------------------------------------
//? Delete Member (Admin)
//! ---------------------------------------------
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const memberId = parseInt(id, 10);

    if (isNaN(memberId)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid member ID" });
    }
    const member = await prisma.member.delete({ where: { id: memberId } });

    if (!member) {
      return res
        .status(404)
        .json({ status: "failed", message: "Member not found" });
    }

    res
      .status(200)
      .json({ status: "success", message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMember:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to delete member" });
  }
};

// ---------------------------------------------
// Member Login
// ---------------------------------------------
export const MemberLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email and Password are required" });
    }

    const member = await prisma.member.findUnique({ where: { email } });
    if (!member) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid email or password" });
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateTokensMember(member);

    setTokensCookies(
      res,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp
    );

    res.status(200).json({
      member: {
        id: member.id,
        email: member.email,
        name: member.name,
        phone: member.phone,
        address: member.address,
        profilePic: member.profilePic,
      },
      status: "success",
      message: "Logged in successfully",
      is_auth: true,
    });
  } catch (error) {
    console.error("Error in MemberLogIn:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Failed to login (server error)" });
  }
};

// ---------------------------------------------
// Get Member Profile
// ---------------------------------------------
export const memberProfile = async (req, res) => {
  try {
    const member = await prisma.member.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        profilePic: true,
        status: true,
        joinedAt: true,
      },
    });

    if (!member)
      return res
        .status(404)
        .json({ status: "failed", message: "Member not found" });
    res.json({ member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------
// Upload Member Profile Picture
// ---------------------------------------------
export const uploadProfile = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await prisma.member.findUnique({ where: { id: memberId } });

    if (!member) return res.status(404).json({ message: "Member not found" });

    if (member.profilePic) {
      const oldPath = path.join(process.cwd(), "src", member.profilePic);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const updatedMember = await prisma.member.update({
      where: { id: memberId },
      data: { profilePic: `uploads/profile_pics/${req.file.filename}` },
    });

    res.json({ message: "Profile picture updated", member: updatedMember });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------
// Member Logout
// ---------------------------------------------
export const MemberLogout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const memberRefreshToken = await prisma.memberRefreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (memberRefreshToken) {
      await prisma.memberRefreshToken.update({
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
    res.status(500).json({ status: "failed", message: "Unable to logout" });
  }
};

// ---------------------------------------------
// Change Member Password
// ---------------------------------------------
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
      return res
        .status(400)
        .json({ status: "failed", message: "Passwords don't match" });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashPassword = await bcrypt.hash(password, salt);

    await prisma.member.update({
      where: { id: req.user.id },
      data: { password: newHashPassword },
    });

    res
      .status(200)
      .json({ status: "success", message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Unable to change password" });
  }
};
