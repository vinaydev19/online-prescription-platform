import React from "react";
import { Link } from "react-router-dom";

function Doctorslist() {
  const doctors = [
    {
      _id: 1,
      name: "Dr. Rahul Sharma",
      specialty: "Cardiologist",
      image: "https://via.placeholder.com/120",
    },
    {
      _id: 2,
      name: "Dr. Meera Kapoor",
      specialty: "Dermatologist",
      image: "https://via.placeholder.com/120",
    },
    {
      _id: 3,
      name: "Dr. Arjun Patel",
      specialty: "Orthopedic Surgeon",
      image: "https://via.placeholder.com/120",
    },
    {
      _id: 4,
      name: "Dr. Kavita Nair",
      specialty: "Neurologist",
      image: "https://via.placeholder.com/120",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
        Available Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-28 h-28 rounded-full object-cover border border-gray-300"
            />

            <h2 className="text-xl font-semibold mt-4">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialty}</p>

            <Link to={`/patient/consultation/${doctor._id}`}>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Consult
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctorslist;
