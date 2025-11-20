import mongoose from "mongoose"

const patientPrescriptionFormSchema = new mongoose.Schema({
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
    consultationFormId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorConsultationForm',
        required: true
    },
    careToBeTaken: {
        type: String,
        required: true
    },
    medicines: {
        type: String,
        required: true
    },
    pdf: {
        type: String
    }
}, { timestamps: true })


export const PatientPrescriptionForm = mongoose.model('PatientPrescriptionForm', patientPrescriptionFormSchema)