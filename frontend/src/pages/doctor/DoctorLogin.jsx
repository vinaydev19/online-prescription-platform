import React, { useState } from "react";

function DoctorLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Login Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Doctor Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>

          <p className="text-center mt-2 text-gray-600">
            Don't have an account?
            <a
              href="/doctor/signup"
              className="text-blue-600 font-semibold ml-1"
            >
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default DoctorLogin;
