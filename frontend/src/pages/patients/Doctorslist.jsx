import React from "react";
import { useGetAllDoctorsQuery } from "@/redux/api/patientApiSlice";
import { Link } from "react-router-dom";

function Doctorslist() {
  const { data, isLoading } = useGetAllDoctorsQuery();

  if (isLoading) return <p>Loading...</p>;

  const doctors = data?.data?.doctors || [];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Available Doctors</h1>

      <div className="grid grid-cols-3 gap-4">
        {doctors.map((doc) => (
          <div key={doc._id} className="border p-4 rounded shadow bg-white">

            <img src={doc.profilePicture} className="h-32 w-32 object-cover rounded mb-2" />

            <h3 className="text-lg font-semibold">{doc.name}</h3>
            <p className="text-gray-600">{doc.specialty}</p>

            <Link
              to={`/patient/consultation/${doc._id}`}
              className="bg-blue-600 text-white px-4 py-2 mt-3 inline-block rounded"
            >
              Consult
            </Link>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Doctorslist;
