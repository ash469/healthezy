'use client';

import Link from 'next/link';
import '../../dashboard.css'; 

export default function HospitalDashboard() {
    // Mock data for Hospital
    const hospitalInfo = {
        name: "Hospital's Name",
        speciality: "Cardiology | Neurology | Oncology",
        mobileNo: "9876543210",
        emailId: "testmail00@gmail.com",
        address: "123 Health Street, Med City"
    };

    const stats = {
        appointmentsToday: 15,
        activeDoctors: 15,
        reportsProcessed: 15
    };

    const todaysAppointments = [
        {
            id: 1,
            name: "Ravi Sharma",
            details: "Cardiology • Dr. Rajesh Kumar",
            time: "11:30 AM",
            badge: "bg-teal-500"
        },
        {
            id: 2,
            name: "Ravi Sharma",
            details: "Cardiology • Dr. Vinay Kumar",
            time: "11:30 AM",
            badge: "bg-teal-500"
        }
    ];

    const activeDoctors = [
        {
            id: 1,
            name: "Dr. Mehra",
            speciality: "General Physician",
            status: "Active",
            statusColor: "bg-teal-500"
        },
        {
            id: 2,
            name: "Dr. Mehra",
            speciality: "General Physician",
            status: "Offline",
            statusColor: "bg-yellow-500"
        }
    ];

    return (
        <div className="patient-dashboard">
            <div className="dashboard-header">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0f766e] mb-8">
                    Hospital Dashboard
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
                            {/* Placeholder Avatar */}
                            <div className="w-full h-full bg-white flex items-center justify-center text-gray-400">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                        <h3 className="profile-name">{hospitalInfo.name}</h3>
                        <div className="profile-details">
                            <div className="detail-row">
                                <span className="detail-label">Speciality:</span>
                                <span className="detail-value text-right" style={{ maxWidth: '60%' }}>{hospitalInfo.speciality}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Mobile No:</span>
                                <span className="detail-value">{hospitalInfo.mobileNo}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Email Id:</span>
                                <span className="detail-value text-xs break-all">{hospitalInfo.emailId}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Address:</span>
                                <span className="detail-value text-right text-xs" style={{ maxWidth: '60%' }}>{hospitalInfo.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-links-card">
                        <h3 className="section-title">Quick Actions</h3>
                        <button className="quick-link-btn teal">
                            Manage Doctors
                        </button>
                        <button className="quick-link-btn" style={{ background: 'white', color: '#0f766e', border: '1px solid #0f766e' }}>
                            Manage Appointments
                        </button>
                    </div>

                    {/* Upload Patient Report (Placed in Left Column for Consistency with Lab/Doctor) */}
                    <div className="insurance-card">
                        <h3 className="section-title">Upload Patient Report</h3>
                        <div className="claims-count mb-4">Select Report File</div>

                        <div className="flex flex-col gap-3">
                            <div className="bg-white p-2 rounded-lg border border-teal-100 flex items-center justify-between">
                                <span className="text-sm text-gray-500">No file chosen</span>
                                <button className="px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700">Choose</button>
                            </div>
                            <input type="text" placeholder="Patient Name" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />
                            <input type="text" placeholder="Department" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />
                            <button className="claim-btn submit mt-2">Submit Report</button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats and Content */}
                <div className="content-section">
                    {/* Stats Grid - 3 Columns */}
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        <div className="stat-card bg-gradient-to-br from-teal-400 to-teal-500">
                            <div className="stat-number">{stats.appointmentsToday}</div>
                            <div className="stat-label">Appointments Today</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-blue-400 to-blue-500">
                            <div className="stat-number">{stats.activeDoctors}</div>
                            <div className="stat-label">Active Doctors</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-purple-400 to-purple-500">
                            <div className="stat-number">{stats.reportsProcessed}</div>
                            <div className="stat-label">Reports Processed</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="two-column-grid">
                        {/* Today's Appointments */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Today's Appointments</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="appointments-list">
                                {todaysAppointments.map((apt) => (
                                    <div key={apt.id} className="appointment-item">
                                        <h3 className="appointment-doctor text-black">{apt.name}</h3>
                                        <p className="appointment-date">{apt.details}</p>
                                        <span className={`bg-teal-600 text-white px-2 py-1 rounded text-xs font-bold absolute top-4 right-4`}>{apt.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Doctors */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Active Doctors</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="patients-list">
                                {activeDoctors.map((doc) => (
                                    <div key={doc.id} className="patient-item">
                                        <h3 className="patient-name">{doc.name}</h3>
                                        <p className="patient-visit">{doc.speciality}</p>
                                        <span className={`patient-badge ${doc.statusColor}`}>{doc.status}</span>
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
