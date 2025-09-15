import React, { useState } from "react";
import {
  FaHome,
  FaHistory,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import assets from "../assets/assets";

const Userdashboard  = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "/user/overview", label: "Overview", icon: <FaHome /> },
    {
      to: "/user/Donation",
      label: "Donation History",
      icon: <FaHistory />,
    },
    { to: "/user/setting", label: "Settings", icon: <FaUser /> },
  ];

  return (
    <div className="flex min-h-[92vh] bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed md:static top-0 left-0 w-64 bg-[#32394e] shadow-lg text-white p-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-20`}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-xl ">User Dashboard</span>
        </h2>
        <nav className="space-y-4">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md ${
                  isActive
                    ? "bg-white text-[#1E3A8A] font-semibold"
                    : "hover:bg-white/20"
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white p-4 shadow-md">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars size={20} />
          </button>
          <h2 className="text-lg font-bold">Welcome, User!</h2>
          <img
            src={assets.user}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        </header>

        <div className="flex-1 p-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Userdashboard
