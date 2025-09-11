import { create } from "zustand";
import axiosInstance from "../lib/axios";

import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isSignup: false,
  setOtp: false,
  isLogin: false,
  isAuthenticated: false,

  signup: async (data) => {
    set({ isSignup: true });
    try {
      const response = await axiosInstance.post("/api/user/signup", data);
      set({ user: response.data });

      toast.success("Signup Successful");
    } catch (error) {
      // toast.error(error.response.data.message);
      toast.error("Signup Failed");
    } finally {
      set({ isSignup: false });
    }
  },

  verifyEmail: async (data) => {
    set({ setOtp: true });
    try {
      const response = await axiosInstance.post("/api/user/verify-email", data);
      set({ user: response.data });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ setOtp: false });
    }
  },

  login: async (data) => {
    set({ isLogin: true });
    try {
      const response = await axiosInstance.post("/api/user/login", data, {
        withCredentials: true,
      });
      if (Cookies.get("is_auth") === "true") {
        set({
          user: response.data?.user,
          isAuthenticated: true,
        });
        toast.success(response?.data?.message || "Logged in Successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Log In");
    } finally {
      set({ isLogin: false });
    }
  },
}));
