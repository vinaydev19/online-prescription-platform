import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { Patient } from "../models/patient.model.js";
import { PatientPrescriptionForm } from '../models/patientPrescriptionForm.model.js';
import { generatePrescriptionPDF } from '../utils/generatePDF.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { DoctorConsultationForm } from '../models/doctorConsultationForm.model.js';

/*
1. Create Patient Prescription Form - Doctor
2. get data of careToBeTaken, medicines from req.body, patientId from req.params, doctorId from req.doctor, ConsultationFormId from req.params
2. Validate required fields
3. Check if patient exists
5 check if ConsultationForm exists
4. Create Patient Prescription Form
6. Generate PDF using generatePrescriptionPDF utility
7. Save PDF local file system
7. Upload PDF to Cloudinary using uploadOnCloudinary utility
8. Save PDF URL in Patient Prescription Form
9. Return success response with Patient Prescription Form data
*/

const createPatientPrescriptionForm = asyncHandler(async (req, res) => {
    const doctorId = req.doctor._id;
    const patientId = req.params.patientId;
    const consultationFormId = req.params.consultationFormId;
    const { careToBeTaken, medicines } = req.body;

    if (!careToBeTaken || !medicines || medicines.length === 0) {
        throw new ApiError(400, 'careToBeTaken and medicines are required');
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
        throw new ApiError(404, 'Patient not found');
    }

    const consultationForm = await DoctorConsultationForm.findById(consultationFormId);
    if (!consultationForm) {
        throw new ApiError(404, 'Consultation Form not found');
    }

    const prescriptionForm = await PatientPrescriptionForm.create({
        doctorId,
        patientId,
        consultationFormId,
        careToBeTaken,
        medicines
    });

    const pdfPath = await generatePrescriptionPDF(prescriptionForm, patient, req.doctor);

    const pdfUploadResult = await uploadOnCloudinary(pdfPath, 'prescriptions');

    prescriptionForm.pdf = pdfUploadResult.url;
    await prescriptionForm.save();

    return res.status(201).json(new ApiResponse(201, { prescriptionForm }, 'Patient Prescription Form created successfully'));
});

const getAllPrescriptionsByDoctor = asyncHandler(async (req, res) => {
    const doctorId = req.doctor._id;

    const prescriptions = await PatientPrescriptionForm.find({ doctorId });

    return res.status(200).json(new ApiResponse(200, { prescriptions }, 'Prescriptions retrieved successfully'));
});

const getPrescriptionByIdByDoctor = asyncHandler(async (req, res) => {
    const doctorId = req.doctor._id;
    const prescriptionId = req.params.prescriptionId;

    const prescription = await PatientPrescriptionForm.findOne({ _id: prescriptionId, doctorId });

    if (!prescription) {
        throw new ApiError(404, 'Prescription not found');
    }

    return res.status(200).json(new ApiResponse(200, { prescription }, 'Prescription retrieved successfully'));
});

const updatePrescriptionByDoctor = asyncHandler(async (req, res) => {
    const doctorId = req.doctor._id;
    const prescriptionId = req.params.prescriptionId;
    const { careToBeTaken, medicines } = req.body;

    const updatedData = {
        careToBeTaken,
        medicines
    };

    const prescription = await PatientPrescriptionForm.findOneAndUpdate(
        { _id: prescriptionId, doctorId },
        updatedData,
        { new: true }
    );

    if (!prescription) {
        throw new ApiError(404, 'Prescription not found or update failed');
    }

    return res.status(200).json(new ApiResponse(200, { prescription }, 'Prescription updated successfully'));
});

const deletePrescriptionByDoctor = asyncHandler(async (req, res) => {
    const doctorId = req.doctor._id;
    const prescriptionId = req.params.prescriptionId;

    const prescription = await PatientPrescriptionForm.findOneAndDelete({ _id: prescriptionId, doctorId });

    if (!prescription) {
        throw new ApiError(404, 'Prescription not found or delete failed');
    }

    return res.status(200).json(new ApiResponse(200, null, 'Prescription deleted successfully'));
});

const getPrescriptionsByPatient = asyncHandler(async (req, res) => {
    const patientId = req.patient._id;
    const prescriptionId = req.params.prescriptionId;

    const prescription = await PatientPrescriptionForm.findOne({ _id: prescriptionId, patientId });

    if (!prescription) {
        throw new ApiError(404, 'Prescription not found');
    }

    return res.status(200).json(new ApiResponse(200, { prescription }, 'Prescription retrieved successfully'));
})

const getAllPrescriptionsByPatient = asyncHandler(async (req, res) => {
    const patientId = req.patient._id;

    const prescription = await PatientPrescriptionForm.find({ patientId });

    return res.status(200).json(new ApiResponse(200, { prescription }, 'Prescriptions retrieved successfully'));
})

export {
    createPatientPrescriptionForm,
    getAllPrescriptionsByDoctor,
    getPrescriptionByIdByDoctor,
    updatePrescriptionByDoctor,
    deletePrescriptionByDoctor,
    getPrescriptionsByPatient,
    getAllPrescriptionsByPatient
};