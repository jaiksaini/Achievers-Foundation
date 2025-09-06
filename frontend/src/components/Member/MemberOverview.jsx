import React from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const MemberOverview = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Overview</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3>Total Donations</h3>
            <p className="text-2xl font-bold">₹5,200</p>
          </div>
          <FaMoneyBillWave size={32} />
        </div>
        <div className="bg-green-600 text-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3>Membership</h3>
            <p className="text-2xl font-bold">Active</p>
          </div>
          <FaCheckCircle size={32} />
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3>Next Event</h3>
            <p className="text-2xl font-bold">Sep 15</p>
          </div>
          <FaCalendarAlt size={32} />
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
