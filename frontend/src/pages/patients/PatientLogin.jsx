import React, { useState } from "react";
import { usePatientLoginMutation } from "@/redux/api/patientApiSlice";
import { useDispatch } from "react-redux";
import { setPatient } from "@/redux/slices/patientSlice";
import { useNavigate } from "react-router-dom";

function PatientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginPatient, { isLoading }] = usePatientLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginPatient({ email, password }).unwrap();

      dispatch(setPatient(res.data.loggedPatient));
      navigate("/patient/doctors");

    } catch (err) {
      alert(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form className="bg-white p-6 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-2xl font-semibold text-center mb-4">Patient Login</h2>

        <input className="border p-2 w-full mb-3" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="border p-2 w-full mb-4" type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="bg-blue-600 text-white w-full py-2 rounded" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

    </div>
  );
}

export default PatientLogin;
