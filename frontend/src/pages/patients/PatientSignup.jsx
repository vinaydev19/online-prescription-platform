import React, { useState } from "react";
import { usePatientSignupMutation } from "@/redux/api/patientApiSlice";
import { useNavigate } from "react-router-dom";

function PatientSignup() {
  const [signupPatient, { isLoading }] = usePatientSignupMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    phoneNumber: "",
    password: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((k) => fd.append(k, form[k]));
    fd.append("profilePicture", profilePicture);

    try {
      await signupPatient(fd).unwrap();
      alert("Signup successful");
      navigate("/patient/login");

    } catch (err) {
      alert(err?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form className="bg-white p-6 rounded shadow w-[500px]" onSubmit={submit}>

        <h2 className="text-2xl font-semibold mb-4 text-center">Patient Signup</h2>

        <input name="name" placeholder="Name" onChange={change} className="border p-2 w-full mb-3" />
        <input name="email" placeholder="Email" onChange={change} className="border p-2 w-full mb-3" />
        <input name="age" placeholder="Age" onChange={change} className="border p-2 w-full mb-3" />
        <input name="phoneNumber" placeholder="Phone Number" onChange={change} className="border p-2 w-full mb-3" />
        <input name="password" placeholder="Password" type="password" onChange={change} className="border p-2 w-full mb-3" />

        <label>Profile Picture</label>
        <input type="file" className="border p-2 w-full mb-4"
          onChange={(e) => setProfilePicture(e.target.files[0])} />

        <button className="bg-green-600 text-white py-2 w-full rounded" disabled={isLoading}>
          {isLoading ? "Creating..." : "Signup"}
        </button>

      </form>

    </div>
  );
}

export default PatientSignup;
