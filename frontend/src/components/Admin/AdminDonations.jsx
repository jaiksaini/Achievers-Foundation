import React, { useState } from "react";
import {
  FaFileDownload,
  FaMoneyBillWave,
  FaClock,
  FaDonate,
  FaSearch,
} from "react-icons/fa";

const AdminDonations = () => {
  const [donations] = useState([
    {
      id: 1,
      donor: "John Doe",
      email: "john@example.com",
      amount: 100,
      date: "2025-09-01",
      receipt: "#REC1001",
    },
    {
      id: 2,
      donor: "Jane Smith",
      email: "jane@example.com",
      amount: 250,
      date: "2025-09-02",
      receipt: "#REC1002",
    },
    {
      id: 3,
      donor: "Mike Johnson",
      email: "mike@example.com",
      amount: 75,
      date: "2025-09-03",
      receipt: "#REC1003",
    },
    {
      id: 4,
      donor: "Emily Brown",
      email: "emily@example.com",
      amount: 150,
      date: "2025-09-04",
      receipt: "#REC1004",
    },
    {
      id: 5,
      donor: "David Wilson",
      email: "david@example.com",
      amount: 500,
      date: "2025-09-05",
      receipt: "#REC1005",
    },
    {
      id: 6,
      donor: "Sophia Taylor",
      email: "sophia@example.com",
      amount: 300,
      date: "2025-09-06",
      receipt: "#REC1006",
    },
  ]);

  const [search, setSearch] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const donationsPerPage = 5;

  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.donor.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase());

    const matchesAmount =
      (minAmount === "" || d.amount >= Number(minAmount)) &&
      (maxAmount === "" || d.amount <= Number(maxAmount));

    const matchesDate =
      (startDate === "" || new Date(d.date) >= new Date(startDate)) &&
      (endDate === "" || new Date(d.date) <= new Date(endDate));

    return matchesSearch && matchesAmount && matchesDate;
  });

  // Pagination logic
  const indexOfLast = currentPage * donationsPerPage;
  const indexOfFirst = indexOfLast - donationsPerPage;
  const currentDonations = filteredDonations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredDonations.length / donationsPerPage);

  const totalAmount = filteredDonations.reduce((sum, d) => sum + d.amount, 0);
  const recentDonations = filteredDonations.slice(-3);

  const downloadReceipt = (receiptId) => {
    alert("Downloading receipt: " + receiptId);
  };

  return (
    <div className="p-2 space-y-6">
      <h2 className="text-2xl font-bold">Donations</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
          <FaDonate className="text-blue-600 text-3xl" />
          <div>
            <p className="text-gray-500">Total Donations</p>
            <p className="text-xl font-bold">{filteredDonations.length}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
          <FaClock className="text-green-600 text-3xl" />
          <div>
            <p className="text-gray-500">Recent Donations</p>
            <p className="text-xl font-bold">{recentDonations.length}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
          <FaMoneyBillWave className="text-yellow-600 text-3xl" />
          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="text-xl font-bold">₹{totalAmount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search donor or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 pl-10 rounded w-full"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          className="border p-2 rounded w-full md:w-40"
        />
        <input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="border p-2 rounded w-full md:w-40"
        />

        <div>
          <span className="pr-1">from:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded w-full md:w-40"
          />
        </div>
        <div>
          <span className="pr-1">to:</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded w-full md:w-40"
          />
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Donor</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {currentDonations.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{d.donor}</td>
                <td className="p-3 border-b">{d.email}</td>
                <td className="p-3 border-b font-semibold text-green-600">
                  ₹{d.amount}
                </td>
                <td className="p-3 border-b">{d.date}</td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => downloadReceipt(d.receipt)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-2"
                  >
                    <FaFileDownload /> Download
                  </button>
                </td>
              </tr>
            ))}
            {currentDonations.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden grid gap-4">
        {currentDonations.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded shadow p-4 flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">{d.donor}</p>
              <p className="text-green-600 font-bold">₹{d.amount}</p>
            </div>
            <p className="text-sm text-gray-500">{d.email}</p>
            <p className="text-sm text-gray-400">{d.date}</p>
            <button
              onClick={() => downloadReceipt(d.receipt)}
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center gap-2 justify-center"
            >
              <FaFileDownload /> Download Receipt
            </button>
          </div>
        ))}
        {currentDonations.length === 0 && (
          <p className="text-center text-gray-500">No donations found.</p>
        )}
      </div>

      {filteredDonations.length > donationsPerPage && (
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

export default AdminDonations;
