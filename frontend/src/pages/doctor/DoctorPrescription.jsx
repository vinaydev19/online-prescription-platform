import React, { useState } from "react";
import {
  FileText,
  Edit,
  Trash2,
  Download,
  X,
  ClipboardEdit,
  PlusCircle,
} from "lucide-react";

function DoctorPrescription() {

  const mockPrescriptions = [
    {
      _id: "691f2e1accd542a1623ded69",
      patientName: "Alice Johnson",
      patientId: "691f29cedbc89041a41da49a",
      consultationFormId: "691f2b2464af4af7ad197cec",
      careToBeTaken: "Avoid junk food and stress. Take proper rest.",
      medicines: "Aspirin 75mg, Vitamin D, Omega 3 capsule.",
      createdAt: "2025-11-20T15:04:58.267Z",
      pdf: "http://res.cloudinary.com/vinaydev19/image/upload/v1763651213/sample.pdf",
    },
    {
      _id: "691f2e5bccd542a1623ded6f",
      patientName: "Michael Brown",
      patientId: "691f2b7164af4af7ad197cef",
      consultationFormId: "691f2b7f64af4af7ad197cfa",
      careToBeTaken: "Take rest, avoid oily food, drink more water.",
      medicines: "Aspirin 75mg daily, Vitamin D supplement.",
      createdAt: "2025-11-20T15:06:03.270Z",
      pdf: "https://res.cloudinary.com/vinaydev19/image/upload/v1763651168/sample2.pdf",
    },
  ];

  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const openCreateForm = () => {
    setEditMode(false);
    setSelectedPrescription(null);
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditMode(true);
    setSelectedPrescription(item);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPrescription(null);
    setEditMode(false);
  };

  const deletePrescription = (id) => {
    const filtered = prescriptions.filter((p) => p._id !== id);
    setPrescriptions(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Doctor Prescriptions</h1>

        <button
          onClick={openCreateForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Create Prescription
        </button>
      </div>

      <div className="space-y-4">
        {prescriptions.map((item) => (
          <div
            key={item._id}
            className="bg-white border shadow-md rounded-xl p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{item.patientName}</h2>
                <p className="text-gray-600 text-sm">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <p className="text-gray-700 mt-2">
                  <strong>Care to be taken:</strong> {item.careToBeTaken}
                </p>

                <p className="text-gray-700 mt-1">
                  <strong>Medicines:</strong> {item.medicines}
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={item.pdf}
                  download
                  className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  <Download size={18} />
                </a>

                <button
                  onClick={() => openEditForm(item)}
                  className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  <Edit size={18} />
                </button>

                <button
                  onClick={() => deletePrescription(item._id)}
                  className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4">
          <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl relative">
            <button
              onClick={closeForm}
              className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
              <ClipboardEdit />
              {editMode ? "Update Prescription" : "Create Prescription"}
            </h2>

            <form className="space-y-4">
              <div>
                <label className="font-semibold">Care to be taken</label>
                <textarea
                  className="mt-2 w-full border rounded-lg p-2"
                  defaultValue={selectedPrescription?.careToBeTaken || ""}
                  placeholder="Enter care instructions..."
                  rows={3}
                ></textarea>
              </div>

              <div>
                <label className="font-semibold">Medicines</label>
                <textarea
                  className="mt-2 w-full border rounded-lg p-2"
                  defaultValue={selectedPrescription?.medicines || ""}
                  placeholder="Enter medicine details..."
                  rows={3}
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4"
              >
                {editMode ? "Update Prescription" : "Submit Prescription"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorPrescription;
