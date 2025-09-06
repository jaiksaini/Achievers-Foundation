import React, { useState } from "react";

const MemberDonationHistory = () => {
  const [donations] = useState([
    { id: 1, date: "2025-08-10", amount: 1000, method: "UPI" },
    { id: 2, date: "2025-07-15", amount: 500, method: "Card" },
    { id: 3, date: "2025-06-20", amount: 750, method: "NetBanking" },
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">My Donation History</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.date}</td>
                <td className="p-3">₹{d.amount}</td>
                <td className="p-3">{d.method}</td>
                <td className="p-3">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Download
                  </button>
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-4 text-gray-500 italic"
                >
                  No donations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberDonationHistory;
