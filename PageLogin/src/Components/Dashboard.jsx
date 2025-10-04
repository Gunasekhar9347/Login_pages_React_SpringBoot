import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/register"); // redirects to Register page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <div className="flex justify-end p-4 bg-gray-200 shadow-md">
        <button
          onClick={handleRegisterRedirect}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Register
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-3xl font-bold mb-6">Welcome! You are logged in.</h1>
        <p className="text-gray-700">Use the top button to go to the Register page.</p>
      </div>
    </div>
  );
}