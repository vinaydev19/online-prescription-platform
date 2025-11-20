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

import {
  useGetPrescriptionsByDoctorQuery,
  useCreatePrescriptionMutation,
  useUpdatePrescriptionMutation,
  useDeletePrescriptionMutation,
} from "@/store/api/patientPrescriptionFormApiSlice";

import toast from "react-hot-toast";

function DoctorPrescription() {
  const { data, isLoading, isError } = useGetPrescriptionsByDoctorQuery();
  const [createPrescription] = useCreatePrescriptionMutation();
  const [updatePrescription] = useUpdatePrescriptionMutation();
  const [deletePrescriptionApi] = useDeletePrescriptionMutation();

  const prescriptions = data?.data?.prescriptions || [];

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const [formValues, setFormValues] = useState({
    careToBeTaken: "",
    medicines: "",
  });

  const openCreateForm = () => {
    setEditMode(false);
    setSelectedPrescription(null);
    setFormValues({ careToBeTaken: "", medicines: "" });
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditMode(true);
    setSelectedPrescription(item);
    setFormValues({
      careToBeTaken: item.careToBeTaken,
      medicines: item.medicines,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPrescription(null);
    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async () => {
    try {
      const payload = {
        patientId: selectedPrescription?.patientId,
        consultationFormId: selectedPrescription?.consultationFormId,
        data: formValues,
      };

      await createPrescription(payload).unwrap();
      toast.success("Prescription created successfully");

      closeForm();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || "Failed to create");
    }
  };

  const handleUpdate = async () => {
    try {
      await updatePrescription({
        prescriptionId: selectedPrescription._id,
        data: formValues,
      }).unwrap();

      toast.success("Prescription updated");

      closeForm();
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePrescriptionApi(id).unwrap();
      toast.success("Prescription deleted");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  if (isLoading)
    return (
      <div className="p-6 text-xl text-gray-600 text-center">
        Loading prescriptions...
      </div>
    );

  if (isError)
    return (
      <div className="p-6 text-xl text-red-600 text-center">
        Failed to load prescriptions
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Doctor Prescriptions
        </h1>

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
                  onClick={() => handleDelete(item._id)}
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
                  name="careToBeTaken"
                  className="mt-2 w-full border rounded-lg p-2"
                  value={formValues.careToBeTaken}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div>
                <label className="font-semibold">Medicines</label>
                <textarea
                  name="medicines"
                  className="mt-2 w-full border rounded-lg p-2"
                  value={formValues.medicines}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <button
                type="button"
                onClick={editMode ? handleUpdate : handleCreate}
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
