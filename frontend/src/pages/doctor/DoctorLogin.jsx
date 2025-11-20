import React, { useState } from "react";
import { useDoctorLoginMutation } from "@/redux/api/doctorApiSlice";
import { useDispatch } from "react-redux";
import { setDoctor } from "@/redux/slices/doctorSlice";
import { useNavigate } from "react-router-dom";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginDoctor, { isLoading }] = useDoctorLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginDoctor({ email, password }).unwrap();

      dispatch(setDoctor(res.data.loggedDoctor));

      navigate("/doctor/dashboard");

    } catch (err) {
      alert(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Doctor Login</h2>

        <input
          type="email"
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={isLoading}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

    </div>
  );
}

export default DoctorLogin;
