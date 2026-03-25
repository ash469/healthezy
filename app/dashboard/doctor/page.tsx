'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '../../dashboard.css';
import { getDoctorDashboardData } from '@/services/doctor';
import type { DoctorDashboardData } from '@/types/dashboard/doctor';
import DoctorProfileModal from '@/components/dashboard/doctor/DoctorProfileModal';
import ResetPasswordModal from '@/components/dashboard/doctor/ResetPasswordModal';

export default function DoctorDashboard() {
    const [data, setData] = useState<DoctorDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await getDoctorDashboardData();
            if (result) {
                setData(result);
            } else {
                setError('Failed to load doctor dashboard data.');
            }
        } catch (err) {
            console.error("Dashboard error:", err);
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mb-4"></div>
                    <p className="text-teal-600 font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
                    <p className="text-gray-600 mb-6">{error || 'Something went wrong while loading your data.'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const { userInfo, doctorInfo, stats, todaysAppointments, recentPatients } = data;

    const fullName = userInfo
        ? ('first_name' in userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : userInfo.name)
        : doctorInfo.name;
    const userRole = userInfo?.role || 'Doctor';
    const userEmail = userInfo?.email || doctorInfo.emailId;
    const userPhone = userInfo?.phone_number || doctorInfo.mobileNo;

    return (
        <div className="patient-dashboard"> {/* Reusing class for background and padding */}
            <div className="dashboard-header">
                <h1 className="dashboard-title">
                    Doctor Dashboard
                </h1>
                <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="edit-profile-btn bg-[#0d5c63]"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                </button>
            </div>
            <div className="dashboard-grid">
                <div className="profile-section">
                    <div className="profile-card">
                        <div className="profile-avatar">
                            <img src={doctorInfo.avatar} alt={fullName} />
                        </div>
                        <h3 className="profile-name">{fullName}</h3>
                        <div className="profile-details">
                            <div className="detail-row">
                                <span className="detail-label">Role:</span>
                                <span className="detail-value capitalize">{userRole.toLowerCase()}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Experience:</span>
                                <span className="detail-value">{doctorInfo.experience} years</span>
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
                                <span className="detail-value">{userPhone}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Email Id:</span>
                                <span className="detail-value text-xs break-all">{userEmail}</span>
                            </div>
                        </div>
                    </div>
                    <div className="quick-links-card">
                        <h3 className="section-title">Quick Actions</h3>
                        <Link href="/dashboard/doctor/appointments" className="quick-link-btn teal block text-center">
                            Manage Appointments
                        </Link>
                        <Link href="/dashboard/doctor/schedule" className="quick-link-btn teal block text-center">
                            Manage Weekly Schedule
                        </Link>
                        <Link href="/dashboard/doctor/exceptions" className="quick-link-btn teal block text-center mt-2">
                            Add Leave / Special Hours
                        </Link>
                        <button
                            onClick={() => setIsResetPasswordModalOpen(true)}
                            className="quick-link-btn bg-teal-50 text-teal-700 border border-teal-200 block w-full text-center mt-2 hover:bg-teal-100 transition-colors py-2"
                        >
                            Reset Password
                        </button>
                    </div>
                    <div className="insurance-card">
                        <h3 className="section-title">Upload Prescription / Report</h3>
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
                <div className="content-section">
                    <div className="stats-grid">
                        <div className="stat-card bg-gradient-to-br from-teal-400 to-teal-500">
                            <div className="stat-number">{stats.appointments}</div>
                            <div className="stat-label">Appointments</div>
                            <Link href="/dashboard/doctor/appointments" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-blue-400 to-blue-500">
                            <div className="stat-number">{stats.patients}</div>
                            <div className="stat-label">My Patients</div>
                            <Link href="/dashboard/doctor/patients" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-purple-400 to-purple-500">
                            <div className="stat-number">{stats.reports}</div>
                            <div className="stat-label">Prescriptions</div>
                            <Link href="/dashboard/doctor/#" className="stat-link">View All</Link>
                        </div>
                        {/* <div className="stat-card bg-gradient-to-br from-pink-400 to-pink-500">
                            <div className="stat-number">{stats.earnings}</div>
                            <div className="stat-label">Total Earnings</div>
                            <Link href="/dashboard/doctor/#" className="stat-link">View Details</Link>
                        </div> */}
                    </div>
                    <div className="two-column-grid">
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Today's Appointment</h2>
                                <Link href="/dashboard/doctor/appointments" className="view-all-link">View All</Link>
                            </div>
                            <div className="appointments-list">
                                {todaysAppointments.length > 0 ? (
                                    todaysAppointments.slice(0, 3).map((apt) => (
                                        <div key={apt.id} className="appointment-item">
                                            <h3 className="appointment-doctor text-black">{apt.name}</h3>
                                            <p className="appointment-date">{apt.condition}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="font-bold text-teal-700">{apt.time}</span>
                                                <span className={`appointment-badge ${apt.badge}`}>{apt.status}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-gray-500">No appointments scheduled for today.</div>
                                )}
                            </div>
                        </div>

                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Recent Patients</h2>
                                <Link href="/dashboard/doctor/patients" className="view-all-link">View All</Link>
                            </div>
                            <div className="patients-list">
                                {recentPatients.length > 0 ? (
                                    recentPatients.slice(0, 3).map((patient) => (
                                        <div key={patient.id} className="patient-item">
                                            <h3 className="patient-name">{patient.name}</h3>
                                            <p className="patient-visit">Last Visit: {patient.lastVisit}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-gray-500">No recent patient history found.</div>
                                )}  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DoctorProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                doctor={data.doctor || null}
                onSuccess={fetchData}
            />
            <ResetPasswordModal
                isOpen={isResetPasswordModalOpen}
                onClose={() => setIsResetPasswordModalOpen(false)}
            />
        </div>
    );
}
