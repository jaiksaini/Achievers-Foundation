import React from 'react'

const UserOverview = () => {
 return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Total Donations</h3>
          <p className="text-2xl font-bold text-blue-600">₹ 15,000</p>
        </div>
        
      </div>
    </div>
  );
};

export default UserOverview
