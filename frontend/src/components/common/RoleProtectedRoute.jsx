import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function RoleProtectedRoute({ allowedRoles }) {
  const role = "doctor"; 

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/" />;
}

export default RoleProtectedRoute;
