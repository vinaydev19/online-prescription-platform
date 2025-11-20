import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function DashboardLayout({ role }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBar role={role} />

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
