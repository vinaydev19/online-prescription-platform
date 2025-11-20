import React from "react";
import { useGetPatientPrescriptionsQuery } from "@/redux/api/patientApiSlice";

function PatientPrescription() {
  const { data, isLoading } = useGetPatientPrescriptionsQuery();

  if (isLoading) return <p>Loading...</p>;

  const prescriptions = data?.data?.prescriptions || [];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Your Prescriptions</h1>

      {prescriptions.length === 0 && (
        <p className="text-gray-600 mt-3">No prescriptions found.</p>
      )}

      <ul className="mt-4 space-y-2">
        {prescriptions.map((p) => (
          <li key={p._id} className="bg-white p-4 rounded shadow border">
            <p><strong>Care:</strong> {p.careToBeTaken}</p>
            <p><strong>Medicines:</strong> {p.medicines}</p>

            {p.pdf && (
              <a
                href={Buffer.from(p.pdf.data).toString("utf8")}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline mt-2 inline-block"
              >
                Download PDF
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientPrescription;
