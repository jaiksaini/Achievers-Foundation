import React from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";

const EmailVerification = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <FaEnvelopeOpenText className="text-blue-600 text-5xl" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We’ve sent a 6-digit verification code to your email. Please enter the
          code below to verify your account.
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit code"
            maxLength={6}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Verify Email
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Didn’t receive the email?{" "}
          <button className="text-blue-600 font-semibold hover:underline">
            Resend Email
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
