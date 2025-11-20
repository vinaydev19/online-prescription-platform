import mongoose from "mongoose"

const doctorConsultationFormSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    currentIllnessHistory: {
        type: String,
        required: true
    },
    recentSurgery: {
        type: String,
        required: true
    },
    familyMedicalHistory: {
        diabeticsStatus: {
            type: String,
            enum: ['Diabetics', 'Non-Diabetics'],
            required: true
        },
        allergies: {
            type: String,
            required: false
        },
        others: {
            type: String,
            required: false
        }
    },
    paymentTransactionId: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const DoctorConsultationForm = mongoose.model('DoctorConsultationForm', doctorConsultationFormSchema)