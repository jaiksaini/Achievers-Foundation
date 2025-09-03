import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <p className="font-semibold">Stay informed</p>
            <p className="mt-2 text-sm">
              Stay informed about our latest features and releases by joining our newsletter.
            </p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-2 rounded-l-md text-white bg-gray-800 focus:outline-none"
              />
              <button className="bg-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-600">
                Subscribe
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Column One</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>About Us</li>
              <li>Our Impact</li>
              <li>Get Involved</li>
              <li>Contact Us</li>
              <li>Donate</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Column Two</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Link Six</li>
              <li>Link Seven</li>
              <li>Link Eight</li>
              <li>Link Nine</li>
              <li>Link Ten</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Follow us</h3>
            <div className="mt-4 flex space-x-4 text-xl">
              <a href="#" className="hover:text-white"><FaFacebook /></a>
              <a href="#" className="hover:text-white"><FaInstagram /></a>
              <a href="#" className="hover:text-white"><FaTwitter /></a>
              <a href="#" className="hover:text-white"><FaLinkedin /></a>
              <a href="#" className="hover:text-white"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          © 2025 Achievers-Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
