import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from "../utils/asyncHandler.js"
import { Doctor } from "../models/doctor.model.js"
import jwt from 'jsonwebtoken';
import { DoctorConsultationForm } from '../models/doctorConsultationForm.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

const generateAccessAndRefreshToken = async (doctorId) => {
    try {
        const doctor = await Doctor.findById(doctorId);
        const accessToken = doctor.generateAccessToken();
        const refreshToken = doctor.generateRefreshToken();

        doctor.refreshToken = refreshToken;
        await doctor.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Could not generate tokens")
    }
}

const doctorSignUp = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        specialty,
        phoneNumber,
        yearsOfExperience,
        password,
        role = 'doctor'
    } = req.body

    if ([name, email, specialty, phoneNumber, yearsOfExperience, password].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, 'All fields are required')
    }

    const doctorExists = await Doctor.findOne(
        { $or: [{ email }, { phoneNumber }] }
    )

    if (doctorExists) {
        throw new ApiError(409, 'Doctor already exists with this email or phone number')
    }

    if (!req.file) {
        throw new ApiError(400, 'Profile picture is required')
    }

    const profilePictureLocalPath = req.file.path;

    const profilePictureUploadResult = await uploadOnCloudinary(profilePictureLocalPath,);

    if (!profilePictureUploadResult) {
        throw new ApiError(500, 'Failed to upload profile picture')
    }

    const doctor = await Doctor.create({
        name,
        email,
        specialty,
        profilePicture: profilePictureUploadResult.url,
        phoneNumber,
        yearsOfExperience,
        password,
        role: 'doctor'
    })

    if (!doctor) {
        throw new ApiError(500, 'Failed to create doctor')
    }

    const loggedDoctor = await Doctor.findById(doctor._id).select('-password -refreshToken')

    res.status(201).json(new ApiResponse(201, { loggedDoctor }, 'Doctor created successfully'))
})

const doctorLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some(field => !field || field.trim() === '')) {
        throw new ApiError(400, 'All fields are required')
    }

    const doctor = await Doctor.findOne({ email })

    if (!doctor) {
        throw new ApiError(404, 'Doctor not found')
    }

    const isPasswordCorrect = await doctor.isPasswordCorrect(password)


    if (!isPasswordCorrect) {
        throw new ApiError(401, 'Invalid credentials')
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(doctor._id)

    const loggedDoctor = await Doctor.findById(doctor._id).select('-password -refreshToken')

    res
        .status(200)
        .cookie('accessToken', accessToken, accessCookieOptions)
        .cookie('refreshToken', refreshToken, refreshCookieOptions)
        .json(new ApiResponse(200, { loggedDoctor }, 'Doctor logged in successfully'))
})

const doctorLogout = asyncHandler(async (req, res) => {
    await Doctor.findByIdAndUpdate(
        req.doctor._id,
        {
            $set: { refreshToken: 1 }
        },
        {
            new: true
        }
    )

    res
        .status(200)
        .clearCookie('accessToken', accessCookieOptions)
        .clearCookie('refreshToken', refreshCookieOptions)
        .json(new ApiResponse(200, 'Doctor logout in successfully'))
})

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token not found, please login again")
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const doctor = await Doctor.findById(decoded._id);

        if (doctor?.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Invalid refresh token, please login again")
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(doctor._id);

        return res
            .status(200)
            .cookie('accessToken', accessToken, accessCookieOptions)
            .cookie('refreshToken', newRefreshToken, refreshCookieOptions)
            .json(new ApiResponse(200, null, "Access token refreshed successfully"));
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token, please login again")
    }
})

const getCurrentDoctor = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;

    const doctor = await Doctor.findById(doctorId).select('-password -refreshToken');

    if (!doctor) {
        throw new ApiError(404, "Doctor not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { doctor }, "Current Doctor fetched successfully"));
})

const getAllPatientsForDoctor = asyncHandler(async (req, res, next) => {
    const doctorId = req.doctor._id;

    const consultationForms = await DoctorConsultationForm.find({ doctor: doctorId }).populate('patient', '-password -refreshToken');

    return res
        .status(200)
        .json(new ApiResponse(200, { consultationForms }, "Patients fetched successfully for the doctor"));
});

const getAllDoctorsList = asyncHandler(async (req, res, next) => {
    const doctors = await Doctor.find().select('-password -refreshToken');

    return res
        .status(200)
        .json(new ApiResponse(200, { doctors }, "Doctors list fetched successfully"));
})

export {
    doctorSignUp,
    doctorLogin,
    doctorLogout,
    refreshAccessToken,
    getCurrentDoctor,
    getAllPatientsForDoctor,
    getAllDoctorsList
}