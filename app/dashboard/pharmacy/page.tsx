import DashboardLayout from '@/components/dashboard/DashboardLayout';

import Link from 'next/link';

export default function PharmacyDashboard() {
    return (
        <DashboardLayout userType="pharmacy" userName="HealthPlus Pharmacy">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Pharmacy Dashboard</h1>
                    <p className="text-gray-600">Manage your pharmacy orders and prescriptions</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="card bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                        <div className="text-3xl mb-2">📦</div>
                        <div className="text-3xl font-bold mb-1">24</div>
                        <div className="text-sm opacity-90">Pending Orders</div>
                    </div>
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="text-3xl mb-2">💊</div>
                        <div className="text-3xl font-bold mb-1">156</div>
                        <div className="text-sm opacity-90">Total Medicines</div>
                    </div>
                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="text-3xl mb-2">✅</div>
                        <div className="text-3xl font-bold mb-1">12</div>
                        <div className="text-sm opacity-90">Completed Today</div>
                    </div>
                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="text-3xl mb-2">📋</div>
                        <div className="text-3xl font-bold mb-1">8</div>
                        <div className="text-sm opacity-90">Prescriptions to Verify</div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Recent Orders</h2>
                        <button className="btn btn-primary btn-sm">View All</button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl">🛒</div>
                                <div>
                                    <h3 className="font-semibold">Order #12345</h3>
                                    <p className="text-sm text-gray-600">Patient: John Doe</p>
                                    <p className="text-sm text-gray-500">5 items • ₹450</p>
                                </div>
                            </div>
                            <span className="badge badge-warning">Pending</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl">🛒</div>
                                <div>
                                    <h3 className="font-semibold">Order #12344</h3>
                                    <p className="text-sm text-gray-600">Patient: Sarah Williams</p>
                                    <p className="text-sm text-gray-500">3 items • ₹320</p>
                                </div>
                            </div>
                            <span className="badge badge-success">Completed</span>
                        </div>
                    </div>
                </div>

                {/* Coming Soon Notice */}
                <div className="card bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200">
                    <div className="text-center py-8">
                        <div className="text-6xl mb-4">🚧</div>
                        <h2 className="text-2xl font-bold text-teal-900 mb-2">Pharmacy Dashboard Coming Soon</h2>
                        <p className="text-teal-700 mb-4">
                            This dashboard is currently under development. Full pharmacy management features will be available soon!
                        </p>
                        <Link href="/" className="btn btn-primary">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
