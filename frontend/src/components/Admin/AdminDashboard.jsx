import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const donationData = [
  { month: "Jan", amount: 1500 },
  { month: "Feb", amount: 2200 },
  { month: "Mar", amount: 2800 },
  { month: "Apr", amount: 2600 },
  { month: "May", amount: 3500 },
  { month: "Jun", amount: 4200 },
  { month: "Jul", amount: 3100 },
  { month: "Aug", amount: 4000 },
  { month: "Sep", amount: 3700 },
  { month: "Oct", amount: 3300 },
  { month: "Nov", amount: 4500 },
  { month: "Dec", amount: 4700 },
];

const recentDonations = [
  { donor: "Emma Brown", amount: "$200", date: "2024-04-10" },
  { donor: "James Johnson", amount: "$150", date: "2024-04-09" },
  { donor: "Olivia Williams", amount: "$100", date: "2024-04-08" },
  { donor: "Michael Smith", amount: "$250", date: "2024-04-07" },
];

const AdminDashboard = () => {
  return (
    <main className="flex-1 md:2 min-h-[78vh] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Donation Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-2 md:mt-0">
          Welcome back, Admin 👋
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Donations</h2>
          <p className="text-3xl font-extrabold text-blue-600">$25,350</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Funds Raised</h2>
          <p className="text-3xl font-extrabold text-green-600">$60,000</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">New Donors</h2>
          <p className="text-3xl font-extrabold text-purple-600">120</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Active Projects</h2>
          <p className="text-3xl font-extrabold text-orange-500">12</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Donation Overview
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={donationData}>
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="amount" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Donations
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3">Donor</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-3">{donation.donor}</td>
                    <td className="py-3 font-semibold">{donation.amount}</td>
                    <td className="py-3">{donation.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
