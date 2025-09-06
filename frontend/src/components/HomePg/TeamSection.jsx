import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

const teamMembers = [
  {
    name: "Jay",
    role: "Founder",
    img: assets.ngo,
  },
  {
    name: "Vinay",
    role: "Director",
    img: assets.ngo,
  },
  {
    name: "Kartik",
    role: "Board Of Directors",
    img: assets.ngo,
  },
];

const TeamSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 px-4 md:px-12 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Team</h2>
      <p className="text-gray-600 mb-6">
        Meet our Members of professionals to serve you
      </p>

      <div className="flex justify-center gap-4 mb-10">
        <button
          className="bg-purple-800 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-900 transition"
          onClick={() => navigate("/about")}
        >
          About us
        </button>
        <button
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600 font-medium mb-3">{member.role}</p>

              <div className="flex justify-center gap-4 text-gray-500">
                <a href="#" className="hover:text-blue-600">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-pink-500">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-sky-500">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
