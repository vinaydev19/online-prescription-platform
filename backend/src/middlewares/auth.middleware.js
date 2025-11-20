import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Doctor } from "../models/doctor.model.js";
import { Patient } from "../models/patient.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "No access token provided" });
        }

        const decodedToken = await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        if (!decodedToken) {
            throw new ApiError(401, "unauthorized request");
        }

        if (decodedToken.role === 'doctor') {
            const doctor = await Doctor.findById(decodedToken._id).select('-password -refreshToken');
            if (!doctor) {
                throw new ApiError(401, "unauthorized request");
            }
            req.doctor = doctor;
            next();
        } else {
            const patient = await Patient.findById(decodedToken._id).select('-password -refreshToken');
            if (!patient) {
                throw new ApiError(401, "unauthorized request");
            }
            req.patient = patient;
            next();
        }
    } catch (error) {
        throw new ApiError(401, error.message || "unauthorized request");
    }
});

export { verifyJWT };