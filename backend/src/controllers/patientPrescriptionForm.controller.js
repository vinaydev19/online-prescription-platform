import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { Patient } from "../models/patient.model.js";
import { PatientPrescriptionForm } from '../models/patientPrescriptionForm.model.js';
import { generatePrescriptionPDF } from '../utils/generatePDF.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { DoctorConsultationForm } from '../models/doctorConsultationForm.model.js';
import { Doctor } from '../models/doctor.model.js';
import fs from 'fs';

const createPatientPrescriptionForm = asyncHandler(async (req, res) => {
    const doctorId = req.doctor._id;
    const patientId = req.params.patientId;
    const consultationFormId = req.params.consultationFormId;
    const { careToBeTaken, medicines } = req.body;

    if (!careToBeTaken || !medicines) {
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

    const pdfUploadResult = await uploadOnCloudinary(pdfPath);

    prescriptionForm.pdf = pdfUploadResult.secure_url;
    await prescriptionForm.save();

    setTimeout(() => {
        try {
            if (fs.existsSync(pdfPath)) {
                fs.unlinkSync(pdfPath);
            }
        } catch (err) {
            console.log("Error deleting PDF file (ignored):", err.message);
        }
    }, 300);

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

    if (!careToBeTaken || !medicines) {
        throw new ApiError(400, "careToBeTaken and medicines are required");
    }

    const prescription = await PatientPrescriptionForm.findOne({
        _id: prescriptionId,
        doctorId
    });

    if (!prescription) {
        throw new ApiError(404, "Prescription not found");
    }

    prescription.careToBeTaken = careToBeTaken;
    prescription.medicines = medicines;

    await prescription.save();

    const patient = await Patient.findById(prescription.patientId);
    const doctor = await Doctor.findById(doctorId);

    const pdfPath = await generatePrescriptionPDF(prescription, patient, doctor);

    const pdfUploaded = await uploadOnCloudinary(pdfPath);

    if (!pdfUploaded?.url) {
        throw new ApiError(500, "Failed to upload updated PDF");
    }

    prescription.pdf = pdfUploaded.url;
    await prescription.save();

    try { fs.unlinkSync(pdfPath); } catch (err) { }

    return res
        .status(200)
        .json(new ApiResponse(200, { prescription }, "Prescription updated successfully"));
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

    const prescriptions = await PatientPrescriptionForm.find({ patientId });

    if (!prescriptions || prescriptions.length === 0) {
        throw new ApiError(404, 'No prescriptions found');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { prescriptions }, 'Prescriptions retrieved successfully'));
});


export {
    createPatientPrescriptionForm,
    getAllPrescriptionsByDoctor,
    getPrescriptionByIdByDoctor,
    updatePrescriptionByDoctor,
    deletePrescriptionByDoctor,
    getPrescriptionsByPatient,
    getAllPrescriptionsByPatient
};