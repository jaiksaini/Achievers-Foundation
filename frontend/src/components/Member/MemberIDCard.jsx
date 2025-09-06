import React from "react";
import assets from "../../assets/assets";

const MemberIDCard = () => {
  const member = {
    id: "NGO-2025-123",
    name: "J K saini",
    email: "jay@example.com",
    joined: "20-05-2025",
    avatar: assets.user,
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">My Membership ID</h2>

      <div className="max-w-sm mx-auto bg-white rounded-xl shadow p-6 text-center">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-600"
        />
        <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
        <p className="text-gray-600">{member.email}</p>
        <p className="mt-2 text-sm text-gray-500">
          Member Since: {member.joined}
        </p>

        <div className="mt-4 p-3 bg-blue-100 rounded">
          <p className="text-blue-800 font-mono">ID: {member.id}</p>
        </div>

        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Download Card
        </button>
      </div>
    </div>
  );
};

export default MemberIDCard;
