import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import asstes from "../assets/assets";

const Members = () => {
  const navigate = useNavigate();
  const [members] = useState([
    {
      id: 1,
      name: "Jay",
      role: "Volunteer",
      avatar: asstes.user,
    },
    {
      id: 2,
      name: "Vinay",
      role: "Coordinator",
      avatar: asstes.user,
    },
    {
      id: 3,
      name: "Kartik",
      role: "Member",
      avatar: asstes.user,
    },
    {
      id: 4,
      name: "Jay",
      role: "Supporter",
      avatar: asstes.user,
    },
    {
      id: 5,
      name: "Vinay",
      role: "Volunteer",
      avatar: asstes.user,
    },
    {
      id: 6,
      name: "Kartik",
      role: "Coordinator",
      avatar: asstes.user,
    },
    {
      id: 7,
      name: "Jay",
      role: "Member",
      avatar: asstes.user,
    },
    {
      id: 8,
      name: "Vinay",
      role: "Supporter",
      avatar: asstes.user,
    },
    {
      id: 9,
      name: "Kartik",
      role: "Volunteer",
      avatar: asstes.user,
    },
    {
      id: 10,
      name: "Jay",
      role: "Coordinator",
      avatar: asstes.user,
    },
    {
      id: 11,
      name: "Vinay",
      role: "Member",
      avatar: asstes.user,
    },
    {
      id: 12,
      name: "Kartik",
      role: "Supporter",
      avatar: asstes.user,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="text-center py-12 px-4 bg-[#fef3c7] text-black">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Meet Our Members
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          Our NGO family is growing with passionate individuals who are
          dedicated to making a difference. Join us and become part of our
          community today!
        </p>
        <button
          onClick={() => navigate("/joinus")}
          className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-800 hover:text-white transition"
        >
          Become Member
        </button>
      </section>

      <section className="p-6 md:p-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Our Active Members
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-center"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-100"
              />
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Want to be part of this amazing journey?
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 mb-6">
          By becoming a member, you can contribute to meaningful causes, join
          events, and work together for a brighter future.
        </p>
        <button
          onClick={() => navigate("/joinus")}
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black hover:border transition"
        >
          Become Member
        </button>
      </section>
    </div>
  );
};

export default Members;
