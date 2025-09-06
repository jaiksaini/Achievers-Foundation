import React, { useState } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminMembers = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "Member",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Member",
      email: "jane@example.com",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Member",
      email: "mike@example.com",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
      id: 4,
      name: "Emily Brown",
      role: "Member",
      email: "emily@example.com",
      avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
      id: 5,
      name: "David Wilson",
      role: "Member",
      email: "david@example.com",
      avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
      id: 6,
      name: "Sophia Taylor",
      role: "Member",
      email: "sophia@example.com",
      avatar: "https://i.pravatar.cc/40?img=6",
    },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;

  const removeMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  return (
    <div className="md:p-2 min-h-[78vh]">
      {/* Header with Search + Requests */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">All Members</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 pl-10 rounded w-full"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* View Requests Button */}
          <Link
            to="/admin/members/requests"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-700"
          >
            View Requests
          </Link>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <th className="p-4 text-left rounded-tl-lg">Name</th>
              <th className="p-4 text-left ">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((member, index) => (
              <tr
                key={member.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover shadow"
                  />
                  <span className="font-medium text-gray-800">
                    {" "}
                    {member.name}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{member.email}</td>
                <td className="p-4 text-gray-600">{member.role}</td>
                <td className="p-4 text-center space-x-2">
                  <button
                    onClick={() => removeMember(member.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <FaTrash /> Remove
                  </button>
                </td>
              </tr>
            ))}
            {currentMembers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid gap-4">
        {currentMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded shadow p-4 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{member.role}</span>
              <button
                onClick={() => removeMember(member.id)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}
        {currentMembers.length === 0 && (
          <p className="text-center text-gray-500">No members found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredMembers.length > membersPerPage && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminMembers;
