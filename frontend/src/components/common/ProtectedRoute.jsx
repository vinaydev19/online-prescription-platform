import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const doctor = useSelector((state) => state.doctor.doctor);
  const patient = useSelector((state) => state.patient.patient);

  const isLoggedIn = doctor || patient;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
