import React, { useState } from "react";
import { FaDonate, FaCreditCard, FaPaypal } from "react-icons/fa";

const Donation = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("card");

  const handleDonate = (e) => {
    e.preventDefault();
    alert(`Thank you ${name}! Your donation of ₹${amount} was received.`);
    setAmount("");
    setName("");
    setEmail("");
    setMethod("card");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Hero / Heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Support Our Mission ❤️
        </h1>
        <p className="mt-2 text-gray-600">
          Your contributions help us empower education, research, and innovation.
        </p>
      </div>

      {/* Donation Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-md p-6 mb-10 text-center">
        <FaDonate className="mx-auto text-4xl mb-3" />
        <h2 className="text-xl font-semibold">Together We Make Change</h2>
        <p className="mt-2 text-sm opacity-90">
          Over <span className="font-bold">₹5,00,000+</span> raised to support
          education and research programs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Donation Form */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Make a Donation
          </h2>
          <form onSubmit={handleDonate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Donation Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border ${
                    method === "card"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <FaCreditCard /> Card
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("paypal")}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border ${
                    method === "paypal"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <FaPaypal /> Paypal
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow transition"
            >
              Donate Now
            </button>
          </form>
        </div>

        {/* Recent Donors */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Recent Donors
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex justify-between border-b pb-2">
              <span>John Doe</span>
              <span className="text-blue-600 font-semibold">₹500</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Priya Sharma</span>
              <span className="text-blue-600 font-semibold">₹1,000</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Rahul Mehta</span>
              <span className="text-blue-600 font-semibold">₹2,500</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Ayesha Khan</span>
              <span className="text-blue-600 font-semibold">₹750</span>
            </li>
          </ul>
          <p className="mt-4 text-gray-500 text-xs">
            *Thank you for supporting our mission!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donation;
