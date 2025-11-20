import Router from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/roles.middleware.js"
import {
    doctorSignUp,
    doctorLogin,
    doctorLogout,
    refreshAccessToken,
    getCurrentDoctor,
    getAllPatientsForDoctor,
    getAllDoctorsList
} from "../controllers/doctor.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();


router.route('/signup').post(upload.single('profilePicture'), doctorSignUp);
router.route('/login').post(doctorLogin);
router.route('/logout').post(verifyJWT, doctorLogout);
router.route('/refresh-token').get(refreshAccessToken);
router.route('/me').get(verifyJWT, authorizeRoles('doctor'), getCurrentDoctor);
router.route('/patients').get(verifyJWT, authorizeRoles('doctor'), getAllPatientsForDoctor);
router.route('/doctors').get(verifyJWT, authorizeRoles('doctor', 'patient'), getAllDoctorsList);

export default router;