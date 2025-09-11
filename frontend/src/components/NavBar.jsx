import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { useAuthStore } from "../store/useAuthStore";


const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore()
  const role = user?.role
 



  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/members", label: "Members" },
    { path: "/documents", label: "Documents" },
    { path: "/about", label: "About us" },
    { path: "/contact", label: "Contact us" },
  ];

  return (
    <header className="top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + Title */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={assets.logo}
            alt="Academics Achievers Foundation"
            className="h-10 w-10 rounded-full object-cover border border-gray-200"
          />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-wide uppercase text-gray-900">
              Achievers
            </span>
            <span className="text-[11px] text-gray-500">
              Education and Research Foundation
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Sign in */}
        <div className="hidden md:block">
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/signin", { replace: true })}
              type="button"
              className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm transition"
            >
              Sign in
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/admin/dashboard", { replace: true })}
                type="button"
                className="inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm transition"
              >
                {role === "admin" ? "Admin DashBoard" : "Dashboard"}
              </button>
              <button
                onClick={logout}
                className="bg-white text-secondary px-4 py-1 rounded-md border-2 border-white hover:bg-secondary hover:text-white"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Toggle navigation"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden border-t border-gray-100 bg-white shadow-md animate-slide-down"
          onClick={() => setOpen(false)} // close menu when clicking outside links
        >
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                className={({ isActive }) =>
                  `block rounded-md px-2 py-2 text-sm font-medium ${isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <button
              onClick={() => navigate("/signin", { replace: true })}
              type="button"
              className="mt-3 w-full inline-flex items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm transition"
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
