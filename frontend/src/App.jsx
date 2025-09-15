import React from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Members from "./pages/Members";
import Documents from "./pages/Documents";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/Signup";
import SingInPg from "./pages/SingInPg";
import AdmDashboard from "./pages/AdmDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminMembers from "./components/Admin/AdminMembers";
import AdminDoc from "./components/Admin/AdminDoc";
import AdminDonations from "./components/Admin/AdminDonations";
import AdminSetting from "./components/Admin/AdminSetting";
import MemberRequests from "./components/Admin/MemberRequests";
import MemDashboard from "./pages/MemDashboard";
import MemberDonationHistory from "./components/Member/MemberDonationHistory";
import MemberIDCard from "./components/Member/MemberIDCard";
import MemberOverview from "./components/Member/MemberOverview";
import MemberSettings from "./components/Member/MemberSettings";
import Donation from "./pages/Donation";
import JoinUs from "./pages/JoinUs";
import EmailVerification from "./pages/EmailVerification";
import Userdashboard from "./pages/Userdashboard";
import UserOverview from "./components/User/UserOverview";
import UserDonations from "./components/User/UserDonations";
import UserSettings from "./components/User/UserSettings";

const App = () => {


 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="members" element={<Members />} />
          <Route path="documents" element={<Documents />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="joinus" element={<JoinUs />} />
          <Route path="admin" element={<AdmDashboard />}>
            <Route path="/admin/" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route
              path="/admin/members/requests"
              element={<MemberRequests />}
            />
            <Route path="/admin/document" element={<AdminDoc />} />
            <Route path="/admin/donations" element={<AdminDonations />} />
            <Route path="/admin/settings" element={<AdminSetting />} />
          </Route>
          <Route path="member" element={<MemDashboard />}>
            <Route path="/member/" element={<MemberOverview />} />
            <Route path="/member/overview" element={<MemberOverview />} />
            <Route
              path="/member/donationhistory"
              element={<MemberDonationHistory />}
            />
            <Route path="/member/setting" element={<MemberSettings />} />
            <Route path="/member/idcard" element={<MemberIDCard />} />
          </Route>
          <Route path="user" element={<Userdashboard/>}>
            <Route path="/user/" element={<UserOverview/>} />
            <Route path="/user/overview" element={<UserOverview/>} />
            <Route path="/user/Donation" element={<UserDonations/>} />
            <Route path="/user/setting" element={<UserSettings/>} />            
          </Route>
          <Route path="donation" element={<Donation />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<SingInPg />} />
        <Route path="verify-email" element={<EmailVerification/>} />
      </>
    )
  );

  return (
    <>
  <RouterProvider router={router} />

    <Toaster position="top-right" reverseOrder={false} />
  </>

  );
  
};

export default App;
