// import Donation from "../models/donationModel.js";
// import User from "../models/userModel.js";
// import Member from "../models/memberModel.js";
// import transporter from "../config/emailConfig.js";
// import generateReceipt from "../utils/generateReceipt.js";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import mongoose from "mongoose";

// // ✅ Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // -----------------------------------------------------
// // Create Donation Order
// // -----------------------------------------------------

// export const createDonation = async (req, res) => {
//   try {
//     const { donorId, amount, paymentMethod, phone, address } = req.body;

//     if (!donorId || !amount || !paymentMethod) {
//       return res.status(400).json({
//         status: "failed",
//         message: "DonorId, Amount, and Payment Method are required",
//       });
//     }

//     // Create Razorpay order
//     const options = {
//       amount: amount * 100, // convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     // 🔹 Find donor (could be User or Member)
//     let donorDoc = null;
//     if (req.user.constructor.modelName === "User") {
//       donorDoc = await User.findById(donorId);
//     } else if (req.user.constructor.modelName === "Member") {
//       donorDoc = await Member.findById(donorId);
//     }

//     if (donorDoc) {
//       if (!donorDoc.phone && phone) donorDoc.phone = phone;
//       if (!donorDoc.address && address) donorDoc.address = address;
//       await donorDoc.save();
//     }

//     // Save donation with pending status
//     const donation = await new Donation({
//       donor: donorId,
//       donorModel: req.user.constructor.modelName, // ✅ dynamic ref
//       amount,
//       paymentMethod,
//       status: "pending",
//       transactionId: order.id, // ✅ store Razorpay orderId
//     }).save();

//     res.status(201).json({
//       status: "success",
//       message: "Donation order created",
//       order,
//       donation,
//     });
//   } catch (error) {
//     console.error("Error creating donation:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to create donation order",
//     });
//   }
// };

// // -----------------------------------------------------
// // Verify Payment
// // -----------------------------------------------------
// export const verifyDonation = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required for verification",
//       });
//     }

//     // Generate signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     // Verify signature
//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment signature",
//       });
//     }

//     // Update donation in DB
//     const updatedDonation = await Donation.findOneAndUpdate(
//       { transactionId: razorpay_order_id }, // ✅ matches createDonation
//       {
//         status: "completed",
//         paymentId: razorpay_payment_id,
//         signature: razorpay_signature,
//       },
//       { new: true }
//     );

//     if (!updatedDonation) {
//       return res.status(404).json({
//         success: false,
//         message: "Donation not found for this orderId",
//       });
//     }

//     const donation = await Donation.findOne({
//       transactionId: razorpay_order_id,
//     }).populate("donor");
//     const donor = donation.donor;

//     // Create PDF buffer
//     let chunks = [];
//     const doc = generateReceipt(donation, donor);
//     doc.on("data", (chunk) => chunks.push(chunk));
//     doc.on("end", async () => {
//       const pdfBuffer = Buffer.concat(chunks);

//       // Send email
//       await transporter.sendMail({
//         from: process.env.Email_USER,
//         to: donor.email,
//         subject: "Donation Receipt - AAEAR Foundation",
//         text: "Thank you for your generous donation. Please find your receipt attached.",
//         attachments: [
//           {
//             filename: `receipt_${donation._id}.pdf`,
//             content: pdfBuffer,
//           },
//         ],
//       });
//     });

//     res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//       donation: updatedDonation,
//     });
//   } catch (error) {
//     console.error("Error verifying donation:", error);
//     res.status(500).json({
//       success: false,
//       message: "Unable to verify payment",
//     });
//   }
// };

// // -----------------------------------------------------
// // Get All Donations (Admin)
// // -----------------------------------------------------
// export const getAllDonations = async (req, res) => {
//   try {
//     const donations = await Donation.find()
//       .sort({ date: -1 })
//       .populate("donor", "name email ");
//     res.status(200).json({ status: "success", donations });
//   } catch (error) {
//     console.error("Error fetching donations:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to fetch donations",
//     });
//   }
// };

// // -----------------------------------------------------
// // Get Donation by ID
// // -----------------------------------------------------
// export const getDonationById = async (req, res) => {
//   try {
//     const donation = await Donation.findById(req.params.id).populate(
//       "donor",
//       "name email"
//     );
//     if (!donation) {
//       return res
//         .status(404)
//         .json({ status: "failed", message: "Donation not found" });
//     }
//     res.status(200).json({ status: "success", donation });
//   } catch (error) {
//     console.error("Error fetching donation:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to fetch donation",
//     });
//   }
// };

// // -----------------------------------------------------
// // Delete Donation (Admin)
// // -----------------------------------------------------
// export const deleteDonation = async (req, res) => {
//   try {
//     const donation = await Donation.findByIdAndDelete(req.params.id);
//     if (!donation) {
//       return res
//         .status(404)
//         .json({ status: "failed", message: "Donation not found" });
//     }
//     res
//       .status(200)
//       .json({ status: "success", message: "Donation deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting donation:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to delete donation",
//     });
//   }
// };

// // -----------------------------------------------------
// // Get Donations by User
// // -----------------------------------------------------
// export const getUserDonations = async (req, res) => {
//   try {
//     const donations = await Donation.find({ donor: req.params.userId }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json({ status: "success", donations });
//   } catch (error) {
//     console.error("Error fetching user donations:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to fetch user donations",
//     });
//   }
// };

// // -----------------------------------------------------
// // Donation Stats (Admin)
// // -----------------------------------------------------
// export const getDonationStats = async (req, res) => {
//   try {
//     const totalDonations = await Donation.countDocuments({
//       status: "completed",
//     });

//     const totalAmountAgg = await Donation.aggregate([
//       { $match: { status: "completed" } },
//       { $group: { _id: null, total: { $sum: "$amount" } } },
//     ]);
//     const totalAmount = totalAmountAgg[0]?.total || 0;

//     const monthlyStats = await Donation.aggregate([
//       { $match: { status: "completed" } },
//       {
//         $group: {
//           _id: { month: { $month: "$createdAt" } },
//           amount: { $sum: "$amount" },
//         },
//       },
//       { $sort: { "_id.month": 1 } },
//     ]);

//     // Map months properly (Jan–Dec)
//     const monthNames = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     const formattedMonthlyStats = monthNames.map((m, idx) => {
//       const found = monthlyStats.find((stat) => stat._id.month === idx + 1);
//       return { month: m, amount: found ? found.amount : 0 };
//     });

//     // New donors (unique count of users who donated)
//     const newDonorsAgg = await Donation.distinct("donor", {
//       status: "completed",
//     });
//     const newDonors = newDonorsAgg.length;

//     // Active projects (fake for now – if you have Project model, count it)
//     const activeProjects = 12; // replace with Project.countDocuments({ active: true })

//     res.status(200).json({
//       status: "success",
//       totals: {
//         totalDonations,
//         fundsRaised: totalAmount,
//         newDonors,
//         activeProjects,
//       },
//       monthlyStats: formattedMonthlyStats,
//     });
//   } catch (error) {
//     console.error("Error fetching donation stats:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to fetch donation stats",
//     });
//   }
// };

// // // -----------------------------------------------------
// // // Get recent 5 donations
// // // -----------------------------------------------------
// export const getRecentDonations = async (req, res) => {
//   try {
//     const donations = await Donation.find()
//       .sort({ date: -1 }) // newest first
//       .limit(5) // only top 5
//       .populate("donor", "name");

//     res.status(200).json({
//       status: "success",
//       donations,
//     });
//   } catch (error) {
//     console.error("Error fetching recent donations:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to fetch recent donations",
//     });
//   }
// };

// // // -----------------------------------------------------
// // // Download Donation Receipt
// // // -----------------------------------------------------

// export const downloadReceipt = async (req, res) => {
//   const { id } = req.params;
//   const donation = await Donation.findById(id).populate("donor");

//   if (!donation) return res.status(404).json({ message: "Donation not found" });

//   generateReceipt(donation, donation.donor, res); // Streams directly
// };

// export const getUserDonationsMember = async (req, res) => {
//   try {
//     const donations = await Donation.find({ donor: req.params.memberId }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json({ status: "success", donations });
//   } catch (error) {
//     console.error("Error fetching user donations:", error);
//     res.status(500).json({
//       status: "failed",
//       message: "Unable to fetch user donations",
//     });
//   }
// };

// export const getTotalCompletedDonations = async (req, res) => {
//   try {
//     const { donorId } = req.params; // or req.query / req.body depending on your route

//     if (!donorId) {
//       return res.status(400).json({
//         status: "failed",
//         message: "DonorId is required",
//       });
//     }

//     // Aggregate donations with status completed
//     const result = await Donation.aggregate([
//       {
//         $match: {
//           donor: new mongoose.Types.ObjectId(donorId),
//           status: "completed",
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalAmount: { $sum: "$amount" },
//         },
//       },
//     ]);

//     const totalAmount = result.length > 0 ? result[0].totalAmount : 0;

//     res.status(200).json({
//       status: "success",
//       total: totalAmount,
//     });
//   } catch (error) {
//     console.error("Error fetching total donations:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//     });
//   }
// };

import prisma from "../config/prisma.js";
import transporter from "../config/emailConfig.js";
import generateReceipt from "../utils/generateReceipt.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// -----------------------------------------------------
// Create Donation Order
// -----------------------------------------------------
export const createDonation = async (req, res) => {
  try {
    const { donorId, amount, paymentMethod, phone, address, donorType } =
      req.body;      

    if (!donorId || !amount || !paymentMethod) {
      return res.status(400).json({
        status: "failed",
        message: "DonorId, Amount, and Payment Method are required",
      });
    }


    // Create Razorpay order
    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    // 🔹 Update donor details if missing
    if (donorType === "USER") {
      await prisma.user.update({
        where: { id: donorId },
        data: {
          phone: phone || undefined,
          address: address || undefined,
        },
      });
    } else if (donorType === "MEMBER") {
      await prisma.member.update({
        where: { id: donorId },
        data: {
          phone: phone || undefined,
          address: address || undefined,
        },
      });
    }

    // Save donation (pending)
    const donation = await prisma.donation.create({
      data: {
        amount,
        paymentMethod,
        status: "PENDING",
        transactionId: order.id,
        ...(donorType === "USER" ? { userId: donorId } : { memberId: donorId }),
      },
    });

    res.status(201).json({
      status: "success",
      message: "Donation order created",
      order,
      donation,
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to create donation order",
    });
  }
};

// -----------------------------------------------------
// Verify Payment
// -----------------------------------------------------
export const verifyDonation = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "All fields are required for verification",
      });
    }

    // Generate signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Update donation
    const updatedDonation = await prisma.donation.updateMany({
      where: { transactionId: razorpay_order_id },
      data: {
        status: "COMPLETED",
      },
    });

    if (!updatedDonation.count) {
      return res.status(404).json({
        success: false,
        message: "Donation not found for this orderId",
      });
    }

    const donation = await prisma.donation.findFirst({
      where: { transactionId: razorpay_order_id },
      include: { user: true, member: true },
    });

    const donor = donation.user || donation.member;

    // Generate receipt PDF and send email
    let chunks = [];
    const doc = generateReceipt(donation, donor);
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(chunks);

      await transporter.sendMail({
        from: process.env.Email_USER,
        to: donor.email,
        subject: "Donation Receipt - AAEAR Foundation",
        text: "Thank you for your generous donation. Please find your receipt attached.",
        attachments: [
          {
            filename: `receipt_${donation.id}.pdf`,
            content: pdfBuffer,
          },
        ],
      });
    });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      donation,
    });
  } catch (error) {
    console.error("Error verifying donation:", error);
    res.status(500).json({
      success: false,
      message: "Unable to verify payment",
    });
  }
};

// -----------------------------------------------------
// Get All Donations (Admin)
// -----------------------------------------------------
export const getAllDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { date: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        member: { select: { name: true, email: true } },
      },
    });

    res.status(200).json({ status: "success", donations });
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch donations",
    });
  }
};

// -----------------------------------------------------
// Get Donation by ID
// -----------------------------------------------------
export const getDonationById = async (req, res) => {
  try {
    const donation = await prisma.donation.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        user: { select: { name: true, email: true } },
        member: { select: { name: true, email: true } },
      },
    });

    if (!donation) {
      return res.status(404).json({
        status: "failed",
        message: "Donation not found",
      });
    }

    res.status(200).json({ status: "success", donation });
  } catch (error) {
    console.error("Error fetching donation:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch donation",
    });
  }
};

// -----------------------------------------------------
// Delete Donation (Admin)
// -----------------------------------------------------
export const deleteDonation = async (req, res) => {
  try {
    const deleted = await prisma.donation.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(200).json({
      status: "success",
      message: "Donation deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("Error deleting donation:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to delete donation",
    });
  }
};

// -----------------------------------------------------
// Get Donations by User
// -----------------------------------------------------
export const getUserDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      where: { userId: parseInt(req.params.userId) },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ status: "success", donations });
  } catch (error) {
    console.error("Error fetching user donations:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch user donations",
    });
  }
};

// -----------------------------------------------------
// Get Donations by Member
// -----------------------------------------------------
export const getUserDonationsMember = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      where: { memberId: parseInt(req.params.memberId) },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ status: "success", donations });
  } catch (error) {
    console.error("Error fetching member donations:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch member donations",
    });
  }
};

// -----------------------------------------------------
// Get Total Completed Donations (by Donor)
// -----------------------------------------------------
export const getTotalCompletedDonations = async (req, res) => {
  try {
    const { donorId, donorType } = req.params;

    if (!donorId || !donorType) {
      return res.status(400).json({
        status: "failed",
        message: "DonorId and donorType are required",
      });
    }

    const total = await prisma.donation.aggregate({
      _sum: { amount: true },
      where: {
        status: "COMPLETED",
        ...(donorType === "USER"
          ? { userId: parseInt(donorId) }
          : { memberId: parseInt(donorId) }),
      },
    });

    res.status(200).json({
      status: "success",
      total: total._sum.amount || 0,
    });
  } catch (error) {
    console.error("Error fetching total donations:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const downloadReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    const donation = await prisma.donation.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, member: true },
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    const donor = donation.user || donation.member;

    // Generate PDF and stream it back
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt_${id}.pdf`
    );
    generateReceipt(donation, donor, res); // your util streams directly
  } catch (error) {
    console.error("Error downloading receipt:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to download receipt",
    });
  }
};

export const getDonationStats = async (req, res) => {
  try {
    // Total donations (completed only)
    const totalDonations = await prisma.donation.count({
      where: { status: "COMPLETED" },
    });

    // Total funds raised
    const totalAmountAgg = await prisma.donation.aggregate({
      _sum: { amount: true },
      where: { status: "COMPLETED" },
    });
    const totalAmount = totalAmountAgg._sum.amount || 0;

    // Monthly stats (group by month)
    const monthlyStatsRaw = await prisma.$queryRaw`
      SELECT 
        MONTH(createdAt) as month, 
        SUM(amount) as amount
      FROM Donation
      WHERE status = 'COMPLETED'
      GROUP BY MONTH(createdAt)
      ORDER BY MONTH(createdAt);
    `;

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedMonthlyStats = monthNames.map((m, idx) => {
      const found = monthlyStatsRaw.find((stat) => stat.month === idx + 1);
      return { month: m, amount: found ? Number(found.amount) : 0 };
    });

    // New donors (unique across userId & memberId)
    const uniqueUsers = await prisma.donation.findMany({
      where: { status: "COMPLETED", userId: { not: null } },
      distinct: ["userId"],
    });
    const uniqueMembers = await prisma.donation.findMany({
      where: { status: "COMPLETED", memberId: { not: null } },
      distinct: ["memberId"],
    });
    const newDonors = uniqueUsers.length + uniqueMembers.length;

    // Active projects (if you have a Project table, replace this)
    const activeProjects = 12;

    res.status(200).json({
      status: "success",
      totals: {
        totalDonations,
        fundsRaised: totalAmount,
        newDonors,
        activeProjects,
      },
      monthlyStats: formattedMonthlyStats,
    });
  } catch (error) {
    console.error("Error fetching donation stats:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch donation stats",
    });
  }
};

// donation.controller.js
export const getRecentDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        member: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // normalize response
    const formatted = donations.map((d) => ({
      id: d.id,
      amount: d.amount,
      createdAt: d.createdAt,
      donor: d.user
        ? { name: d.user.name, email: d.user.email, type: "USER" }
        : d.member
        ? { name: d.member.name, email: d.member.email, type: "MEMBER" }
        : { name: "Anonymous", email: "", type: "ANON" },
    }));

    res.json({ donations: formatted });
  } catch (error) {
    console.error("Error fetching recent donations:", error);
    res.status(500).json({ message: "Failed to fetch donations" });
  }
};

