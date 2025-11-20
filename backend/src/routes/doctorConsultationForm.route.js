import Router from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/roles.middleware.js"
import { createDoctorConsultationForm, listOfPatientSubmitConsultation } from "../controllers/doctorConsultationForm.controller.js"

const router = Router();

router.route('/:doctorId/consultation-form').post(verifyJWT, authorizeRoles('patient'), createDoctorConsultationForm);
router.route('/consultation-forms').get(verifyJWT, authorizeRoles('doctor'), listOfPatientSubmitConsultation);

export default router;