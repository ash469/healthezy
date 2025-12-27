import Link from 'next/link';
import '../../dashboard.css';
import { getPatientDashboardData } from '@/services/patient';

export default async function PatientDashboard() {
    const data = await getPatientDashboardData();

    if (!data) {
        return <div className="p-8 text-center text-[#0f766e] font-semibold">Failed to load patient dashboard data.</div>;
    }

    const {
        patientInfo,
        stats,
        upcomingAppointments,
        labReports,
        patients,
        recentOrders,
        insuranceClaims
    } = data;

    return (
        <div className="patient-dashboard">
            <div className="patient-dashboard">
                <div className="dashboard-header">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#0f766e] mb-8">
                        Patient Dashboard
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
                    {/* Left Column - Profile Card */}
                    <div className="profile-section">
                        <div className="profile-card">
                            <div className="profile-avatar">
                                <img src={patientInfo.avatar} alt={patientInfo.name} />
                            </div>
                            <h3 className="profile-name">{patientInfo.name}</h3>
                            <div className="profile-details">
                                <div className="detail-row">
                                    <span className="detail-label">Age:</span>
                                    <span className="detail-value">{patientInfo.age}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Gender:</span>
                                    <span className="detail-value">{patientInfo.gender}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Blood Group:</span>
                                    <span className="detail-value">{patientInfo.bloodGroup}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Mobile No:</span>
                                    <span className="detail-value">{patientInfo.mobileNo}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Email Id:</span>
                                    <span className="detail-value text-xs break-all">{patientInfo.emailId}</span>
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

                        {/* Blog Section */}
                        <div className="blog-card">
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
                        </div>

                        {/* Insurance Claims */}
                        <div className="insurance-card">
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
                        </div>
                    </div>

                    {/* Right Column - Stats and Content */}
                    <div className="content-section">
                        {/* Stats Cards */}
                        <div className="stats-grid">
                            <div className="stat-card bg-gradient-to-br from-teal-400 to-teal-500">
                                <div className="stat-number">{stats.patients}</div>
                                <div className="stat-label">No. Of Patient</div>
                                <Link href="#" className="stat-link">View All</Link>
                            </div>
                            <div className="stat-card bg-gradient-to-br from-blue-400 to-blue-500">
                                <div className="stat-number">{stats.appointments}</div>
                                <div className="stat-label">No. Of Appointments</div>
                                <Link href="#" className="stat-link">View All</Link>
                            </div>
                            <div className="stat-card bg-gradient-to-br from-purple-400 to-purple-500">
                                <div className="stat-number">{stats.prescriptions}</div>
                                <div className="stat-label">Prescriptions</div>
                                <Link href="#" className="stat-link">View All</Link>
                            </div>
                            <div className="stat-card bg-gradient-to-br from-pink-400 to-pink-500">
                                <div className="stat-number">{stats.labTests}</div>
                                <div className="stat-label">Lab Tests</div>
                                <Link href="#" className="stat-link">View All</Link>
                            </div>
                        </div>

                        {/* Two Column Layout for Appointments and Lab Reports */}
                        <div className="two-column-grid">
                            {/* Upcoming Appointments */}
                            <div className="content-card">
                                <div className="card-header">
                                    <h2 className="card-title">Upcoming Appointments</h2>
                                    <Link href="#" className="view-all-link">View All</Link>
                                </div>
                                <div className="appointments-list">
                                    {upcomingAppointments.map((apt) => (
                                        <div key={apt.id} className="appointment-item">
                                            <h3 className="appointment-doctor">{apt.doctor}</h3>
                                            <p className="appointment-date">{apt.date}</p>
                                            <span className={`appointment-badge ${apt.badge}`}>{apt.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Lab Test Reports */}
                            <div className="content-card">
                                <div className="card-header">
                                    <h2 className="card-title">Lab Test Reports</h2>
                                    <Link href="#" className="view-all-link">View All</Link>
                                </div>
                                <div className="lab-reports-list">
                                    {labReports.map((report) => (
                                        <div key={report.id} className="lab-report-item">
                                            <h3 className="lab-name">{report.lab}</h3>
                                            <p className="lab-test">{report.test}</p>
                                            <span className={`lab-badge ${report.badge}`}>{report.status}</span>
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
                                    <button className="add-patient-btn">Add Patient</button>
                                </div>
                                <div className="patients-list">
                                    {patients.map((patient) => (
                                        <div key={patient.id} className="patient-item">
                                            <h3 className="patient-name">{patient.name}</h3>
                                            <p className="patient-type">{patient.type}</p>
                                            <p className="patient-visit">Next Visit: {patient.nextVisit}</p>
                                            <span className={`patient-badge ${patient.badge}`}>View History</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="#" className="view-all-users">View All Users</Link>
                            </div>

                            {/* Recent Orders */}
                            <div className="content-card">
                                <div className="card-header">
                                    <h2 className="card-title">Recent Orders</h2>
                                    <Link href="#" className="view-all-link">View All</Link>
                                </div>
                                <div className="orders-list">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="order-item">
                                            <h3 className="order-pharmacy">{order.pharmacy}</h3>
                                            <p className="order-medicine">{order.medicine}</p>
                                            <span className={`order-badge ${order.badge}`}>{order.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bill & Claim Tracker */}
                        <div className="content-card bill-tracker-card">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
