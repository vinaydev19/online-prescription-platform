import { useDoctorLoginMutation } from "@/store/api/doctorApiSlice";
import { getDoctor } from "@/store/slices/doctorSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function DoctorLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [doctorLogin, { isLoading }] = useDoctorLoginMutation();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await doctorLogin(formData).unwrap();
      toast.success("Login successful");
      console.log("API Response:", res);
      navigate('/doctor/consultations')
      dispatch(getDoctor(res.data.loggedDoctor));
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error?.data?.message || "Login failed");
    }
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
