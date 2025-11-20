import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as doctorLogout } from "@/redux/slices/doctorSlice";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(doctorLogout());
    navigate("/doctor/login");
  };

  const linkClass =
    "block px-4 py-2 rounded hover:bg-blue-600 hover:text-white";

  const activeClass = "bg-blue-700 text-white";

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b border-gray-700">
        Doctor Panel
      </h2>

      <nav className="flex-1 mt-4 flex flex-col gap-1">
        <NavLink
          to="/doctor/dashboard"
          className={({ isActive }) =>
            isActive ? `${linkClass} ${activeClass}` : linkClass
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/doctor/prescriptions"
          className={({ isActive }) =>
            isActive ? `${linkClass} ${activeClass}` : linkClass
          }
        >
          Prescriptions
        </NavLink>

        <NavLink
          to="/doctor/patients"
          className={({ isActive }) =>
            isActive ? `${linkClass} ${activeClass}` : linkClass
          }
        >
          Patient Consultations
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="m-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default SideBar;
