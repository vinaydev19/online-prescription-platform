import React from "react";
import { FileText, Download, CalendarDays, Pill } from "lucide-react";

function PatientPrescription() {
  const prescriptions = [
    {
      _id: "691f2e5bccd542a1623ded6f",
      careToBeTaken:
        "Take proper rest, avoid oily food, daily walking recommended.",
      medicines: "Aspirin 75mg daily, Vitamin D supplement.",
      pdf: "https://res.cloudinary.com/vinaydev19/image/upload/v1763651168/nuik1aadifatowdvar27.pdf",
      createdAt: "2025-11-20T15:06:03.270Z",
    },
    {
      _id: "691f2e5bccd542a162dasf3ded6f",
      careToBeTaken:
        "Take proper rest, avoid oily food, daily walking recommended.",
      medicines: "Aspirin 75mg daily, Vitamin D supplement.",
      pdf: "https://res.cloudinary.com/vinaydev19/image/upload/v1763651168/nuik1aadifatowdvar27.pdf",
      createdAt: "2025-11-20T15:06:03.270Z",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Your Prescriptions
      </h1>

      {prescriptions.length === 0 ? (
        <p className="text-gray-600 text-lg">No prescriptions found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {prescriptions.map((pres) => (
            <div
              key={pres._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText size={22} className="text-blue-600" />
                <h2 className="text-xl font-semibold">Prescription</h2>
              </div>

              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <CalendarDays size={18} />
                <span>
                  {new Date(pres.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>

              <div className="mb-4">
                <label className="font-semibold flex items-center gap-2">
                  <Pill size={18} />
                  Medicines
                </label>
                <p className="text-gray-700 mt-1">{pres.medicines}</p>
              </div>

              <div className="mb-4">
                <label className="font-semibold">Care To Be Taken</label>
                <p className="text-gray-700 mt-1">{pres.careToBeTaken}</p>
              </div>

              <a
                href={pres.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-fit mt-3"
              >
                <Download size={18} />
                Download PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientPrescription;
