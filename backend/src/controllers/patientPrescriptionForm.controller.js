import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from "../utils/asyncHandler.js"
import { Patient } from "../models/patient.model.js"
import { PatientPrescriptionForm } from '../models/patientPrescriptionForm.model.js';
import { generatePrescriptionPDF } from '../utils/generatePDF.js';

const createPatientPrescriptionForm = asyncHandler(async (req, res) => {
    const patientId = req.params.doctorId;
    const { careToBeTaken, medicines } = req.body;
    const doctorId = req.doctor._id;

    if (!careToBeTaken || !medicines) {
        throw new ApiError(400, 'Care to be taken and medicines are required');
    }

    const formData = {
        patientId,
        doctorId,
        careToBeTaken,
        medicines
    };

    const checkPatientExists = await Patient.findById(patientId);

    if (!checkPatientExists) {
        throw new ApiError(404, 'Patient not found');
    }

    const patientPrescriptionForm = await PatientPrescriptionForm.create(formData);

    if (!patientPrescriptionForm) {
        throw new ApiError(500, 'Failed to create patient prescription form');
    }

    const prescriptionData = {
        careToBeTaken,
        medicines,
        doctor: req.doctor,
        patient: checkPatientExists
    };

    const pdfBlob = generatePrescriptionPDF(prescriptionData);



    return res.status(201).json(new ApiResponse(201, { patientPrescriptionForm }, 'Patient prescription form created successfully'));
})

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