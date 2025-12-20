import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function EcommerceDashboard() {
    const recentOrders = [
        { id: "#12345", customer: "John Doe", product: "Multivitamin Tablets", amount: "$29.99", status: "Delivered" },
        { id: "#12346", customer: "Jane Smith", product: "Blood Pressure Monitor", amount: "$49.99", status: "Shipped" },
        { id: "#12347", customer: "Mike Johnson", product: "Protein Powder", amount: "$59.99", status: "Processing" },
        { id: "#12348", customer: "Sarah Williams", product: "Fitness Tracker", amount: "$89.99", status: "Pending" }
    ];

    const topProducts = [
        { name: "Multivitamin Tablets", sales: 234, revenue: "$7,016.66" },
        { name: "Blood Pressure Monitor", sales: 156, revenue: "$7,798.44" },
        { name: "Protein Powder", sales: 189, revenue: "$11,338.11" }
    ];

    return (
        <DashboardLayout userType="ecommerce" userName="HealthShop Admin">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Ecommerce Dashboard</h1>
                    <p className="text-gray-600">Manage your products and orders</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="text-3xl mb-2">💰</div>
                        <div className="text-3xl font-bold mb-1">$45.2K</div>
                        <div className="text-sm opacity-90">Total Revenue</div>
                    </div>
                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="text-3xl mb-2">📦</div>
                        <div className="text-3xl font-bold mb-1">342</div>
                        <div className="text-sm opacity-90">Total Orders</div>
                    </div>
                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="text-3xl font-bold mb-1">125</div>
                        <div className="text-sm opacity-90">Active Products</div>
                    </div>
                    <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <div className="text-3xl mb-2">👥</div>
                        <div className="text-3xl font-bold mb-1">1.2K</div>
                        <div className="text-sm opacity-90">Customers</div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Recent Orders</h2>
                        <button className="btn btn-primary btn-sm">View All Orders</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3">Order ID</th>
                                    <th className="text-left p-3">Customer</th>
                                    <th className="text-left p-3">Product</th>
                                    <th className="text-left p-3">Amount</th>
                                    <th className="text-left p-3">Status</th>
                                    <th className="text-left p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-semibold">{order.id}</td>
                                        <td className="p-3">{order.customer}</td>
                                        <td className="p-3">{order.product}</td>
                                        <td className="p-3 font-semibold text-green-600">{order.amount}</td>
                                        <td className="p-3">
                                            <span className={`badge ${order.status === 'Delivered' ? 'badge-success' :
                                                    order.status === 'Shipped' ? 'badge-info' :
                                                        order.status === 'Processing' ? 'badge-warning' : 'badge-warning'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <button className="btn btn-outline btn-sm">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Products */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">Top Products</h2>
                        <div className="space-y-3">
                            {topProducts.map((product, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold mb-2">{product.name}</h3>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">{product.sales} sales</span>
                                        <span className="font-semibold text-green-600">{product.revenue}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="btn btn-primary w-full">Add New Product</button>
                            <button className="btn btn-outline w-full">Create Offer</button>
                            <button className="btn btn-outline w-full">Manage Inventory</button>
                            <button className="btn btn-outline w-full">View Analytics</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
