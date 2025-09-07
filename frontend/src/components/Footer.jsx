import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            AAEAR Foundation
          </h2>
          <p className="text-sm">
            Academics Achievers Education and Research Foundation is committed
            to advancing education, research, and innovation for a brighter
            tomorrow.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="hover:text-white">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-white">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/members" className="hover:text-white">
                  Members
                </NavLink>
              </li>
              {/* <li>
              <NavLink to="/projects" className="hover:text-white">Projects</NavLink>
            </li> */}
              <li>
                <NavLink to="/documents" className="hover:text-white">
                  Documents
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/donation" className="hover:text-white">
                  Donate
                </NavLink>
              </li>
              <li>
                <NavLink to="/joinus" className="hover:text-white">
                  Become a Member
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-white">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/documents" className="hover:text-white">
                  Licenses
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <p className="text-sm mb-1">📍 New Delhi, India</p>
          <p className="text-sm mb-1">📧 info@aaearfoundation.org</p>
          <p className="text-sm">📞 +91 9999 99999</p>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="my-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} AAEAR Foundation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
