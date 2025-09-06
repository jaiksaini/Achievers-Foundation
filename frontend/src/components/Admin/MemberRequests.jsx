import React, { useState } from "react";
import { Link } from "react-router-dom";

const MemberRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
      id: 2,
      name: "Sarah Lee",
      email: "sarah@example.com",
      avatar: "https://i.pravatar.cc/40?img=6",
    },
    {
      id: 3,
      name: "Sarah Lee",
      email: "sarah@example.com",
      avatar: "https://i.pravatar.cc/40?img=6",
    },
  ]);

  const approveRequest = (id) => {
    alert("✅ Approved request for user ID: " + id);
    setRequests(requests.filter((r) => r.id !== id));
  };

  const rejectRequest = (id) => {
    alert("❌ Rejected request for user ID: " + id);
    setRequests(requests.filter((r) => r.id !== id));
  };

  return (
    <div className="p-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Membership Requests
        </h2>
        <Link
          to="/admin/members"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-700 transition"
        >
          Manage Members
        </Link>
      </div>

      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <th className="p-4 text-left rounded-tl-lg">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr
                key={req.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={req.avatar}
                    alt={req.name}
                    className="w-10 h-10 rounded-full object-cover shadow"
                  />
                  <span className="font-medium text-gray-800">{req.name}</span>
                </td>
                <td className="p-4 text-gray-600">{req.email}</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => approveRequest(req.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectRequest(req.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-6 text-gray-500 italic"
                >
                  No pending requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden grid gap-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={req.avatar}
                alt={req.name}
                className="w-12 h-12 rounded-full object-cover shadow"
              />
              <div>
                <p className="font-semibold text-gray-800">{req.name}</p>
                <p className="text-sm text-gray-500">{req.email}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                onClick={() => approveRequest(req.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full sm:w-auto"
              >
                Approve
              </button>
              <button
                onClick={() => rejectRequest(req.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full sm:w-auto"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
        {requests.length === 0 && (
          <p className="text-center text-gray-500 italic">
            No pending requests.
          </p>
        )}
      </div>
    </div>
  );
};

export default MemberRequests;
