import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";

const AdminSetting = () => {
  const [profilePic, setProfilePic] = useState("#");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePic(imageURL);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Admin Settings</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>

          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
              <label
                htmlFor="profilePicUpload"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700"
              >
                <FaCamera />
              </label>
              <input
                type="file"
                id="profilePicUpload"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Change Profile Picture</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <div className="flex items-center border rounded px-3">
                <FaUser className="text-gray-400 mr-2" />
                <input type="text" className="w-full p-2 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="flex items-center border rounded px-3">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input type="email" className="w-full p-2 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="flex items-center border rounded px-3">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full p-2 outline-none"
                />
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;
