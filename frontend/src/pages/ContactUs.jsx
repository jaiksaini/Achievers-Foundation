import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="py-12 min-h-screen px-6 md:px-16 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Contact Us</h2>
        <br />
        <p className="text-gray-600 mt-2">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <p className="text-gray-600 mb-6">
            Say something to start a live chat!
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <FaPhoneAlt className="text-lg" />
              <a
                href="tel:+919026470888"
                title="+91 90264 70888"
                className="hover:text-black"
              >
                +91 90264 70888
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-lg" />
              <span
                className="truncate max-w-[220px] md:max-w-xs hover:text-black hover:underline cursor-pointer"
                title="academicsachieversfoundation@gmail.com"
                href="mailto:academicsachieversfoundation@gmail.com"
              >
                academicsachieversfoundation@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-lg" />
              <span>
                Umrapur, Ibrahimpur, Raebareli 229212, Uttar Pradesh, India
              </span>
            </div>
          </div>

          <div className="flex gap-5 mt-8 text-gray-600">
            <a href="#" className="hover:text-black">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-black">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-black">
              <FaDiscord size={20} />
            </a>
          </div>
        </div>

        <form className="space-y-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="4"
              className="mt-1 w-full border-b border-gray-300 focus:border-black outline-none py-2"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="absolute right-0 bottom-0 flex px-6 py-3 bg-black text-white rounded-lg shadow-md hover:opacity-90 transition "
          >
            Send Message
          </button>
          <button className="flex px-6 mt-10 py-3 bg-white text-white">
            &nbsp; &nbsp; &nbsp;
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
