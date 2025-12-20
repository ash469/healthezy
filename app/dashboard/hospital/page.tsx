import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function HospitalDashboard() {
    const doctorStats = [
        { name: "Dr. Sarah Johnson", specialization: "Cardiologist", appointments: 24, rating: 4.9 },
        { name: "Dr. Michael Chen", specialization: "Pediatrician", appointments: 18, rating: 4.8 },
        { name: "Dr. Emily Rodriguez", specialization: "Dermatologist", appointments: 21, rating: 4.9 },
        { name: "Dr. James Wilson", specialization: "Orthopedic", appointments: 15, rating: 4.7 }
    ];

    const todayAppointments = [
        { id: 1, patient: "John Doe", doctor: "Dr. Sarah Johnson", time: "10:00 AM", department: "Cardiology" },
        { id: 2, patient: "Jane Smith", doctor: "Dr. Michael Chen", time: "11:30 AM", department: "Pediatrics" },
        { id: 3, patient: "Mike Johnson", doctor: "Dr. Emily Rodriguez", time: "2:00 PM", department: "Dermatology" }
    ];

    return (
        <DashboardLayout userType="hospital" userName="City General Hospital">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Hospital Dashboard</h1>
                    <p className="text-gray-600">Manage doctors, appointments, and departments</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="text-3xl mb-2">👨‍⚕️</div>
                        <div className="text-3xl font-bold mb-1">45</div>
                        <div className="text-sm opacity-90">Total Doctors</div>
                    </div>
                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="text-3xl mb-2">📅</div>
                        <div className="text-3xl font-bold mb-1">123</div>
                        <div className="text-sm opacity-90">Today's Appointments</div>
                    </div>
                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="text-3xl mb-2">🏥</div>
                        <div className="text-3xl font-bold mb-1">12</div>
                        <div className="text-sm opacity-90">Departments</div>
                    </div>
                    <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <div className="text-3xl mb-2">💰</div>
                        <div className="text-3xl font-bold mb-1">$125K</div>
                        <div className="text-sm opacity-90">This Month Revenue</div>
                    </div>
                </div>

                {/* Doctor Performance */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Doctor Performance</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3">Doctor</th>
                                    <th className="text-left p-3">Specialization</th>
                                    <th className="text-left p-3">Appointments</th>
                                    <th className="text-left p-3">Rating</th>
                                    <th className="text-left p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctorStats.map((doctor, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-semibold">{doctor.name}</td>
                                        <td className="p-3">{doctor.specialization}</td>
                                        <td className="p-3">{doctor.appointments}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="font-semibold">{doctor.rating}</span>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <button className="btn btn-outline btn-sm">View Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Today's Appointments */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">Today's Appointments</h2>
                        <div className="space-y-3">
                            {todayAppointments.map((apt) => (
                                <div key={apt.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold">{apt.patient}</h3>
                                        <span className="badge badge-info">{apt.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{apt.doctor}</p>
                                    <p className="text-sm text-gray-500">{apt.department}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="btn btn-primary w-full">Add New Doctor</button>
                            <button className="btn btn-outline w-full">View All Appointments</button>
                            <button className="btn btn-outline w-full">Manage Departments</button>
                            <button className="btn btn-outline w-full">View Analytics</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
