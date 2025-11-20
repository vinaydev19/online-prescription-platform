import { useDoctorSignupMutation } from "@/store/api/doctorApiSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DoctorSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    phoneNumber: "",
    yearsOfExperience: "",
    password: "",
    profilePicture: null
  });

  const [doctorSignup, { isLoading }] = useDoctorSignupMutation();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("specialty", formData.specialty);
    submitData.append("phoneNumber", formData.phoneNumber);
    submitData.append("yearsOfExperience", formData.yearsOfExperience);
    submitData.append("password", formData.password);
    submitData.append("profilePicture", formData.profilePicture);

    try {
      const res = await doctorSignup(submitData).unwrap();
      toast.success("Signup successful");
      console.log("Signup response:", res);
      navigate('/doctor/login')
    } catch (error) {
      console.error("Signup failed", error);
      toast.error(error?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Doctor Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="font-medium">Specialty</label>
              <input
                type="text"
                name="specialty"
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg"
                placeholder="e.g. Cardiologist"
              />
            </div>

            <div>
              <label className="font-medium">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="font-medium">Years of Experience</label>
              <input
                type="number"
                name="yearsOfExperience"
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg"
                placeholder="5"
              />
            </div>

            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg"
                placeholder="Create password"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Signup
          </button>

          <p className="text-center mt-2 text-gray-600">
            Already have an account?
            <a href="/doctor/login" className="text-blue-600 font-semibold ml-1">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default DoctorSignup;
