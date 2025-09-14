import Member from "../models/memberModel.js";

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

    const member = await Member.findByIdAndUpdate(
      id,
      { status: "approved", joinedAt: Date.now() },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({
        status: "failed",
        message: "Member not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Member approved successfully",
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

    const member = await Member.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({
        status: "failed",
        message: "Member not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Member rejected successfully",
      member,
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
