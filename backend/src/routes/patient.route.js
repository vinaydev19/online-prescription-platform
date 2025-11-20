import Router from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/roles.middleware.js"
import {
    PatientSignUp,
    PatientLogin,
    PatientLogout,
    refreshAccessToken,
    getCurrentPatient,
    getAllDoctorsList,
    getPatientPrescriptions
} from "../controllers/patient.controller.js"

const router = Router();

router.route('/signup').post(PatientSignUp);
router.route('/login').post(PatientLogin);
router.route('/logout').post(verifyJWT, PatientLogout);
router.route('/refresh-token').get(refreshAccessToken);
router.route('/me').get(verifyJWT, authorizeRoles('patient'), getCurrentPatient);
router.route('/doctors').get(verifyJWT, authorizeRoles('patient', 'doctor'), getAllDoctorsList);
router.route('/prescriptions').get(verifyJWT, authorizeRoles('patient'), getPatientPrescriptions);

export default router;