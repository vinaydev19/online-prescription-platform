import React from "react";

function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Doctor Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-gray-500">Total Patients</h3>
                    <p className="text-3xl font-bold mt-2">42</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-gray-500">Consultations Today</h3>
                    <p className="text-3xl font-bold mt-2">7</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h3 className="text-gray-500">Pending Prescriptions</h3>
                    <p className="text-3xl font-bold mt-2">3</p>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
