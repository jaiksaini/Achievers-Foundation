import React from "react";
import assets from "../../assets/assets";
import { useAuthStore } from "../../store/useAuthStore"

const memberIDCard = () => {

  const { member } = useAuthStore()
  // console.log(member);


  const members = {
    id: member?._id,
    name: member?.name,
    email: member?.email,
    joined: member?.joinedAt,
    avatar: member?.profilePic,
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">My membersship ID</h2>

      <div className="max-w-sm mx-auto bg-white rounded-xl shadow p-6 text-center">
        <img
          src={members.avatar}
          alt={members.name}
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-600"
        />
        <h3 className="mt-4 text-lg font-bold">{members.name}</h3>
        <p className="text-gray-600">{members.email}</p>
        <p className="mt-2 text-sm text-gray-500">
          members Since:  {new Date(members.joined).toLocaleDateString()}
        </p>

        <div className="mt-4 p-3 bg-blue-100 rounded">
          <p className="text-blue-800 font-mono">ID: {members.id}</p>
        </div>

        {/* <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Download Card
        </button> */}
      </div>
    </div>
  );
};

export default memberIDCard;
