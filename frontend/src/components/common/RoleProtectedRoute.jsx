import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RoleProtectedRoute({ allowedRoles }) {
  const doctor = useSelector((state) => state.doctor.doctor);
  const patient = useSelector((state) => state.patient.patient);

  let role = null;

  if (doctor) role = "doctor";
  if (patient) role = "patient";

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/patient/login" />
  );
}

export default RoleProtectedRoute;
