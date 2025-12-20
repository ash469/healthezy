import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function LabDashboard() {
    const todayBookings = [
        { id: 1, patient: "John Doe", test: "Complete Blood Count", time: "9:00 AM", status: "Completed" },
        { id: 2, patient: "Jane Smith", test: "Lipid Profile", time: "10:30 AM", status: "In Progress" },
        { id: 3, patient: "Mike Johnson", test: "Thyroid Function Test", time: "2:00 PM", status: "Scheduled" },
        { id: 4, patient: "Sarah Williams", test: "Diabetes Screening", time: "3:30 PM", status: "Scheduled" }
    ];

    const pendingReports = [
        { id: 1, patient: "Alice Brown", test: "Liver Function Test", dueDate: "Dec 20, 2025" },
        { id: 2, patient: "Bob Wilson", test: "Kidney Function Test", dueDate: "Dec 20, 2025" },
        { id: 3, patient: "Carol Davis", test: "Complete Blood Count", dueDate: "Dec 21, 2025" }
    ];

    return (
        <DashboardLayout userType="lab" userName="HealthCare Diagnostics">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Lab Dashboard</h1>
                    <p className="text-gray-600">Manage test bookings and reports</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="text-3xl mb-2">📅</div>
                        <div className="text-3xl font-bold mb-1">12</div>
                        <div className="text-sm opacity-90">Today's Bookings</div>
                    </div>
                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="text-3xl font-bold mb-1">250</div>
                        <div className="text-sm opacity-90">Available Tests</div>
                    </div>
                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="text-3xl mb-2">📄</div>
                        <div className="text-3xl font-bold mb-1">8</div>
                        <div className="text-sm opacity-90">Pending Reports</div>
                    </div>
                    <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <div className="text-3xl mb-2">💰</div>
                        <div className="text-3xl font-bold mb-1">$8.5K</div>
                        <div className="text-sm opacity-90">This Month Revenue</div>
                    </div>
                </div>

                {/* Today's Bookings */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Today's Test Bookings</h2>
                    <div className="space-y-3">
                        {todayBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-2xl">🧪</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{booking.patient}</h3>
                                        <p className="text-sm text-gray-600">{booking.test}</p>
                                        <p className="text-sm text-gray-500">{booking.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`badge ${booking.status === 'Completed' ? 'badge-success' :
                                            booking.status === 'In Progress' ? 'badge-warning' : 'badge-info'
                                        }`}>
                                        {booking.status}
                                    </span>
                                    <button className="btn btn-primary btn-sm">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pending Reports */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">Pending Reports</h2>
                        <div className="space-y-3">
                            {pendingReports.map((report) => (
                                <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold">{report.patient}</h3>
                                        <button className="btn btn-success btn-sm">Upload Report</button>
                                    </div>
                                    <p className="text-sm text-gray-600">{report.test}</p>
                                    <p className="text-sm text-gray-500">Due: {report.dueDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="btn btn-primary w-full">Add New Test</button>
                            <button className="btn btn-outline w-full">View All Bookings</button>
                            <button className="btn btn-outline w-full">Manage Test Packages</button>
                            <button className="btn btn-outline w-full">View Revenue</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
