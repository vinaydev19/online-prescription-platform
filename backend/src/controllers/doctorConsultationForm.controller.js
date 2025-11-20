import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from "../utils/asyncHandler.js"
import { Doctor } from "../models/doctor.model.js"
import { DoctorConsultationForm } from '../models/doctorConsultationForm.model.js';

const createDoctorConsultationForm = asyncHandler(async (req, res, next) => {
    const doctorId = req.params.doctorId;
    const {
        currentIllnessHistory,
        recentSurgery,
        familyMedicalHistory,
        paymentTransactionId } = req.body;
    const patientId = req.patient._id;

    if ([!recentSurgery, !familyMedicalHistory, !paymentTransactionId].some(field => field === undefined || field === null || field === '' && field.currentIllnessHistory === 0)) {
        throw new ApiError(400, 'All fields are required except current illness history');
    }

    const formData = {
        patientId,
        doctorId,
        currentIllnessHistory,
        recentSurgery,
        familyMedicalHistory,
        paymentTransactionId
    };

    const checkDoctorExists = await Doctor.findById(doctorId);

    if (!checkDoctorExists) {
        throw new ApiError(404, 'Doctor not found');
    }

    const doctorConsultationForm = await DoctorConsultationForm.create(formData);

    if (!doctorConsultationForm) {
        throw new ApiError(500, 'Failed to submit doctor consultation form');
    }

    return res.status(201).json(new ApiResponse(201, { doctorConsultationForm }, 'Doctor consultation form submitted successfully'));
})

const listOfPatientSubmitConsultation = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;    

    const consultationForms = await DoctorConsultationForm.find({ doctorId }).populate('patientId', 'name email phone');

    return res.status(200).json(new ApiResponse(200, { consultationForms }, 'List of patient submitted consultation forms retrieved successfully'));
});

export {
    createDoctorConsultationForm,
    listOfPatientSubmitConsultation
};
