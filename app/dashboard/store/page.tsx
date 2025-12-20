import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function StoreDashboard() {
    const recentOrders = [
        { id: "#ORD123", customer: "John Doe", items: "Amoxicillin 500mg, Vitamin D3", amount: "$45.99", status: "Delivered" },
        { id: "#ORD124", customer: "Jane Smith", items: "Paracetamol, First Aid Kit", amount: "$28.50", status: "Out for Delivery" },
        { id: "#ORD125", customer: "Mike Johnson", items: "Blood Pressure Monitor", amount: "$75.00", status: "Processing" },
        { id: "#ORD126", customer: "Sarah Williams", items: "Multivitamins, Calcium", amount: "$38.99", status: "Pending" }
    ];

    const lowStockItems = [
        { name: "Paracetamol 500mg", stock: 15, minStock: 50 },
        { name: "Amoxicillin 250mg", stock: 8, minStock: 30 },
        { name: "First Aid Bandages", stock: 12, minStock: 40 }
    ];

    return (
        <DashboardLayout userType="store" userName="HealthPlus Pharmacy">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Medical Store Dashboard</h1>
                    <p className="text-gray-600">Manage orders and inventory</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="text-3xl mb-2">📦</div>
                        <div className="text-3xl font-bold mb-1">28</div>
                        <div className="text-sm opacity-90">Pending Orders</div>
                    </div>
                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="text-3xl mb-2">💰</div>
                        <div className="text-3xl font-bold mb-1">$18.5K</div>
                        <div className="text-sm opacity-90">This Month Revenue</div>
                    </div>
                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="text-3xl mb-2">📋</div>
                        <div className="text-3xl font-bold mb-1">450</div>
                        <div className="text-sm opacity-90">Products in Stock</div>
                    </div>
                    <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <div className="text-3xl mb-2">⚠️</div>
                        <div className="text-3xl font-bold mb-1">12</div>
                        <div className="text-sm opacity-90">Low Stock Alerts</div>
                    </div>
                </div>
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3">Order ID</th>
                                    <th className="text-left p-3">Customer</th>
                                    <th className="text-left p-3">Items</th>
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
                                        <td className="p-3 text-sm">{order.items}</td>
                                        <td className="p-3 font-semibold text-green-600">{order.amount}</td>
                                        <td className="p-3">
                                            <span className={`badge ${order.status === 'Delivered' ? 'badge-success' :
                                                order.status === 'Out for Delivery' ? 'badge-info' :
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
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">Low Stock Alerts</h2>
                        <div className="space-y-3">
                            {lowStockItems.map((item, index) => (
                                <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <button className="btn btn-success btn-sm">Reorder</button>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-red-600 font-semibold">Current: {item.stock}</span>
                                        <span className="text-gray-600">Min: {item.minStock}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="btn btn-primary w-full">Add New Product</button>
                            <button className="btn btn-outline w-full">View All Orders</button>
                            <button className="btn btn-outline w-full">Manage Inventory</button>
                            <button className="btn btn-outline w-full">View Revenue Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
