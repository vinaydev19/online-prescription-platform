import React, { useEffect, useState } from "react";
import {
  User,
  CalendarDays,
  HeartPulse,
  FileText,
  ChevronDown,
  ChevronUp,
  X,
  ClipboardEdit,
} from "lucide-react";
import { useGetConsultationFormsForDoctorQuery } from "@/store/api/doctorConsultationFormApiSlice";
import { useCreatePrescriptionMutation } from "@/store/api/patientPrescriptionFormApiSlice";
import toast from "react-hot-toast";



function ConsultationList() {
  const [careToBeTaken, setCareToBeTaken] = useState("");
  const [medicines, setMedicines] = useState("");

  const [createPrescription, { isLoading: isCreating }] = useCreatePrescriptionMutation();

  const { data, isLoading, isError } = useGetConsultationFormsForDoctorQuery();

  const consultationForms = data?.data?.consultationForms || [];

  const [expanded, setExpanded] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    if (selectedForm) {
      setCareToBeTaken("");
      setMedicines("");
    }
  }, [selectedForm]);


  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const openPrescriptionForm = (form) => {
    setSelectedForm(form);
    setShowForm(true);
  };

  const closePrescriptionForm = () => {
    setShowForm(false);
    setSelectedForm(null);
  };

  const handleSubmitPrescription = async () => {
    try {
      const res = await createPrescription({
        patientId: selectedForm.patientId._id,
        consultationFormId: selectedForm._id,
        data: {
          careToBeTaken,
          medicines,
        },
      }).unwrap();

      toast.success("Prescription created!");

      closePrescriptionForm(); // Close modal
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create prescription");
      console.error(err);
    }
  };


  if (isLoading)
    return (
      <div className="p-6 text-center text-xl font-semibold text-gray-600">
        Loading consultations...
      </div>
    );

  if (isError)
    return (
      <div className="p-6 text-center text-xl font-semibold text-red-600">
        Failed to load consultation forms
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Patient Consultation Forms
      </h1>

      <div className="space-y-4">
        {consultationForms.map((form) => (
          <div
            key={form._id}
            className="bg-white border shadow-md rounded-xl p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3">
                  <User className="text-blue-600" />
                  <h2 className="text-xl font-bold">{form.patientId.name}</h2>
                </div>
                <p className="text-gray-600 ml-9">{form.patientId.email}</p>

                <div className="flex items-center gap-2 ml-9 mt-2 text-gray-500">
                  <CalendarDays size={18} />
                  <span>
                    {new Date(form.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                className="text-blue-600 flex items-center gap-1"
                onClick={() => toggleExpand(form._id)}
              >
                {expanded === form._id ? (
                  <>
                    <span>Hide Details</span>
                    <ChevronUp />
                  </>
                ) : (
                  <>
                    <span>View Details</span>
                    <ChevronDown />
                  </>
                )}
              </button>
            </div>

            {expanded === form._id && (
              <div className="mt-5 border-t pt-4 space-y-4">
                <div>
                  <label className="font-semibold flex items-center gap-2">
                    <HeartPulse size={18} /> Current Illness History
                  </label>
                  <p className="text-gray-700 mt-1">
                    {form.currentIllnessHistory}
                  </p>
                </div>

                <div>
                  <label className="font-semibold">Recent Surgery</label>
                  <p className="text-gray-700 mt-1">{form.recentSurgery}</p>
                </div>

                <div>
                  <label className="font-semibold">Family Medical History</label>
                  <div className="text-gray-700 mt-1">
                    <p>
                      <strong>Diabetics Status:</strong>{" "}
                      {form.familyMedicalHistory.diabeticsStatus}
                    </p>
                    <p>
                      <strong>Allergies:</strong>{" "}
                      {form.familyMedicalHistory.allergies}
                    </p>
                    <p>
                      <strong>Others:</strong>{" "}
                      {form.familyMedicalHistory.others}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="font-semibold">Payment Transaction ID</label>
                  <p className="text-gray-700 mt-1">
                    {form.paymentTransactionId}
                  </p>
                </div>

                <button
                  onClick={() => openPrescriptionForm(form)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <FileText size={18} />
                  Create Prescription
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showForm && selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4">
          <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl relative">
            <button
              onClick={closePrescriptionForm}
              className="absolute right-4 top-4 text-gray-500 hover:text-red-500"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
              <ClipboardEdit /> Create Prescription
            </h2>

            <form className="space-y-4">
              <div>
                <label className="font-semibold">Care to be taken</label>
                <textarea
                  className="mt-2 w-full border rounded-lg p-2"
                  placeholder="Enter care instructions..."
                  rows={3}
                  value={careToBeTaken}
                  onChange={(e) => setCareToBeTaken(e.target.value)}
                />
              </div>

              <div>
                <label className="font-semibold">Medicines</label>
                <textarea
                  className="mt-2 w-full border rounded-lg p-2"
                  placeholder="Enter medicine details..."
                  rows={3}
                  value={medicines}
                  onChange={(e) => setMedicines(e.target.value)}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmitPrescription}
                disabled={isCreating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4 disabled:bg-gray-400"
              >
                {isCreating ? "Submitting..." : "Submit Prescription"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultationList;
