import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const doctor = useSelector((state) => state.doctor.doctor);
  const patient = useSelector((state) => state.patient.patient);

  const isLoggedIn = doctor || patient; // if either logged in → allow

  return isLoggedIn ? <Outlet /> : <Navigate to="/patient/login" />;
}

export default ProtectedRoute;
