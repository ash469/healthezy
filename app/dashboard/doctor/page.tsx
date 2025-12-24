'use client';

import Link from 'next/link';
import '../../dashboard.css';

export default function DoctorDashboard() {
    // Mock data for Doctor
    const doctorInfo = {
        name: "Doctor's Name",
        age: 36,
        gender: 'M',
        speciality: 'General Physician | MD',
        mobileNo: '9876543210',
        emailId: 'testmail00@gmail.com',
        avatar: '/doctor.png'
    };

    const stats = {
        appointments: 15,
        patients: 15,
        reports: 15,
        earnings: "12.5k"
    };

    const todaysAppointments = [
        {
            id: 1,
            name: "Mr. Sanjay",
            condition: "Fever | Cold",
            time: "11:30 AM",
            status: "Confirmed",
            badge: "bg-teal-500"
        },
        {
            id: 2,
            name: "Mr. Sanjay",
            condition: "Fever | Cold",
            time: "11:30 AM",
            status: "Pending",
            badge: "bg-orange-500"
        }
    ];

    const recentPatients = [
        {
            id: 1,
            name: "Rahul Mishra",
            lastVisit: "3 Nov",
            status: "Active",
            statusColor: "bg-teal-500"
        },
        {
            id: 2,
            name: "Prince Mishra",
            lastVisit: "30 Oct",
            status: "Pending",
            statusColor: "bg-yellow-500"
        }
    ];

    return (
        <div className="patient-dashboard"> {/* Reusing class for background and padding */}
            <div className="dashboard-header">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0f766e] mb-8">
                    Doctor Dashboard
                </h1>
                <button className="edit-profile-btn bg-[#0d5c63]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                </button>
            </div>

            {/* Main Grid Layout */}
            <div className="dashboard-grid">
                {/* Left Column - Profile & Actions */}
                <div className="profile-section">
                    <div className="profile-card">
                        <div className="profile-avatar">
                            {/* Use avatar image or fallback */}
                            <img src={doctorInfo.avatar} alt={doctorInfo.name} onError={(e) => e.currentTarget.style.display = 'none'} />
                            <div className="w-full h-full bg-white flex items-center justify-center text-gray-400">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                        </div>
                        <h3 className="profile-name">{doctorInfo.name}</h3>
                        <div className="profile-details">
                            <div className="detail-row">
                                <span className="detail-label">Age:</span>
                                <span className="detail-value">{doctorInfo.age}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Gender:</span>
                                <span className="detail-value">{doctorInfo.gender}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Speciality:</span>
                                <span className="detail-value text-right">{doctorInfo.speciality}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Mobile No:</span>
                                <span className="detail-value">{doctorInfo.mobileNo}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Email Id:</span>
                                <span className="detail-value text-xs break-all">{doctorInfo.emailId}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions (Replacing Quick Links) */}
                    <div className="quick-links-card">
                        <h3 className="section-title">Quick Actions</h3>
                        <button className="quick-link-btn teal">
                            Manage Appointments
                        </button>
                        <button className="quick-link-btn teal">
                            Generate Slots
                        </button>
                    </div>

                    {/* Upload Prescription (Replacing Insurance Card style) */}
                    <div className="insurance-card">
                        <h3 className="section-title">Upload Prescription</h3>
                        <div className="claims-count mb-4">Select File</div>

                        <div className="flex flex-col gap-3">
                            <div className="bg-white p-2 rounded-lg border border-teal-100 flex items-center justify-between">
                                <span className="text-sm text-gray-500">No file chosen</span>
                                <button className="px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700">Choose</button>
                            </div>
                            <input type="text" placeholder="Patient Name" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />
                            <button className="claim-btn submit mt-2">Submit Report</button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats and Content */}
                <div className="content-section">
                    {/* Stats Grid */}
                    <div className="stats-grid">
                        <div className="stat-card bg-gradient-to-br from-teal-400 to-teal-500">
                            <div className="stat-number">{stats.appointments}</div>
                            <div className="stat-label">Appointments</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-blue-400 to-blue-500">
                            <div className="stat-number">{stats.patients}</div>
                            <div className="stat-label">Patients</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-purple-400 to-purple-500">
                            <div className="stat-number">{stats.reports}</div>
                            <div className="stat-label">Reports</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-pink-400 to-pink-500">
                            <div className="stat-number">{stats.earnings}</div>
                            <div className="stat-label">Earnings</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                    </div>

                    {/* Two Column Grid */}
                    <div className="two-column-grid">
                        {/* Today's Appointments */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Today's Appointment</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="appointments-list">
                                {todaysAppointments.map((apt) => (
                                    <div key={apt.id} className="appointment-item">
                                        <h3 className="appointment-doctor text-black">{apt.name}</h3>
                                        <p className="appointment-date">{apt.condition}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-bold text-teal-700">{apt.time}</span>
                                            <span className={`appointment-badge ${apt.badge}`}>{apt.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Patients */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Recent Patients</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="patients-list">
                                {recentPatients.map((patient) => (
                                    <div key={patient.id} className="patient-item">
                                        <h3 className="patient-name">{patient.name}</h3>
                                        <p className="patient-visit">Last Visit: {patient.lastVisit}</p>
                                        <span className={`patient-badge ${patient.statusColor}`}>{patient.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
