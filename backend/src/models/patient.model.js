import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const historyOfSurgerySchema = new mongoose.Schema({
    surgeryName: {
        type: String,
        required: true
    },
    surgeryDate: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
    }
}, { _id: false })

const historyOfIllnessSchema = new mongoose.Schema({
    illnessName: {
        type: String,
        required: true
    },
    diagnosisDate: {
        type: Date,
        required: true
    },
    notes: {
        type: String,
    }
}, { _id: false })

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    age: {
        type: Number,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    historyOfSurgery: [
        historyOfSurgerySchema
    ],
    historyOfIllness: [
        historyOfIllnessSchema
    ],
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },
    role: {
        type: String,
        default: 'patient'
    }
}, { timestamps: true })

patientSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();
})

patientSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

patientSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

patientSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}

export const Patient = mongoose.model("Patient", patientSchema)