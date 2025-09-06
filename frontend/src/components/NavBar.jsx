import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className=" top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={assets.logo}
            alt="Academics Achievers Foundation"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="flex flex-col leading-none">
            <span className="text-xs font-semibold tracking-wide uppercase">
              Achievers
            </span>
            <span className="text-[10px] text-gray-500">
              Education and Research Foundation
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Home
          </NavLink>
          <NavLink
            to="/members"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Members
          </NavLink>
          <NavLink
            to="/documents"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Documents
          </NavLink>
          <NavLink
            to="/about"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            About us
          </NavLink>
          <NavLink
            to="contact"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Contact us
          </NavLink>
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => navigate("/signin", { replace: true })}
            type="button"
            className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Sign in
          </button>
        </div>

        {/* Mobile  */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Toggle navigation"
          aria-expanded={open}
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

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-4 py-3 space-y-2">
            {["Home", "Members", "Documents", "About us", "Contact us"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="block rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  {item}
                </a>
              )
            )}
            <button
              onClick={() => navigate("/signin", { replace: true })}
              type="button"
              className="mt-2 w-full inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
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
