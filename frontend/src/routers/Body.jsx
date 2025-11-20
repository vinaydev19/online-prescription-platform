import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import RoleProtectedRoute from "@/components/common/RoleProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";

import Doctorslist from "@/pages/patients/Doctorslist";
import PatientPrescription from "@/pages/patients/PatientPrescription";
import DoctorPrescription from "@/pages/doctor/DoctorPrescription";
import DoctorConsultationform from "@/components/common/DoctorConsultationform";
import PatientLogin from "@/pages/patients/PatientLogin";
import PatientSignup from "@/pages/patients/PatientSignup";
import DoctorLogin from "@/pages/doctor/DoctorLogin";
import DoctorSignup from "@/pages/doctor/DoctorSignup";
import ConsultationList from "@/pages/doctor/ConsultationList";

function Body() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ patient/login" element={<PatientLogin />} />
        <Route path="/ patient/signup" element={<PatientSignup />} />
        <Route path="/ doctor/login" element={<DoctorLogin />} />
        <Route path="/ doctor/signup" element={<DoctorSignup />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleProtectedRoute allowedRoles={["doctor"]} />}>
            <Route
              path="/doctor"
              element={<DashboardLayout role="doctor" />}
            >
              <Route path="consultations" element={<ConsultationList />} />
              <Route path="prescriptions" element={<DoctorPrescription />} />
            </Route>
          </Route>
          <Route element={<RoleProtectedRoute allowedRoles={["patient"]} />}>
            <Route
              path="/patient"
              element={<DashboardLayout role="patient" />}
            >
              <Route path="doctors" element={<Doctorslist />} />
              <Route path="prescriptions" element={<PatientPrescription />} />
            </Route>
            <Route
              path="/patient/consultation/:doctorId"
              element={<DoctorConsultationform />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Body;
