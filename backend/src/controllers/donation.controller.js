import Donation from "../models/donationModel.js";
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
    const { donorId, amount, paymentMethod } = req.body;

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

    // Save donation with pending status
    const donation = await new Donation({
      donor: donorId,
      amount,
      paymentMethod,
      status: "pending",
      transactionId: order.id, // ✅ store Razorpay orderId here
    }).save();

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

    // Verify signature
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Update donation in DB
    const updatedDonation = await Donation.findOneAndUpdate(
      { transactionId: razorpay_order_id }, // ✅ matches createDonation
      {
        status: "completed",
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found for this orderId",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      donation: updatedDonation,
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
    const donations = await Donation.find().populate("donor", "name email");
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
    const donation = await Donation.findById(req.params.id).populate(
      "donor",
      "name email"
    );
    if (!donation) {
      return res
        .status(404)
        .json({ status: "failed", message: "Donation not found" });
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
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      return res
        .status(404)
        .json({ status: "failed", message: "Donation not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Donation deleted successfully" });
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
    const donations = await Donation.find({ donor: req.params.userId }).sort({
      createdAt: -1,
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
// Donation Stats (Admin)
// -----------------------------------------------------
export const getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalAmount = await Donation.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      status: "success",
      totalDonations,
      totalAmount: totalAmount[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error fetching donation stats:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to fetch donation stats",
    });
  }
};
