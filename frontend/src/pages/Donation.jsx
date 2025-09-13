// import React, { useState } from "react";
// import { FaDonate, FaCreditCard, FaPaypal } from "react-icons/fa";
// import { useDonationStore } from "../store/useDonationStore";
// import { useAuthStore } from "../store/useAuthStore";


// const Donation = () => {

//   const [formData, setFormData] = useState({
//     amount: "",
//     paymentMethod: "",

//   });

//   const { user } = useAuthStore()
//   const userId = user?._id;
//   console.log(userId);

//   const { donate, isDonating } = useDonationStore()

//   const handleDonate = (e) => {
//     e.preventDefault();
//     donate(formData, userId);
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-4 md:p-8">
//       {/* Hero / Heading */}
//       <div className="text-center mb-10">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//           Support Our Mission ❤️
//         </h1>
//         <p className="mt-2 text-gray-600">
//           Your contributions help us empower education, research, and innovation.
//         </p>
//       </div>

//       {/* Donation Summary */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-md p-6 mb-10 text-center">
//         <FaDonate className="mx-auto text-4xl mb-3" />
//         <h2 className="text-xl font-semibold">Together We Make Change</h2>
//         <p className="mt-2 text-sm opacity-90">
//           Over <span className="font-bold">₹5,00,000+</span> raised to support
//           education and research programs.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Donation Form */}
//         <div className="bg-white shadow rounded-xl p-6">
//           <h2 className="text-lg font-bold text-gray-800 mb-4">
//             Make a Donation
//           </h2>
//           <form className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <input
//                 // type="text"
//                 // value={name}
//                 // onChange={(e) => setName(e.target.value)}
//                 // required
//                 className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <input
//                 // type="email"
//                 // value={email}
//                 // onChange={(e) => setEmail(e.target.value)}
//                 // required
//                 className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Donation Amount (₹)
//               </label>
//               <input
//                 type="number"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//                 className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Payment Method
//               </label>
//               <div className="flex gap-4">
//                 <button
//                   type="button"
//                   value={formData.name}
//                   onClick={(e) =>
//                     setFormData({ ...formData, name: "card" })
//                   }
//                   className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border 
//                      `}
//                 >
//                   <FaCreditCard /> Card
//                 </button>
//                 <button
//                   type="button"
//                   value={formData.name}
//                   onClick={(e) =>
//                     setFormData({ ...formData, name: "upi" })
//                   }
//                   className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border `}
//                 >
//                   <FaPaypal /> UPI
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow transition"
//               onClick={handleDonate} disabled={isDonating}
//             >
//               {isDonating ? "Processing..." : "Donate"}
//             </button>
//           </form>
//         </div>

//         {/* Recent Donors */}
//         <div className="bg-white shadow rounded-xl p-6">
//           <h2 className="text-lg font-bold text-gray-800 mb-4">
//             Recent Donors
//           </h2>
//           <ul className="space-y-3 text-sm text-gray-700">
//             <li className="flex justify-between border-b pb-2">
//               <span>John Doe</span>
//               <span className="text-blue-600 font-semibold">₹500</span>
//             </li>
//             <li className="flex justify-between border-b pb-2">
//               <span>Priya Sharma</span>
//               <span className="text-blue-600 font-semibold">₹1,000</span>
//             </li>
//             <li className="flex justify-between border-b pb-2">
//               <span>Rahul Mehta</span>
//               <span className="text-blue-600 font-semibold">₹2,500</span>
//             </li>
//             <li className="flex justify-between border-b pb-2">
//               <span>Ayesha Khan</span>
//               <span className="text-blue-600 font-semibold">₹750</span>
//             </li>
//           </ul>
//           <p className="mt-4 text-gray-500 text-xs">
//             *Thank you for supporting our mission!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Donation;


import React, { useId, useState } from "react";
import { FaDonate, FaCreditCard, FaPaypal } from "react-icons/fa";
import { useDonationStore } from "../store/useDonationStore";
import { useAuthStore } from "../store/useAuthStore";

const Donation = () => {
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
  });

  const { user } = useAuthStore();
  const userId = user?.id;
 console.log(userId);
 
  

  const { donate, isDonating } = useDonationStore();

  const handleDonate = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.paymentMethod) {
      return alert("Please enter amount and select payment method.");
    }

    donate(formData, userId);
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
          <form className="space-y-4" onSubmit={handleDonate}>
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Donation Amount (₹)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "card" })
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border ${
                    formData.paymentMethod === "card"
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  <FaCreditCard /> Card
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "upi" })
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border ${
                    formData.paymentMethod === "upi"
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  <FaPaypal /> UPI
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow transition"
              disabled={isDonating}
            >
              {isDonating ? "Processing..." : "Donate"}
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

