import React from "react";

const MemberNotifications = () => {
  const notifications = [
    {
      id: 1,
      msg: "Your donation receipt for ₹1000 is available.",
      date: "2025-08-12",
    },
    {
      id: 2,
      msg: "Upcoming event: Health Camp on Sep 15.",
      date: "2025-08-10",
    },
    { id: 3, msg: "Membership renewed successfully!", date: "2025-07-25" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Notifications</h2>
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <p>{n.msg}</p>
            <span className="text-gray-500 text-sm">{n.date}</span>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="text-center text-gray-500">No notifications yet.</p>
        )}
      </div>
    </div>
  );
};

export default MemberNotifications;
