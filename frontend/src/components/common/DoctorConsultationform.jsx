import React, { useState } from "react";

function DoctorConsultationform() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    currentIllnessHistory: "",
    recentSurgery: "",
    familyMedicalHistory: {
      diabeticsStatus: "",
      allergies: "",
      others: ""
    },
    paymentTransactionId: ""
  });

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div className="p-4">

      {/* STEP 1  */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Step 1: Illness History</h2>

          <input
            type="text"
            placeholder="Current illness history"
            className="border p-2 w-full mb-3"
            value={form.currentIllnessHistory}
            onChange={(e) =>
              setForm({ ...form, currentIllnessHistory: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Recent surgery (if any)"
            className="border p-2 w-full mb-3"
            value={form.recentSurgery}
            onChange={(e) =>
              setForm({ ...form, recentSurgery: e.target.value })
            }
          />

          <button onClick={next} className="bg-blue-500 text-white p-2 rounded">
            Next
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Step 2: Family Medical History</h2>

          {/* Radio Buttons */}
          <label className="mr-4">
            <input
              type="radio"
              name="diabetics"
              value="Diabetics"
              onChange={(e) =>
                setForm({
                  ...form,
                  familyMedicalHistory: {
                    ...form.familyMedicalHistory,
                    diabeticsStatus: e.target.value
                  }
                })
              }
            />
            Diabetics
          </label>

          <label>
            <input
              type="radio"
              name="diabetics"
              value="Non-Diabetics"
              onChange={(e) =>
                setForm({
                  ...form,
                  familyMedicalHistory: {
                    ...form.familyMedicalHistory,
                    diabeticsStatus: e.target.value
                  }
                })
              }
            />
            Non-Diabetics
          </label>

          <input
            type="text"
            placeholder="Allergies"
            className="border p-2 w-full my-3"
            onChange={(e) =>
              setForm({
                ...form,
                familyMedicalHistory: {
                  ...form.familyMedicalHistory,
                  allergies: e.target.value
                }
              })
            }
          />

          <input
            type="text"
            placeholder="Others"
            className="border p-2 w-full mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                familyMedicalHistory: {
                  ...form.familyMedicalHistory,
                  others: e.target.value
                }
              })
            }
          />

          <div className="flex justify-between">
            <button onClick={back} className="bg-gray-400 text-white p-2 rounded">
              Back
            </button>
            <button onClick={next} className="bg-blue-500 text-white p-2 rounded">
              Next
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Step 3: Payment</h2>

          <p className="mb-3">Scan QR Code to make payment:</p>

          <img
            src="/qr.png"
            alt="QR Code"
            className="w-40 mb-4"
          />

          <input
            type="text"
            placeholder="Enter Transaction ID"
            className="border p-2 w-full mb-3"
            value={form.paymentTransactionId}
            onChange={(e) =>
              setForm({ ...form, paymentTransactionId: e.target.value })
            }
          />

          <button className="bg-green-600 text-white p-2 rounded">
            Submit Consultation
          </button>
        </div>
      )}

    </div>
  );
}

export default DoctorConsultationform;
