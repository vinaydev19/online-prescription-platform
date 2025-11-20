import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(cookieParser())
app.use(express.urlencoded({ limit: '20kb', extended: true }))
app.use(express.json({ limit: "20kb" }))
app.use(express.static('public'))

import doctorRouter from "./routes/doctor.route.js"
import patientRouter from "./routes/patient.route.js"
import doctorConsultationFormRouter from "./routes/doctorConsultationForm.route.js"
import patientPrescriptionFormRouter from "./routes/patientPrescriptionForm.route.js"

app.use("/api/v1/doctors", doctorRouter)
app.use("/api/v1/patients", patientRouter)
app.use("/api/v1/doctor-consultations", doctorConsultationFormRouter)
app.use("/api/v1/patient-prescriptions", patientPrescriptionFormRouter)

app.use(errorHandler)

export { app }