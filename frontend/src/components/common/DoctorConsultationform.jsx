import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DoctorConsultationform() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    currentIllnessHistory: "",
    recentSurgery: "",
    diabeticsStatus: "",
    allergies: "",
    others: "",
    paymentTransactionId: "",
  });

  const nextStep = () => {
    if (step === 2 && !formData.paymentTransactionId) {
      setFormData({
        ...formData,
        paymentTransactionId: generateTransactionId(),
      });
    }

    setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateTransactionId = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const time = Date.now().toString().slice(-6);
    return `TXN-${time}-${random}`;
  };


  const handleSubmit = () => {
    console.log("Final Submitted Data:", formData);
    alert("Form Submitted Successfully!");
    navigate("/patient/doctors");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <button
        onClick={() => navigate("/patient/doctors")}
        className="absolute top-6 right-6 text-gray-700 hover:text-red-600 text-3xl font-bold"
      >
        ×
      </button>
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Consultation Form (Doctor ID: {doctorId})
        </h2>

        <div className="flex justify-between gap-10 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-1/3 text-center py-2 rounded-lg ${step === s
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700"
                }`}
            >
              Step {s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Step 1: Illness & Surgery Details
            </h3>

            <label className="block mb-2 font-medium">
              Current Illness History
            </label>
            <textarea
              name="currentIllnessHistory"
              value={formData.currentIllnessHistory}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mb-4"
              placeholder="Describe your current illness…"
            />

            <label className="block mb-2 font-medium">
              Recent Surgery (Mention Time Span)
            </label>
            <input
              type="text"
              name="recentSurgery"
              value={formData.recentSurgery}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mb-6"
              placeholder="Example: Appendix surgery 6 months ago"
            />

            <div className="flex justify-end">
              <button
                onClick={nextStep}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Step 2: Family Medical History
            </h3>

            <label className="block font-medium mb-2">Diabetes Status</label>
            <div className="flex gap-6 mb-4">
              <label>
                <input
                  type="radio"
                  name="diabeticsStatus"
                  value="Diabetics"
                  onChange={handleChange}
                  className="mr-2"
                />
                Diabetics
              </label>

              <label>
                <input
                  type="radio"
                  name="diabeticsStatus"
                  value="Non-Diabetics"
                  onChange={handleChange}
                  className="mr-2"
                />
                Non-Diabetics
              </label>
            </div>

            <label className="block mb-2 font-medium">Any Allergies?</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mb-4"
              placeholder="Example: Dust allergy"
            />

            <label className="block mb-2 font-medium">Others</label>
            <input
              type="text"
              name="others"
              value={formData.others}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mb-6"
              placeholder="Other medical history…"
            />

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                ← Back
              </button>

              <button
                onClick={nextStep}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Step 3: Payment Details
            </h3>

            <p className="text-gray-700 mb-4">
              Scan the QR code below to make the payment.
            </p>

            <div className="flex justify-center mb-4">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Payment"
                alt="QR Code"
                className="w-44 h-44"
              />
            </div>

            <label className="block mb-2 font-medium">Transaction ID</label>
            <input
              type="text"
              name="paymentTransactionId"
              value={formData.paymentTransactionId}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mb-6"
              placeholder="Enter your transaction ID"
            />

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                ← Back
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                Submit Form ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorConsultationform;
