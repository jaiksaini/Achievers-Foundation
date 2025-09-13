import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useDonationStore = create((set) => ({
  isDonating: false,

  donate: async (formData, userId) => {
    set({ isDonating: true });
    try {
      // 1️⃣ Call backend to create Razorpay order
      const { data: res } = await axiosInstance.post(
        "/api/donation/create-order",   // ✅ match your controller route
        {
          donorId: userId,
          amount: formData.amount,
          paymentMethod: formData.paymentMethod,
        },
        { withCredentials: true }
      );

      const { order } = res;

      // 2️⃣ Setup Razorpay payment options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "My NGO",
        description: "Donation towards NGO",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3️⃣ Verify payment with backend
            const verifyRes = await axiosInstance.post(
              "/api/donation/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                // amount: formData.amount,
              }
            );
            
            
            if (verifyRes.data.success) {
              toast.success( "✅ Donation successful! Receipt generated.");
            } else {
              toast.error("❌ Payment verification failed.");
              console.log();
              
              
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Verification failed.");
          }
        },
        theme: {
          color: "#2563eb",
        },
      };

      // 4️⃣ Open Razorpay popup
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      set({ isDonating: false });
    }
  },
}));
