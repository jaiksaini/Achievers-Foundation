import mongoose from "mongoose";


const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["card", "upi"], required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  transactionId: { type: String },
  date: { type: Date, default: Date.now }
}
,
// { timestamps: true }
);


const Donation = mongoose.models.Donation || mongoose.model("Donation", donationSchema);
export default Donation;