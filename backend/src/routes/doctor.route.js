import Router from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/roles.middleware.js"
import {
    DoctorSignUp,
    DoctorLogin,
    DoctorLogout,
    refreshAccessToken,
    getCurrentDoctor,
    getAllPatientsForDoctor,
    getAllDoctorsList
} from "../controllers/doctor.controller.js"

const router = Router();

router.route('/signup').post(DoctorSignUp);
router.route('/login').post(DoctorLogin);
router.route('/logout').post(verifyJWT, DoctorLogout);
router.route('/refresh-token').get(refreshAccessToken);
router.route('/me').get(verifyJWT, authorizeRoles('doctor'), getCurrentDoctor);
router.route('/patients').get(verifyJWT, authorizeRoles('doctor'), getAllPatientsForDoctor);
router.route('/doctors').get(verifyJWT, authorizeRoles('doctor', 'patient'), getAllDoctorsList);

export default router;