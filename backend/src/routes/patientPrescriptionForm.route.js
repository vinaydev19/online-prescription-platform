import Router from 'express';
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/roles.middleware.js"
import {
    createPatientPrescriptionForm,
    getAllPrescriptionsByDoctor,
    getPrescriptionByIdByDoctor,
    updatePrescriptionByDoctor,
    deletePrescriptionByDoctor,
    getPrescriptionsByPatient,
    getAllPrescriptionsByPatient
} from "../controllers/patientPrescriptionForm.controller.js"

const router = Router();

router.route('/create/:patientId/:consultationFormId').post(verifyJWT, authorizeRoles('doctor'), createPatientPrescriptionForm);
router.route('/doctor/all').get(verifyJWT, authorizeRoles('doctor'), getAllPrescriptionsByDoctor);
router.route('/doctor/:prescriptionId').get(verifyJWT, authorizeRoles('doctor'), getPrescriptionByIdByDoctor);
router.route('/doctor/update/:prescriptionId').put(verifyJWT, authorizeRoles('doctor'), updatePrescriptionByDoctor);
router.route('/doctor/delete/:prescriptionId').delete(verifyJWT, authorizeRoles('doctor'), deletePrescriptionByDoctor);
router.route('/patient/all').get(verifyJWT, authorizeRoles('patient'), getAllPrescriptionsByPatient);
router.route('/patient/:prescriptionId').get(verifyJWT, authorizeRoles('patient'), getPrescriptionsByPatient);

export default router;