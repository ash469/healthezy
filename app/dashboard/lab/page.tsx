'use client';

import Link from 'next/link';
import '../../dashboard.css'; 

export default function LabDashboard() {
    // Mock data for Lab
    const labInfo = {
        name: "Lab's Name",
        speciality: "Blood Test | X-Ray | Scan | Urine Test | MRI/CT Scan",
        mobileNo: "9876543210",
        emailId: "labemail00@gmail.com",
        avatar: "/lab-avatar.png" 
    };

    const stats = {
        testsToday: 15,
        reportsPending: 15,
        totalPatients: 15
    };

    const upcomingBookings = [
        {
            id: 1,
            name: "Mr. Sanjay",
            test: "Fever | Cold",
            time: "11:30 AM",
            status: "Confirmed",
            badge: "bg-teal-500"
        },
        {
            id: 2,
            name: "Mr. Sanjay",
            test: "Fever | Cold",
            time: "11:30 AM",
            status: "Pending",
            badge: "bg-orange-500"
        }
    ];

    const pendingReports = [
        {
            id: 1,
            name: "Rahul Mishra",
            test: "CBC Test",
            status: "Active",
            statusColor: "bg-teal-500"
        },
        {
            id: 2,
            name: "Prince Mishra",
            test: "CBC Test",
            status: "Pending",
            statusColor: "bg-yellow-500"
        }
    ];

    return (
        <div className="patient-dashboard">
            <div className="dashboard-header">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0f766e] mb-8">
                    Lab Dashboard
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
                            <img src={labInfo.avatar} alt={labInfo.name} onError={(e) => e.currentTarget.style.display = 'none'} />
                            <div className="w-full h-full bg-white flex items-center justify-center text-gray-400">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19.424 19.536a2 2 0 01-2.828 0L9.939 12.879l5.657-5.657 6.657 6.657a2 2 0 010 2.828l-2.829 2.829zM4.929 15.536l-2.829-2.829a2 2 0 010-2.828l6.657-6.657 5.657 5.657-9.485 9.485z" /></svg>
                            </div>
                        </div>
                        <h3 className="profile-name">{labInfo.name}</h3>
                        <div className="profile-details">
                            <div className="detail-row">
                                <span className="detail-label">Speciality:</span>
                                <span className="detail-value text-right" style={{ maxWidth: '60%' }}>{labInfo.speciality}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Mobile No:</span>
                                <span className="detail-value">{labInfo.mobileNo}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Email Id:</span>
                                <span className="detail-value text-xs break-all">{labInfo.emailId}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions (Replacing Buttons) */}
                    <div className="quick-links-card">
                        <h3 className="section-title">Quick Actions</h3>
                        <button className="quick-link-btn teal">
                            Add / Update Test
                        </button>
                        <button className="quick-link-btn" style={{ background: 'white', color: '#0f766e', border: '1px solid #0f766e' }}>
                            Manage Bookings
                        </button>
                    </div>

                    {/* Upload Test Report (Matching Doctor Dashboard Style and Location) */}
                    <div className="insurance-card">
                        <h3 className="section-title">Upload Test Report</h3>
                        <div className="claims-count mb-4">Select Report File</div>

                        <div className="flex flex-col gap-3">
                            <div className="bg-white p-2 rounded-lg border border-teal-100 flex items-center justify-between">
                                <span className="text-sm text-gray-500">No file chosen</span>
                                <button className="px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700">Choose</button>
                            </div>
                            <input type="text" placeholder="Patient Name" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />
                            <input type="text" placeholder="Test Type" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />
                            <button className="claim-btn submit mt-2">Submit Report</button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats and Content */}
                <div className="content-section">
                    {/* Stats Grid - Adapted for Lab Performance (3 cards) */}
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        <div className="stat-card bg-gradient-to-br from-teal-400 to-teal-500">
                            <div className="stat-number">{stats.testsToday}</div>
                            <div className="stat-label">Tests Today</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-blue-400 to-blue-500">
                            <div className="stat-number">{stats.reportsPending}</div>
                            <div className="stat-label">Reports Pending</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-purple-400 to-purple-500">
                            <div className="stat-number">{stats.totalPatients}</div>
                            <div className="stat-label">Total Patients</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                    </div>

                    {/* Two Column Grid */}
                    <div className="two-column-grid">
                        {/* Upcoming Test Bookings */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Upcoming Test Bookings</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="appointments-list">
                                {upcomingBookings.map((booking) => (
                                    <div key={booking.id} className="appointment-item">
                                        <h3 className="appointment-doctor text-black">{booking.name}</h3>
                                        <p className="appointment-date">{booking.test}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-bold text-teal-700">{booking.time}</span>
                                            <span className={`appointment-badge ${booking.badge}`}>{booking.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pending Reports */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Pending Reports</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="patients-list">
                                {pendingReports.map((report) => (
                                    <div key={report.id} className="patient-item">
                                        <h3 className="patient-name">{report.name}</h3>
                                        <p className="patient-visit">{report.test}</p>
                                        <span className={`patient-badge ${report.statusColor}`}>{report.status}</span>
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
