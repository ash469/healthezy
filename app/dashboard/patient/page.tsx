'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../dashboard.css';
import { getPatientDashboardData, getPatientById } from '@/services/patient';
import type { Patient } from '@/types/patient';
import type { PatientDashboardData } from '@/types/dashboard/patient';
import PatientFormModal from '@/components/dashboard/patient/PatientFormModal';

export default function PatientDashboard() {
    const [data, setData] = useState<PatientDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [isFetchingDetails, setIsFetchingDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPatientId, setEditingPatientId] = useState<number | null>(null);
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await getPatientDashboardData();
            setData(result);
        } catch (err: any) {
            console.error("Dashboard error:", err);
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleFormSuccess = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingPatientId(null);
        setSelectedPatient(null);
        fetchData();
    };

    const handleFormClose = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingPatientId(null);
        setSelectedPatient(null);
    };

    const handleViewDetails = async (patientId: number) => {
        try {
            setIsFetchingDetails(true);
            const details = await getPatientById(patientId);
            setSelectedPatient(details);
            setIsDetailsOpen(true);
        } catch (err: any) {
            console.error("Error fetching patient details:", err);
            alert("Failed to fetch patient details. Please try again.");
        } finally {
            setIsFetchingDetails(false);
        }
    };

    const handleEdit = (patient: any) => {
        setIsDetailsOpen(false);
        setSelectedPatient(patient);
        setIsEditing(true);
        setEditingPatientId(patient.id);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setIsDetailsOpen(false);
        setSelectedPatient(null);
        setIsEditing(false);
        setEditingPatientId(null);
        setIsModalOpen(true);
    };

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

    const {
        userInfo,
        patientInfo,
        stats,
        upcomingAppointments,
        labReports,
        patients,
        recentReports,
        insuranceClaims
    } = data;

    const fullName = userInfo
        ? (('first_name' in userInfo) ? `${userInfo.first_name} ${userInfo.last_name || ''}`.trim() : (userInfo as any).name)
        : patientInfo.name;
    const userRole = userInfo?.role || 'Patient';
    const userEmail = userInfo?.email || patientInfo.emailId;
    const userPhone = userInfo?.phone_number || patientInfo.mobileNo;

    return (
        <div className="patient-dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">
                    Patient Dashboard
                </h1>
                <Link href="/profile" className="edit-profile-btn bg-[#0d5c63]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                </Link>
            </div>

            {/* Main Grid Layout */}
            <div className="dashboard-grid">
                {/* Left Column - Profile Card */}
                <div className="profile-section">
                    <div className="profile-card">
                        <div className="profile-avatar">
                            <img src={patientInfo.avatar} alt={fullName} />
                        </div>
                        <h3 className="profile-name">{fullName}</h3>
                        <div className="profile-details">
                            <div className="detail-row">
                                <span className="detail-label">Role:</span>
                                <span className="detail-value capitalize">{userRole.toLowerCase()}</span>
                            </div>
                            {patientInfo.age !== undefined && patientInfo.age !== 0 && (
                                <div className="detail-row">
                                    <span className="detail-label">Age:</span>
                                    <span className="detail-value">{patientInfo.age}</span>
                                </div>
                            )}
                            {patientInfo.gender && (
                                <div className="detail-row">
                                    <span className="detail-label">Gender:</span>
                                    <span className="detail-value">{patientInfo.gender}</span>
                                </div>
                            )}
                            {patientInfo.bloodGroup && (
                                <div className="detail-row">
                                    <span className="detail-label">Blood Group:</span>
                                    <span className="detail-value">{patientInfo.bloodGroup}</span>
                                </div>
                            )}
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

                    {/* Quick Links */}
                    <div className="quick-links-card">
                        <h3 className="section-title">Quick Link</h3>
                        <Link href="/doctors" className="quick-link-btn teal">
                            Book a Doctor
                        </Link>
                        <Link href="/labs" className="quick-link-btn teal">
                            Lab Examination
                        </Link>
                    </div>


                    {/* <div className="blog-card">
                        <h3 className="section-title">Message</h3>
                        <div className="blog-stats">
                            <div className="blog-stat">
                                <span className="stat-icon">💬</span>
                                <div>
                                    <div className="text-black">Msg</div>
                                    <div className="text-black">0</div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Insurance Claims */}
                    {/* <div className="insurance-card">
                        <h3 className="section-title">Insurance Claims</h3>
                        <div className="claims-count">2 Claims</div>
                        <Link href="#" className="view-all-link">View All</Link>

                        {insuranceClaims.map((claim, idx) => (
                            <div key={idx} className="claim-item">
                                <h4 className="claim-hospital">{claim.hospital}</h4>
                                <div className="claim-amount">{claim.amount}</div>
                                <div className="claim-status">Status: <span className="status-text">{claim.status}</span></div>
                                <div className="claim-progress">
                                    <div className="progress-bar" style={{ width: `${claim.progress}%` }}></div>
                                </div>
                                <div className="claim-actions">
                                    <button className="claim-btn submit">Submit Details</button>
                                    <button className="claim-btn cancel">Cancel Claim</button>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>

                {/* Right Column - Stats and Content */}
                <div className="content-section">
                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card bg-gradient-to-br from-teal-400 to-teal-500">
                            <div className="stat-number">{stats.patients}</div>
                            <div className="stat-label">No. Of Patient</div>
                            <Link href="/dashboard/patient/users" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-blue-400 to-blue-500">
                            <div className="stat-number">{stats.appointments}</div>
                            <div className="stat-label">No. Of Appointments</div>
                            <Link href="/appointments" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-purple-400 to-purple-500">
                            <div className="stat-number">{stats.prescriptions}</div>
                            <div className="stat-label">Prescriptions</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-pink-400 to-pink-500">
                            <div className="stat-number">{stats.labTests}</div>
                            <div className="stat-label">Lab Tests</div>
                            <Link href="/dashboard/patient/lab-bookings" className="stat-link">View All</Link>
                        </div>
                    </div>

                    {/* Two Column Layout for Appointments and Lab Reports */}
                    <div className="two-column-grid">
                        {/* Upcoming Appointments */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Upcoming Appointments</h2>
                                <Link href="/appointments" className="view-all-link">View All</Link>
                            </div>
                            <div className="appointments-list">
                                {upcomingAppointments.slice(0, 3).map((apt) => (
                                    <div key={apt.id} className="appointment-item">
                                        <div>
                                            <h3 className="appointment-doctor">{apt.doctor}</h3>
                                            <p className="text-sm text-gray-600 font-medium">Patient: {apt.patient}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="appointment-date font-bold text-gray-700">{apt.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lab Test Reports */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Lab Tests</h2>
                                <Link href="/dashboard/patient/lab-bookings" className="view-all-link">View All</Link>
                            </div>
                            <div className="lab-reports-list">
                                {labReports.slice(0, 3).map((report) => (
                                    <div key={report.id} className="lab-report-item">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="lab-name text-amber-900 font-bold">{report.lab}</h3>
                                                <p className="lab-test text-amber-800/80">{report.test}</p>
                                                <p className="text-xs font-bold text-teal-700 mt-1">₹{report.price}</p>
                                            </div>
                                            <p className="text-[10px] font-black text-amber-900/40 uppercase tracking-widest">{report.date}</p>
                                        </div>
                                        <span className={`lab-badge ${report.badge} mt-2`}>{report.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Patients and Recent Orders */}
                    <div className="two-column-grid">
                        {/* Patients */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Patients</h2>
                                <button
                                    onClick={handleAddNew}
                                    className="add-patient-btn bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded transition-colors"
                                >
                                    Add Patient
                                </button>
                            </div>
                            <div className="patients-list">
                                {patients.slice(0, 3).map((patient) => (
                                    <div key={patient.id} className="patient-item">
                                        <h3 className="patient-name">{patient.name}</h3>
                                        <p className="patient-type">{patient.type}</p>
                                        <p className="patient-visit">Next Visit: {patient.nextVisit}</p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewDetails(patient.id)}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 hover:opacity-80 transition-opacity cursor-pointer`}
                                                disabled={isFetchingDetails}
                                            >
                                                {isFetchingDetails && selectedPatient?.id === patient.id ? 'Loading...' : 'View Details'}
                                            </button>
                                            <button
                                                onClick={() => handleEdit(patient)}
                                                className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link href="/dashboard/patient/users" className="view-all-users">View All Users</Link>
                        </div>

                        {/* Recent Reports */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Recent Reports</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                        </div>
                    </div>

                    {/* Bill & Claim Tracker */}
                    {/* <div className="content-card bill-tracker-card">
                        <div className="card-header">
                            <h2 className="card-title">Bill & Claim Tracker</h2>
                            <span className="hospital-name">City Hospital</span>
                        </div>
                        <div className="bill-details">
                            <div className="bill-row">
                                <span className="bill-label">Status</span>
                                <span className="bill-status">Under Review</span>
                            </div>
                            <div className="bill-row">
                                <span className="bill-label">Hospital</span>
                                <span className="bill-value">City Hospital</span>
                            </div>
                            <div className="bill-row">
                                <span className="bill-label">Payment</span>
                                <span className="bill-value">Rs. 50,000</span>
                            </div>
                            <div className="bill-actions">
                                <button className="bill-btn submit">Submit Details</button>
                                <button className="bill-btn cancel">Cancel Claim</button>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Add Patient Modal */}
            <PatientFormModal
                isOpen={isModalOpen}
                onClose={handleFormClose}
                onSuccess={handleFormSuccess}
                initialData={selectedPatient}
            />

            {/* Patient Details Modal */}
            {
                isDetailsOpen && selectedPatient && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-teal-800">{selectedPatient.full_name}</h2>
                                    <p className="text-gray-500 text-sm">Patient Code: {selectedPatient.patient_code}</p>
                                </div>
                                <button
                                    onClick={() => setIsDetailsOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-6 space-y-8">
                                {/* Personal & Medical Summary */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-teal-700 border-b pb-2">Personal Information</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Gender</p>
                                                <p className="font-medium capitalize">{selectedPatient.gender}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Age</p>
                                                <p className="font-medium">{selectedPatient.age} Years</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Date of Birth</p>
                                                <p className="font-medium">{selectedPatient.date_of_birth}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Blood Group</p>
                                                <p className="font-medium uppercase">{selectedPatient.blood_group || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Nationality</p>
                                                <p className="font-medium">{selectedPatient.nationality}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Marital Status</p>
                                                <p className="font-medium capitalize">{selectedPatient.marital_status || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-teal-700 border-b pb-2">Contact Details</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="col-span-2">
                                                <p className="text-gray-500">Email</p>
                                                <p className="font-medium">{selectedPatient.email || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Phone</p>
                                                <p className="font-medium">{selectedPatient.phone_number}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Language</p>
                                                <p className="font-medium">{selectedPatient.language_preference || 'N/A'}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-gray-500">Address</p>
                                                <p className="font-medium">{selectedPatient.address}, {selectedPatient.city}, {selectedPatient.state} - {selectedPatient.zip_code}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Medical History Section */}
                                <div className="bg-teal-50 rounded-xl p-6 space-y-4">
                                    <h3 className="text-lg font-semibold text-teal-800 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Medical Assessment
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-teal-600 font-medium mb-1">Medical History</p>
                                            <p className="text-gray-700 bg-white p-3 rounded-lg border border-teal-100 min-h-[60px] text-sm">
                                                {selectedPatient.medical_history || 'No recorded history'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-teal-600 font-medium mb-1">Allergies</p>
                                            <p className="text-gray-700 bg-white p-3 rounded-lg border border-teal-100 min-h-[60px] text-sm font-semibold text-red-600">
                                                {selectedPatient.allergies || 'None reported'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-teal-600 font-medium mb-1">Chronic Conditions</p>
                                            <p className="text-gray-700 bg-white p-3 rounded-lg border border-teal-100 min-h-[60px] text-sm">
                                                {selectedPatient.chronic_conditions || 'None reported'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-teal-600 font-medium mb-1">Current Medications</p>
                                            <p className="text-gray-700 bg-white p-3 rounded-lg border border-teal-100 min-h-[60px] text-sm">
                                                {selectedPatient.current_medications || 'None'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Emergency & Insurance */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-teal-700 border-b pb-2">Emergency Contact</h3>
                                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                            <p className="font-bold text-orange-900">{selectedPatient.emergency_contact_name}</p>
                                            <p className="text-orange-700 text-sm">({selectedPatient.emergency_contact_relation})</p>
                                            <p className="text-orange-900 font-medium mt-2 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                                {selectedPatient.emergency_contact_phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-teal-700 border-b pb-2">Insurance Information</h3>
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                            {selectedPatient.insurance_provider ? (
                                                <>
                                                    <p className="text-blue-900 font-bold">{selectedPatient.insurance_provider}</p>
                                                    <div className="flex justify-between text-sm mt-2">
                                                        <span className="text-blue-700">Policy #</span>
                                                        <span className="font-mono font-medium text-blue-900">{selectedPatient.insurance_policy_number}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm mt-1">
                                                        <span className="text-blue-700">Expires</span>
                                                        <span className="font-medium text-blue-900">{selectedPatient.insurance_expiry_date}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <p className="text-blue-700 italic text-sm">No insurance details provided</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4">
                                <button
                                    onClick={() => setIsDetailsOpen(false)}
                                    className="flex-1 py-3 px-4 bg-white border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Close View
                                </button>
                                <button
                                    onClick={() => handleEdit(selectedPatient)}
                                    className="flex-1 py-3 px-4 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-100"
                                >
                                    Edit Patient Record
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

