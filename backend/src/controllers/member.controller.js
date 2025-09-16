import Member from "../models/memberModel.js";
import bcrypt from "bcrypt";
import hbs from "hbs";
import  path  from "path";
import fs from "fs"
import transporter from "../config/emailConfig.js";

// function to generate random password
const generatePassword = (length = 8) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};

// --------------------------
// Apply for Membership (Public)
// --------------------------
export const applyForMembership = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        status: "failed",
        message: "Name and Email are required",
      });
    }

    // Check if already exists
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(409).json({
        status: "failed",
        message: "Member with this email already applied",
      });
    }

    const newMember = await new Member({
      name,
      email,
      phone,
      address,
    }).save();

    res.status(201).json({
      status: "success",
      message: "Membership application submitted",
      member: newMember,
    });
  } catch (error) {
    console.error("Error in applyForMembership:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to apply for membership",
    });
  }
};

// --------------------------
// Approve Member (Admin Only)
// --------------------------
export const approveMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({
        status: "failed",
        message: "Member not found",
      });
    }

    // generate & hash password
    const plainPassword = generatePassword();
    member.password = await bcrypt.hash(plainPassword, 10);
    member.status = "approved";
    member.joinedAt = Date.now();
    await member.save();

    // Load Handlebars template
    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "approvalTemplate.hbs"
    );
    const templateSource = fs.readFileSync(templatePath, "utf8");

    // Compile with hbs
    const template = hbs.compile(templateSource);

    // Render final HTML with data
    const html = template({
      name: member.name,
      email: member.email,
      password: plainPassword,
    });

    // Send email
    await transporter.sendMail({
      from: `"NGO Team" <${process.env.Email_USER}>`,
      to: member.email,
      subject: "Your Membership Approved 🎉",
      html,
    });

    res.status(200).json({
      status: "success",
      message: "Member approved and email sent successfully",
      member,
    });
  } catch (error) {
    console.error("Error in approveMember:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to approve member",
    });
  }
};

// --------------------------
// Reject Member (Admin Only)
// --------------------------
export const rejectMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({
        status: "failed",
        message: "Member not found",
      });
    }

    // Load rejection template
    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "rejectionTemplate.hbs"
    );
    const templateSource = fs.readFileSync(templatePath, "utf8");

    // Compile template
    const template = hbs.compile(templateSource);
    const html = template({ name: member.name });

    // Send rejection email
    await transporter.sendMail({
      from: `"NGO Team" <${process.env.Email_USER}>`,
      to: member.email,
      subject: "Membership Application Rejected",
      html,
    });

    // Delete member from database
    await Member.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Member rejected, email sent, and data deleted",
    });
  } catch (error) {
    console.error("Error in rejectMember:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to reject member",
    });
  }
};

// --------------------------
// Get All Members (Admin)
// --------------------------
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: members.length,
      members,
    });
  } catch (error) {
    console.error("Error in getAllMembers:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch members",
    });
  }
};

// --------------------------
// Get Approved Members (Public)
// --------------------------
export const getApprovedMembers = async (req, res) => {
  try {
    const members = await Member.find({ status: "approved" }).sort({
      joinedAt: -1,
    });

    res.status(200).json({
      status: "success",
      count: members.length,
      members,
    });
  } catch (error) {
    console.error("Error in getApprovedMembers:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch approved members",
    });
  }
};

// --------------------------
// Get Pending Requests (Admin)
// --------------------------
export const getPendingMembers = async (req, res) => {
  try {
    const members = await Member.find({ status: "pending" }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: "success",
      count: members.length,
      members,
    });
  } catch (error) {
    console.error("Error in getPending Members:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch pending members",
    });
  }
};

// --------------------------
// Delete Member (Admin Only)
// --------------------------
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findByIdAndDelete(id);

    if (!member) {
      return res.status(404).json({
        status: "failed",
        message: "Member not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Member deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteMember:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to delete member",
    });
  }
};


// ---------------------------------------------
// Member Login
// ---------------------------------------------


export const MemberLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).json({
        status: " Failed ",
        message: "Email and Password are Required",
      });
    }

    const member = await Member.findOne({ email });

    if (!member) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Invalid Mail or Password" });
    }


    // Comparing passwords..
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "Failed",
        message: " Invalid Mail or password",
      });
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateTokens(member);

    setTokenCookies(
      res,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp
    );

    res.status(200).json({ 
      member :{
        id: member._id,
        email: member.email,
        name: member.name,
        phone:member.phone,
        address: member.address,
        profilePic : member.profilePic,

      },
      status: "Success",
      message: "Logged in SuccessFully",
      is_auth: "true"
    });
    // console.log("succeessssssssssssssssssss");
    
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