'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../dashboard.css';
import { getCurrentUser } from '@/services/auth';
import { getMyLabApplications, getMyManagedLabs } from '@/services/lab';
import type { LabResponse } from '@/types/lab';

export default function LabDashboard() {
    const [userProfile, setUserProfile] = useState<any>(null);
    const [applications, setApplications] = useState<LabResponse[]>([]);
    const [managedLabs, setManagedLabs] = useState<LabResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showLabSelector, setShowLabSelector] = useState(false);
    const [destination, setDestination] = useState<'tests' | 'bookings'>('tests');

    useEffect(() => {
        Promise.all([
            getCurrentUser(),
            getMyLabApplications().catch(() => []),
            getMyManagedLabs().catch(() => [])
        ]).then(([userRes, appsRes, managedRes]) => {
           
            setUserProfile(userRes);
            setApplications(appsRes);
            
            // Set managed labs with application fallback
            let resolvedLabs = managedRes.length > 0 ? managedRes : appsRes.filter(app => app.status === 'ACCEPTED');
            setManagedLabs(resolvedLabs);
            
            setLoading(false);
        }).catch(err => {
            console.error("Dashboard Load Error:", err);
            setLoading(false);
        });
    }, []);


    const selectLab = (labId: number) => {
        const path = destination === 'tests' 
            ? `/dashboard/lab/${labId}/tests` 
            : `/dashboard/lab/bookings?lab_id=${labId}`;
        window.location.href = path;
    };

    if (loading) {
        return <div className="p-8 text-center text-[#0f766e] font-semibold">Loading dashboard data...</div>;
    }

    if (!userProfile) {
        return <div className="p-8 text-center text-[#0f766e] font-semibold">Failed to load lab dashboard data.</div>;
    }

    const labInfo = {
        name: ('first_name' in userProfile) ? `${userProfile.first_name} ${userProfile.last_name || ''}` : userProfile.email,
        speciality: 'Laboratory',
        mobileNo: ('phone_number' in userProfile) ? userProfile.phone_number : 'N/A',
        emailId: userProfile.email,
        avatar: "/doctor.png"
    };

    const stats = { testsToday: 0, reportsPending: 0, totalPatients: 0 };
    const upcomingBookings: any[] = [];
    const pendingReports: any[] = [];
    

    const handleManageTests = () => {
        if (managedLabs.length === 0) {
            alert("No active laboratories found. Please wait for application approval.");
            return;
        }
        setDestination('tests');
        setShowLabSelector(true);
    };

    const handleManageBookings = () => {
        window.location.href = `/dashboard/lab/bookings`;
    };

    return (
        <div className="patient-dashboard">
            {showLabSelector && (
                <div className="fixed inset-0 bg-teal-900/60 backdrop-blur-xl flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 bg-[#0f766e] text-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">Select Laboratory</h2>
                                    <p className="text-teal-100 text-xs font-bold uppercase tracking-widest mt-1">Which lab are you managing today?</p>
                                </div>
                                <button onClick={() => setShowLabSelector(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-8 space-y-4 max-h-[60vh] overflow-y-auto bg-gray-50/50">
                            {managedLabs.map(lab => (
                                <button
                                    key={lab.id} 
                                    onClick={() => selectLab(lab.id)}
                                    className="w-full flex items-center gap-4 p-5 rounded-3xl border-2 border-white bg-white hover:border-teal-200 shadow-sm hover:shadow-md transition-all group text-left"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-2xl group-hover:bg-teal-100 transition-all">
                                        {lab.name[0]}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-gray-900 text-lg">{lab.name}</h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-teal-600">{lab.city}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{lab.lab_code}</span>
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-300 group-hover:text-teal-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="dashboard-header flex items-center justify-between">
                <div>
                    <h1 className="dashboard-title">
                        Lab Dashboard
                    </h1>
                </div>
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
                            {labInfo.avatar ? (
                                <img src={labInfo.avatar} alt={labInfo.name} />
                            ) : (
                                <div className="w-full h-full bg-white flex items-center justify-center text-[#0d5c63]">
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.424 19.536a2 2 0 01-2.828 0L9.939 12.879l5.657-5.657 6.657 6.657a2 2 0 010 2.828l-2.829 2.829zM4.929 15.536l-2.829-2.829a2 2 0 010-2.828l6.657-6.657 5.657 5.657-9.485 9.485z" />
                                    </svg>
                                </div>
                            )}
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
                        <Link href="/dashboard/lab/apply" className="quick-link-btn teal block text-center" style={{ textDecoration: 'none' }}>
                            Register New Lab
                        </Link>
                        <button 
                            onClick={handleManageTests}
                            className="quick-link-btn flex items-center justify-center w-full bg-white text-[#0f766e] border border-[#0f766e] hover:bg-teal-50 transition-colors"
                        >
                            Add / Update Test
                        </button>
                        <button 
                            onClick={handleManageBookings}
                            className="quick-link-btn flex items-center justify-center w-full bg-white text-[#0f766e] border border-[#0f766e] hover:bg-teal-50 transition-colors"
                        >
                            Manage Bookings
                        </button>
                    </div>

                    {/* Upload Test Report */}
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
                    {/* Stats Grid */}
                    <div className="stats-grid">
                        <div className="stat-card bg-gradient-to-br from-teal-400 to-teal-500">
                            <div className="stat-number">{stats.testsToday}</div>
                            <div className="stat-label">Tests Today</div>
                            <button onClick={handleManageTests} className="stat-link bg-transparent border-none p-0 cursor-pointer text-white underline font-bold">View All</button>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-blue-400 to-blue-500">
                            <div className="stat-number">{stats.reportsPending}</div>
                            <div className="stat-label">Reports Pending</div>
                            <Link href="/dashboard/lab/bookings" className="view-all-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-purple-400 to-purple-500">
                            <div className="stat-number">{stats.totalPatients}</div>
                            <div className="stat-label">Total Patients</div>
                            <Link href="/dashboard/lab/bookings" className="view-all-link">View All</Link>
                        </div>
                    </div>

                    {/* Two Column Grid */}
                    <div className="two-column-grid">
                        {/* Upcoming Test Bookings */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Upcoming Test Bookings</h2>
                                <Link href="/dashboard/lab/bookings" className="view-all-link">View All</Link>
                            </div>
                            <div className="appointments-list">
                                {upcomingBookings.slice(0, 3).map((booking) => (
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

                        {/* Lab Applications (Replacing Pending Reports) */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Lab Applications</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="patients-list">
                                {applications.length === 0 ? (
                                    <div className="text-gray-500 text-sm py-4 text-center">No lab applications found.</div>
                                ) : (
                                    applications.slice(0, 3).map((app) => (
                                        <div key={app.id} className="patient-item">
                                            <h3 className="patient-name text-black">{app.name}</h3>
                                            <p className="patient-visit text-xs text-gray-500 mt-1">{app.city}, {app.state}</p>
                                            <span className={`patient-badge ${app.status === 'ACCEPTED' ? 'bg-green-600' :
                                                    app.status === 'REJECTED' ? 'bg-red-600' :
                                                        app.status === 'UNDER_REVIEW' ? 'bg-blue-600' :
                                                            'bg-yellow-500'
                                                }`} style={{ marginLeft: 'auto' }}>{app.status}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}