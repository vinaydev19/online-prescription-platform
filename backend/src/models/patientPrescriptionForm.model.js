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
    careToBeTaken: {
        type: String,
        required: true
    },
    medicines: {
        type: String,
        required: true
    },
    pdf: {
        type: Buffer
    }
}, { timestamps: true })


export const PatientPrescriptionForm = mongoose.model('PatientPrescriptionForm', patientPrescriptionFormSchema)