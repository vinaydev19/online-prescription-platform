import React, { useState } from "react";
import { useDoctorSignupMutation } from "@/redux/api/doctorApiSlice";
import { useNavigate } from "react-router-dom";

function DoctorSignup() {
  const [signupDoctor, { isLoading }] = useDoctorSignupMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    specialty: "",
    phoneNumber: "",
    yearsOfExperience: "",
    password: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.keys(form).forEach((key) => {
      fd.append(key, form[key]);
    });

    fd.append("profilePicture", profilePicture);

    try {
      await signupDoctor(fd).unwrap();
      alert("Signup successful");
      navigate("/doctor/login");
    } catch (err) {
      alert(err?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-[500px]"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Doctor Signup</h2>

        <input name="name" placeholder="Name" className="border p-2 w-full mb-3" onChange={handleChange} />
        <input name="email" placeholder="Email" className="border p-2 w-full mb-3" onChange={handleChange} />
        <input name="specialty" placeholder="Specialty" className="border p-2 w-full mb-3" onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" className="border p-2 w-full mb-3" onChange={handleChange} />
        <input name="yearsOfExperience" placeholder="Experience (e.g. 1.5)" className="border p-2 w-full mb-3" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-3" onChange={handleChange} />

        <label className="font-medium">Profile Picture</label>
        <input
          type="file"
          className="border p-2 w-full mb-4"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />

        <button
          disabled={isLoading}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          {isLoading ? "Creating..." : "Signup"}
        </button>
      </form>

    </div>
  );
}

export default DoctorSignup;
