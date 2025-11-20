import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ClipboardList,
  FileText,
  Users,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useDoctorLogoutMutation } from "@/store/api/doctorApiSlice";
import { usePatientLogoutMutation } from "@/store/api/patientApiSlice";
import toast from "react-hot-toast";
import { logout as doctorLogoutAction } from "@/store/slices/doctorSlice";
import { logout as patientLogoutAction } from "@/store/slices/patientSlice";

function SideBar({ role }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [doctorLogout] = useDoctorLogoutMutation();
  const [patientLogout] = usePatientLogoutMutation();

  const handleLogout = async () => {
    try {
      if (role === "doctor") {
        await doctorLogout().unwrap();
        dispatch(doctorLogoutAction());
        toast.success("Logged out!");
        navigate("/doctor/login");
      }

      if (role === "patient") {
        await patientLogout().unwrap();
        dispatch(patientLogoutAction());
        toast.success("Logged out!");
        navigate("/patient/login");
      }

    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed");
    }
  };

  const menuDoctor = [
    {
      title: "Consultation List",
      path: "/doctor/consultations",
      icon: <ClipboardList size={18} />,
    },
    {
      title: "Prescriptions",
      path: "/doctor/prescriptions",
      icon: <FileText size={18} />,
    },
  ];

  const menuPatient = [
    {
      title: "Doctors",
      path: "/patient/doctors",
      icon: <Users size={18} />,
    },
    {
      title: "Prescriptions",
      path: "/patient/prescriptions",
      icon: <FileText size={18} />,
    },
  ];

  const menu = role === "doctor" ? menuDoctor : menuPatient;

  return (
    <div className="w-64 bg-gray-900 text-gray-200 min-h-screen flex flex-col shadow-xl">

      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-wide text-white">
          {role === "doctor" ? "Doctor Panel" : "Patient Panel"}
        </h1>
      </div>

      <nav className="flex-1 mt-4 px-4 space-y-1">
        {menu.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all 
              cursor-pointer ${isActive
                ? "bg-blue-600 text-white shadow-md"
                : "hover:bg-gray-800 text-gray-300"
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
