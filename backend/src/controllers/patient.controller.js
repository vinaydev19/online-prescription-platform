import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from "../utils/asyncHandler.js"
import { Patient } from "../models/patient.model.js"
import { Doctor } from "../models/doctor.model.js"
import jwt from 'jsonwebtoken';
import { PatientPrescriptionForm } from "../models/patientPrescriptionForm.model.js";

const isProd = process.env.NODE_ENV === 'production';

const accessCookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'None' : 'Lax',
    path: '/',
    maxAge: 15 * 60 * 1000
};

const refreshCookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'None' : 'Lax',
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000
};

const generateAccessAndRefreshToken = async (patientId) => {
    try {
        const patient = await Patient.findById(patientId);
        const accessToken = patient.generateAccessToken();
        const refreshToken = patient.generateRefreshToken();

        patient.refreshToken = refreshToken;
        await patient.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Could not generate tokens")
    }
}

const PatientSignUp = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        age,
        profilePicture,
        phoneNumber,
        historyOfSurgery,
        historyOfIllness,
        password,
        role
    } = req.body

    if ([
        name,
        email,
        age,
        profilePicture,
        phoneNumber,
        historyOfSurgery,
        historyOfIllness,
        password,
        role
    ].some(field => !field || field === '' || field === undefined && field.historyOfIllness.length === 0 && field.historyOfSurgery.length === 0)) {
        throw new ApiError(400, 'All fields are required')
    }

    const patientExists = await Patient.findOne(
        { $or: [{ email }, { phoneNumber }] }
    )

    if (patientExists) {
        throw new ApiError(409, 'Patient already exists with this email or phone number')
    }

    const patient = await Patient.create({
        name,
        email,
        age,
        profilePicture,
        phoneNumber,
        historyOfSurgery,
        historyOfIllness,
        password,
        role: 'patient'
    })

    if (!patient) {
        throw new ApiError(500, 'Failed to create patient')
    }

    const loggedPatient = await Patient.findById(patient._id).select('-password -refreshToken')

    res.status(201).json(new ApiResponse(201, { loggedPatient }, 'Patient created successfully'))
})

const PatientLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some(field => !field === undefined || field === '')) {
        throw new ApiError(400, 'All fields are required')
    }

    const patient = await Patient.findOne({ email })

    if (!patient) {
        throw new ApiError(404, 'Patient not found')
    }

    const isPasswordCorrect = await patient.isPasswordCorrect(password)


    if (!isPasswordCorrect) {
        throw new ApiError(401, 'Invalid credentials')
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(patient._id)

    const loggedPatient = await Patient.findById(patient._id).select('-password -refreshToken')

    res
        .status(200)
        .cookie('accessToken', accessToken, accessCookieOptions)
        .cookie('refreshToken', refreshToken, refreshCookieOptions)
        .json(new ApiResponse(200, { loggedPatient }, 'Patient logged in successfully'))
})

const PatientLogout = asyncHandler(async (req, res) => {
    await Patient.findByIdAndUpdate(
        req.patient._id,
        {
            $set: { refreshToken: 1 }
        },
        {
            new: true
        }
    )

    res
        .status(200)
        .clearCookie('accessToken', accessToken, accessCookieOptions)
        .clearCookie('refreshToken', refreshToken, refreshCookieOptions)
        .json(new ApiResponse(200, { loggedPatient }, 'Patient logout in successfully'))
})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token not found, please login again")
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const patient = await Patient.findById(decoded._id);

        if (patient?.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Invalid refresh token, please login again")
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(patient._id);

        return res
            .status(200)
            .cookie('accessToken', accessToken, accessCookieOptions)
            .cookie('refreshToken', newRefreshToken, refreshCookieOptions)
            .json(new ApiResponse(200, null, "Access token refreshed successfully"));
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token, please login again")
    }
})

const getCurrentPatient = asyncHandler(async (req, res, next) => {
    const patientId = req.patient._id;

    const patient = await Patient.findById(patientId).select('-password -refreshToken');

    if (!patient) {
        throw new ApiError(404, "Patient not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { patient }, "Current Patient fetched successfully"));
})

const getAllDoctorsList = asyncHandler(async (req, res, next) => {
    const doctors = await Doctor.find().select('-password -refreshToken');

    return res
        .status(200)
        .json(new ApiResponse(200, { doctors }, "Doctors list fetched successfully"));
})

const getPatientPrescriptions = asyncHandler(async (req, res, next) => {
    const patientId = req.patient._id;

    const prescriptions = await PatientPrescriptionForm.find({ patient: patientId }).populate('doctor', '-password -refreshToken');

    return res
        .status(200)
        .json(new ApiResponse(200, { prescriptions }, "Patient prescriptions fetched successfully"));
})

export {
    PatientSignUp,
    PatientLogin,
    PatientLogout,
    refreshAccessToken,
    getCurrentPatient,
    getAllDoctorsList,
    getPatientPrescriptions
}