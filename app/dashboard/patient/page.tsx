import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Link from 'next/link';

export default function PatientDashboard() {
    const upcomingAppointments = [
        { id: 1, doctor: "Dr. Sarah Johnson", specialization: "Cardiologist", date: "Dec 20, 2025", time: "10:00 AM", status: "Confirmed" },
        { id: 2, doctor: "Dr. Michael Chen", specialization: "Pediatrician", date: "Dec 22, 2025", time: "2:30 PM", status: "Pending" }
    ];

    const recentLabReports = [
        { id: 1, test: "Complete Blood Count", lab: "HealthCare Diagnostics", date: "Dec 15, 2025", status: "Available" },
        { id: 2, test: "Lipid Profile", lab: "PathLab Solutions", date: "Dec 12, 2025", status: "Available" }
    ];

    const activePrescriptions = [
        { id: 1, medicine: "Amoxicillin 500mg", dosage: "3 times daily", duration: "7 days", doctor: "Dr. Sarah Johnson" },
        { id: 2, medicine: "Vitamin D3", dosage: "Once daily", duration: "30 days", doctor: "Dr. Michael Chen" }
    ];

    return (
        <DashboardLayout userType="patient" userName="John Doe">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className="text-gray-600">Manage your health records and appointments</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="text-3xl mb-2">📅</div>
                        <div className="text-3xl font-bold mb-1">2</div>
                        <div className="text-sm opacity-90">Upcoming Appointments</div>
                    </div>
                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="text-3xl mb-2">🧪</div>
                        <div className="text-3xl font-bold mb-1">5</div>
                        <div className="text-sm opacity-90">Lab Reports</div>
                    </div>
                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="text-3xl mb-2">💊</div>
                        <div className="text-3xl font-bold mb-1">2</div>
                        <div className="text-sm opacity-90">Active Prescriptions</div>
                    </div>
                    <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <div className="text-3xl mb-2">🏥</div>
                        <div className="text-3xl font-bold mb-1">3</div>
                        <div className="text-sm opacity-90">Insurance Claims</div>
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
                        <Link href="/doctors" className="btn btn-primary btn-sm">Book New</Link>
                    </div>
                    <div className="space-y-3">
                        {upcomingAppointments.map((apt) => (
                            <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">👨‍⚕️</div>
                                    <div>
                                        <h3 className="font-semibold">{apt.doctor}</h3>
                                        <p className="text-sm text-gray-600">{apt.specialization}</p>
                                        <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
                                    </div>
                                </div>
                                <span className={`badge ${apt.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>
                                    {apt.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Lab Reports */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Recent Lab Reports</h2>
                        <Link href="/labs" className="btn btn-primary btn-sm">Book Test</Link>
                    </div>
                    <div className="space-y-3">
                        {recentLabReports.map((report) => (
                            <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">📄</div>
                                    <div>
                                        <h3 className="font-semibold">{report.test}</h3>
                                        <p className="text-sm text-gray-600">{report.lab}</p>
                                        <p className="text-sm text-gray-500">{report.date}</p>
                                    </div>
                                </div>
                                <button className="btn btn-outline btn-sm">Download</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Prescriptions */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Active Prescriptions</h2>
                    <div className="space-y-3">
                        {activePrescriptions.map((prescription) => (
                            <div key={prescription.id} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-lg">{prescription.medicine}</h3>
                                    <Link href="/stores" className="btn btn-success btn-sm">Order Now</Link>
                                </div>
                                <p className="text-sm text-gray-600">Dosage: {prescription.dosage}</p>
                                <p className="text-sm text-gray-600">Duration: {prescription.duration}</p>
                                <p className="text-sm text-gray-500">Prescribed by: {prescription.doctor}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
