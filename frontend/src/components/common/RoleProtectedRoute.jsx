import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleProtectedRoute({ allowedRoles }) {
  const doctor = useSelector((state) => state.doctor.doctor);
  const patient = useSelector((state) => state.patient.patient);

  let role = null;

  if (doctor) role = "doctor";
  if (patient) role = "patient";

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedRoute;
