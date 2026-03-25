'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../dashboard.css';
import { getHospitalDashboardData, getHospitalApplication } from '@/services/hospital';
import { getCurrentUser } from '@/services/auth';
import type { HospitalDashboardData } from '@/types/dashboard/hospital';
import type { UserProfile } from '@/services/auth/types';
import type { HospitalApplicationResponse } from '@/types/hospital';

export default function HospitalDashboard() {
    const [data, setData] = useState<HospitalDashboardData | null>(null);
    const [applications, setApplications] = useState<HospitalApplicationResponse[]>([]);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getCurrentUser().catch(err => {
                console.error("Failed to fetch user:", err);
                return null;
            }),
            getHospitalApplication().catch(err => {
                console.error("Failed to fetch apps:", err);
                return [];
            }),
            getHospitalDashboardData().catch(err => {
                console.error("Failed to fetch dashboard data:", err);
                return null;
            })
        ]).then(([userRes, appsRes, dataRes]) => {
            setUser(userRes);
            setApplications(appsRes);
            setData(dataRes);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-[#0f766e] font-semibold">Loading dashboard data...</div>;
    }

    const hospitalInfo = data?.hospitalInfo || {
        name: user ? (('first_name' in user) ? `${user.first_name} ${user.last_name || ''}`.trim() : user.email) : 'Hospital Profile',
        speciality: 'Pending Application',
        mobileNo: user?.phone_number || '--',
        emailId: user?.email || '--',
        logoUrl: '',
    };

    const stats = data?.stats || { appointmentsToday: 0, activeDoctors: 0, reportsProcessed: 0 };
    const todaysAppointments = data?.todaysAppointments || [];
    const activeDoctors = data?.activeDoctors || [];

    return (
        <div className="patient-dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">
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
                            <div className="w-full h-full bg-white flex items-center justify-center text-gray-400 overflow-hidden">
                                {hospitalInfo.logoUrl ? (
                                    <img src={hospitalInfo.logoUrl} alt={hospitalInfo.name} className="w-full h-full object-cover" />
                                ) : (
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                )}
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
                                <span className="detail-value">{hospitalInfo.mobileNo || '--'}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Email Id:</span>
                                <span className="detail-value text-xs break-all">{hospitalInfo.emailId || '--'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-links-card">
                        <h3 className="section-title">Quick Actions</h3>

                        <Link href="/dashboard/hospital/apply" className="quick-link-btn teal block text-center mb-3">
                            Register New Hospital
                        </Link>
                        <Link href="/dashboard/hospital/doctors" className="quick-link-btn block text-center mb-3 bg-white text-[#0f766e] border border-[#0f766e] hover:bg-teal-50 transition-colors">
                            Manage Doctors
                        </Link>
                        <Link href="/dashboard/hospital/appointments" className="quick-link-btn block text-center bg-white text-[#0f766e] border border-[#0f766e] hover:bg-teal-50 transition-colors">
                            Manage Appointments
                        </Link>
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
                    {/* Stats Grid */}
                    <div className="stats-grid">
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
                                {todaysAppointments.length === 0 ? (
                                    <div className="text-gray-500 text-sm py-4 text-center">No appointments today.</div>
                                ) : (
                                    todaysAppointments.slice(0, 3).map((apt) => (
                                        <div key={apt.id} className="appointment-item relative">
                                            <h3 className="appointment-doctor text-black">{apt.name}</h3>
                                            <p className="appointment-date">{apt.details}</p>
                                            <span className={`bg-teal-600 text-white px-2 py-1 rounded text-xs font-bold absolute top-4 right-4`}>{apt.time}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Active Doctors */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Active Doctors</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="patients-list">
                                {activeDoctors.length === 0 ? (
                                    <div className="text-gray-500 text-sm py-4 text-center">No active doctors found.</div>
                                ) : (
                                    activeDoctors.slice(0, 3).map((doc) => (
                                        <div key={doc.id} className="patient-item relative">
                                            <h3 className="patient-name">{doc.name}</h3>
                                            <p className="patient-visit text-xs text-gray-500 mt-1">{doc.speciality}</p>
                                            <span className={`patient-badge ${doc.statusColor}`} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>{doc.status}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Hospital Applications */}
                        <div className="content-card" style={{ gridColumn: '1 / -1' }}>
                            <div className="card-header">
                                <h2 className="card-title">Hospital Applications</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="patients-list">
                                {applications.length === 0 ? (
                                    <div className="text-gray-500 text-sm py-4 text-center">No applications found.</div>
                                ) : (
                                    applications.slice(0, 3).map((app) => (
                                        <div key={app.id} className="patient-item relative mb-2">
                                            <h3 className="patient-name">{app.name}</h3>
                                            <p className="patient-visit text-xs text-gray-500 mt-1">{app.city}, {app.state}</p>
                                            <span className={`patient-badge ${app.status === 'ACCEPTED' ? 'bg-green-600' :
                                                app.status === 'WITHDRAWN' ? 'bg-red-600' :
                                                    app.status === 'REVIEW' ? 'bg-blue-600' :
                                                        'bg-yellow-500'
                                                }`} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>{app.status}</span>
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