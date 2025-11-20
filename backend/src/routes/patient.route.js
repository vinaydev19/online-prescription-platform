import Router from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/roles.middleware.js"
import {
    patientSignUp,
    patientLogin,
    patientLogout,
    refreshAccessToken,
    getCurrentPatient,
    getAllDoctorsList,
    getPatientPrescriptions
} from "../controllers/patient.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/signup').post(upload.single('profilePicture'), patientSignUp);
router.route('/login').post(patientLogin);
router.route('/logout').post(verifyJWT, patientLogout);
router.route('/refresh-token').get(refreshAccessToken);
router.route('/me').get(verifyJWT, authorizeRoles('patient'), getCurrentPatient);
router.route('/doctors').get(verifyJWT, authorizeRoles('patient', 'doctor'), getAllDoctorsList);
router.route('/prescriptions').get(verifyJWT, authorizeRoles('patient'), getPatientPrescriptions);

export default router;