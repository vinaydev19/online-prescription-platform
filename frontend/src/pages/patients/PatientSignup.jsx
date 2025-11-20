import { usePatientSignupMutation } from "@/store/api/patientApiSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PatientSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phoneNumber: "",
    password: "",
    profilePicture: null,
    historyOfSurgery: [{ surgeryName: "", surgeryDate: "", notes: "" }],
    historyOfIllness: [{ illnessName: "", diagnosisDate: "", notes: "" }],
  });

  const [patientSignup, { isLoading }] = usePatientSignupMutation();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const addSurgery = () => {
    setFormData({
      ...formData,
      historyOfSurgery: [
        ...formData.historyOfSurgery,
        { surgeryName: "", surgeryDate: "", notes: "" },
      ],
    });
  };

  const removeSurgery = (index) => {
    const updated = formData.historyOfSurgery.filter((_, i) => i !== index);
    setFormData({ ...formData, historyOfSurgery: updated });
  };

  const handleSurgeryChange = (index, field, value) => {
    const updated = [...formData.historyOfSurgery];
    updated[index][field] = value;
    setFormData({ ...formData, historyOfSurgery: updated });
  };

  const addIllness = () => {
    setFormData({
      ...formData,
      historyOfIllness: [
        ...formData.historyOfIllness,
        { illnessName: "", diagnosisDate: "", notes: "" },
      ],
    });
  };

  const removeIllness = (index) => {
    const updated = formData.historyOfIllness.filter((_, i) => i !== index);
    setFormData({ ...formData, historyOfIllness: updated });
  };

  const handleIllnessChange = (index, field, value) => {
    const updated = [...formData.historyOfIllness];
    updated[index][field] = value;
    setFormData({ ...formData, historyOfIllness: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();

    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("age", formData.age);
    submitData.append("phoneNumber", formData.phoneNumber);
    submitData.append("password", formData.password);
    submitData.append("profilePicture", formData.profilePicture);

    submitData.append(
      "historyOfSurgery",
      JSON.stringify(formData.historyOfSurgery)
    );

    submitData.append(
      "historyOfIllness",
      JSON.stringify(formData.historyOfIllness)
    );

    console.log("submit", submitData);


    try {
      const res = await patientSignup(submitData).unwrap();
      toast.success("Patient Signup Successful!");
      console.log("Signup Response:", res);
      navigate('patient/login')
    } catch (err) {
      toast.error(err?.data?.message || "Signup failed");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Patient Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                placeholder="Enter full name"
              />
            </div>

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
              <label className="font-medium">Age</label>
              <input
                type="number"
                name="age"
                required
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <div>
              <label className="font-medium">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                required
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="Create password"
            />
          </div>

          <div>
            <label className="font-medium">Profile Picture</label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">History of Surgery</h3>
              <button
                type="button"
                onClick={addSurgery}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                + Add
              </button>
            </div>

            {formData.historyOfSurgery.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-2 mb-2 items-center"
              >
                <input
                  type="text"
                  placeholder="Surgery Name"
                  className="border p-2 rounded"
                  onChange={(e) =>
                    handleSurgeryChange(index, "surgeryName", e.target.value)
                  }
                />
                <input
                  type="date"
                  className="border p-2 rounded"
                  onChange={(e) =>
                    handleSurgeryChange(index, "surgeryDate", e.target.value)
                  }
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Notes"
                    className="border p-2 rounded flex-1"
                    onChange={(e) =>
                      handleSurgeryChange(index, "notes", e.target.value)
                    }
                  />
                  {formData.historyOfSurgery.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSurgery(index)}
                      className="px-3 bg-red-600 text-white rounded"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">History of Illness</h3>
              <button
                type="button"
                onClick={addIllness}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                + Add
              </button>
            </div>

            {formData.historyOfIllness.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-2 mb-2 items-center"
              >
                <input
                  type="text"
                  placeholder="Illness Name"
                  className="border p-2 rounded"
                  onChange={(e) =>
                    handleIllnessChange(index, "illnessName", e.target.value)
                  }
                />
                <input
                  type="date"
                  className="border p-2 rounded"
                  onChange={(e) =>
                    handleIllnessChange(index, "diagnosisDate", e.target.value)
                  }
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Notes"
                    className="border p-2 rounded flex-1"
                    onChange={(e) =>
                      handleIllnessChange(index, "notes", e.target.value)
                    }
                  />
                  {formData.historyOfIllness.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIllness(index)}
                      className="px-3 bg-red-600 text-white rounded"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Signup
          </button>

          <p className="text-center text-gray-600 mt-2">
            Already have an account?{" "}
            <a href="/patient/login" className="text-blue-600 font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default PatientSignup;
