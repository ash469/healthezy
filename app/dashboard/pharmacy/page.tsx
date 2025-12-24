'use client';

import Link from 'next/link';
import '../../dashboard.css'; 

export default function PharmacyDashboard() {
    // Mock data for Pharmacy
    const pharmacyInfo = {
        name: "Pharmacy Name",
        mobileNo: "9876543210",
        emailId: "testmail00@gmail.com",
        address: "123 Health Street, Med City"
    };

    const stats = {
        ordersToday: 15,
        pendingDeliveries: 15,
        totalProducts: 15
    };

    const recentOrders = [
        {
            id: 1,
            name: "Ravi Sharma",
            prescriptionId: "Prescription #2547",
            status: "Pending", // Mock status
            time: "11:30 AM",
            badge: "bg-teal-500" // Not directly used in list but good for consistency
        },
        {
            id: 2,
            name: "Ravi Sharma",
            prescriptionId: "Prescription #2547",
            status: "Pending",
            time: "11:30 AM",
            badge: "bg-teal-500"
        }
    ];

    const inventoryStatus = [
        {
            id: 1,
            name: "Paracetamol 500mg",
            type: "Tablets",
            status: "In Stock",
            statusColor: "bg-teal-600"
        },
        {
            id: 2,
            name: "Cough Syrup 100ml",
            type: "Bottles",
            status: "Low Stock",
            statusColor: "bg-yellow-400 text-black"
        }
    ];

    return (
        <div className="patient-dashboard">
            <div className="dashboard-header">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0f766e] mb-8">
                    Pharmacy Dashboard
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
                            <div className="w-full h-full bg-white flex items-center justify-center text-gray-400">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            </div>
                        </div>
                        <h3 className="profile-name">{pharmacyInfo.name}</h3>
                        <div className="profile-details">
                            <div className="detail-row">
                                <span className="detail-label">Mobile No:</span>
                                <span className="detail-value">{pharmacyInfo.mobileNo}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Email Id:</span>
                                <span className="detail-value text-xs break-all">{pharmacyInfo.emailId}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Address:</span>
                                <span className="detail-value text-right text-xs" style={{ maxWidth: '60%' }}>{pharmacyInfo.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-links-card">
                        <h3 className="section-title">Quick Actions</h3>
                        <button className="quick-link-btn teal">
                            Manage Order
                        </button>
                        <button className="quick-link-btn" style={{ background: 'white', color: '#0f766e', border: '1px solid #0f766e' }}>
                            Manage Inventory
                        </button>
                    </div>

                    {/* Add / Update Medicine Form (Placed in Left Column for Consistency) */}
                    <div className="insurance-card">
                        <h3 className="section-title">Add / Update Medicine</h3>

                        <div className="flex flex-col gap-3">
                            <input type="text" placeholder="Medicine Name" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />
                            <input type="text" placeholder="Category" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />
                            <input type="text" placeholder="Medicine Unit (mg)" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />
                            <input type="text" placeholder="Expiry Date" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />
                            <input type="text" placeholder="Stock Quantity" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />
                            <input type="text" placeholder="Price (₹)" className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-500" />

                            <button className="claim-btn submit mt-2">Save Medicine</button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats and Content */}
                <div className="content-section">
                    {/* Stats Grid - 3 Columns */}
                    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        <div className="stat-card bg-gradient-to-br from-teal-400 to-teal-500">
                            <div className="stat-number">{stats.ordersToday}</div>
                            <div className="stat-label">Orders Today</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-blue-400 to-blue-500">
                            <div className="stat-number">{stats.pendingDeliveries}</div>
                            <div className="stat-label">Pending Deliveries</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                        <div className="stat-card bg-gradient-to-br from-purple-400 to-purple-500">
                            <div className="stat-number">{stats.totalProducts}</div>
                            <div className="stat-label">Total Products</div>
                            <Link href="#" className="stat-link">View All</Link>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="two-column-grid">
                        {/* Recent Orders */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Recent Orders</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="appointments-list">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="appointment-item">
                                        <h3 className="appointment-doctor text-black">{order.name}</h3>
                                        <p className="appointment-date">{order.prescriptionId}</p>
                                        <span className={`bg-teal-600 text-white px-2 py-1 rounded text-xs font-bold absolute top-4 right-4`}>{order.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inventory Status */}
                        <div className="content-card">
                            <div className="card-header">
                                <h2 className="card-title">Inventory Status</h2>
                                <Link href="#" className="view-all-link">View All</Link>
                            </div>
                            <div className="patients-list">
                                {inventoryStatus.map((item) => (
                                    <div key={item.id} className="patient-item">
                                        <h3 className="patient-name">{item.name}</h3>
                                        <p className="patient-visit">{item.type}</p>
                                        <span className={`patient-badge ${item.statusColor}`}>{item.status}</span>
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
