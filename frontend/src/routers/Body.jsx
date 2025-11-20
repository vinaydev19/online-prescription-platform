import DoctorConsultationform from '@/components/common/DoctorConsultationform'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import RoleProtectedRoute from '@/components/common/RoleProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'
import DoctorLogin from '@/pages/doctor/DoctorLogin'
import DoctorPrescription from '@/pages/doctor/DoctorPrescription'
import DoctorSignup from '@/pages/doctor/DoctorSignup'
import Doctorslist from '@/pages/patients/Doctorslist'
import PatientLogin from '@/pages/patients/PatientLogin'
import PatientPrescription from '@/pages/patients/PatientPrescription'
import PatientSignup from '@/pages/patients/PatientSignup'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function Body() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleProtectedRoute allowedRoles={["patient"]} />}>
            <Route path="/patient/doctors" element={<Doctorslist />} />
            <Route
              path="/patient/consultation/:doctorId"
              element={<DoctorConsultationform />}
            />
            <Route
              path="/patient/prescriptions"
              element={<PatientPrescription />}
            />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleProtectedRoute allowedRoles={["doctor"]} />}>
            <Route path="/doctor" element={<DashboardLayout />}>
              <Route path="dashboard" element={<div>Dashboard Home</div>} />
              <Route
                path="prescriptions"
                element={<DoctorPrescription />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Body
