import { create } from "zustand";
import axiosInstance from "../lib/axios";

import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  member: null,
  isAuthenticated: false,
  isSignup: false,
  setOtp: false,
  isLogin: false,
  isUploading: false,

  // getUserProfile: async () => {
  //   try {
  //     const res = await axiosInstance.get("/api/user/user-profile", {
  //       withCredentials: true,
  //     });

  //     if (res.data?.user) {
  //       set({ user: res.data.user, isAuthenticated: true });
  //     } else {
  //       set({ user: null, isAuthenticated: false });
  //     }
  //   } catch (error) {
  //     console.error("Error Getting Profile ", error);
  //     set({ user: null, isAuthenticated: false });
  //   }
  // },

  // getMemberProfile: async () => {
  //   try {
  //     const res = await axiosInstance.get("/api/member/member-profile", {
  //       withCredentials: true,
  //     });
  //     if (res.data?.member) {
  //       set({ member: res.data.member, isAuthenticated: true });
  //     } else {
  //       set({ member: null, isAuthenticated: false });
  //     }
  //   } catch (error) {
  //     console.error("Error Getting Member Profile", error);
  //     set({ member: null, isAuthenticated: false });
  //   }
  // },

  checkAuth: async () => {
    if (Cookies.get("is_auth") !== "true") {
      set({ user: null, member: null, isAuthenticated: false });
      return;
    }

    try {
      // 1. Try fetching user profile
      const userRes = await axiosInstance.get("/api/user/user-profile", {
        withCredentials: true,
      });

      if (userRes.data?.user) {
        set({
          user: userRes.data.user,
          member: null,
          isAuthenticated: true,
        });
        return;
      }
    } catch (err) {
      console.log("Not a user, trying member...");
    }

    try {
      // 2. If not user, try fetching member profile
      const memberRes = await axiosInstance.get("/api/member/member-profile", {
        withCredentials: true,
      });

      if (memberRes.data?.member) {
        set({
          member: memberRes.data.member,
          user: null,
          isAuthenticated: true,
        });
        return;
      }
    } catch (err) {
      console.log("Not a member either.");
    }

    // 3. If both fail → logged out
    set({ user: null, member: null, isAuthenticated: false });
  },

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

  // Login
  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/api/user/login", data, {
        withCredentials: true,
      });

      // Check if the 'is_auth' cookie is set
      if (Cookies.get("is_auth") === "true") {
        set({ user: res.data?.user, isAuthenticated: true });
        toast.success("Logged in successfully");
      } else {
        set({ isAuthenticated: false });
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in.");
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/user/logout");

      // Remove cookies related to authentication
      Cookies.remove("is_auth");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      // Reset authentication state in Zustand
      set({ user: null, isAuthenticated: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out.");
    }
  },

  uploadProfilePic: async (userId, file) => {
    set({ isUploading: true });

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await axiosInstance.post(
        `/api/user/upload/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      set({ user: res.data.user });
      toast.success("Profile picture updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload picture");
    } finally {
      set({ isUploading: false });
    }
  },

  memberLogin: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/api/member/member-signin", data, {
        withCredentials: true,
      });

      // Check if the 'is_auth' cookie is set
      if (Cookies.get("is_auth") === "true") {
        set({ member: res.data?.member, isAuthenticated: true });
        toast.success("Logged in successfully");
      } else {
        set({ isAuthenticated: false });
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in.");
    } finally {
      set({ isLogin: false });
    }
  },
}));
