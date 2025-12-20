import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DoctorDashboard() {
    const todayAppointments = [
        { id: 1, patient: "John Doe", time: "10:00 AM", type: "Consultation", status: "Confirmed" },
        { id: 2, patient: "Jane Smith", time: "11:30 AM", type: "Follow-up", status: "Confirmed" },
        { id: 3, patient: "Mike Johnson", time: "2:00 PM", type: "Consultation", status: "Pending" },
        { id: 4, patient: "Sarah Williams", time: "3:30 PM", type: "Emergency", status: "Urgent" }
    ];

    const upcomingSlots = [
        { date: "Dec 20, 2025", slots: "5 available", booked: "3 booked" },
        { date: "Dec 21, 2025", slots: "8 available", booked: "2 booked" },
        { date: "Dec 22, 2025", slots: "6 available", booked: "4 booked" }
    ];

    return (
        <DashboardLayout userType="doctor" userName="Dr. Sarah Johnson">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Doctor Dashboard</h1>
                    <p className="text-gray-600">Manage your appointments and patients</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="text-3xl mb-2">📅</div>
                        <div className="text-3xl font-bold mb-1">4</div>
                        <div className="text-sm opacity-90">Today's Appointments</div>
                    </div>
                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="text-3xl mb-2">👥</div>
                        <div className="text-3xl font-bold mb-1">127</div>
                        <div className="text-sm opacity-90">Total Patients</div>
                    </div>
                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="text-3xl mb-2">⭐</div>
                        <div className="text-3xl font-bold mb-1">4.9</div>
                        <div className="text-sm opacity-90">Average Rating</div>
                    </div>
                    <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <div className="text-3xl mb-2">💰</div>
                        <div className="text-3xl font-bold mb-1">$12.5K</div>
                        <div className="text-sm opacity-90">This Month Earnings</div>
                    </div>
                </div>

                {/* Today's Appointments */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Today's Appointments</h2>
                    <div className="space-y-3">
                        {todayAppointments.map((apt) => (
                            <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">👤</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{apt.patient}</h3>
                                        <p className="text-sm text-gray-600">{apt.type}</p>
                                        <p className="text-sm text-gray-500">{apt.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`badge ${apt.status === 'Confirmed' ? 'badge-success' :
                                            apt.status === 'Urgent' ? 'badge-warning' : 'badge-info'
                                        }`}>
                                        {apt.status}
                                    </span>
                                    <button className="btn btn-primary btn-sm">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upcoming Slots */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">Upcoming Slots</h2>
                        <div className="space-y-3">
                            {upcomingSlots.map((slot, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold mb-1">{slot.date}</h3>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-green-600">{slot.slots}</span>
                                        <span className="text-gray-600">{slot.booked}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-outline w-full mt-4">Manage Slots</button>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="btn btn-primary w-full">Create Prescription</button>
                            <button className="btn btn-outline w-full">View Patient Records</button>
                            <button className="btn btn-outline w-full">Schedule Break</button>
                            <button className="btn btn-outline w-full">Update Availability</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
