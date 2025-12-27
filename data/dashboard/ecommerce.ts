import { EcommerceDashboardData } from '@/types/dashboard/ecommerce';

export const ecommerceDashboardData: EcommerceDashboardData = {
    recentOrders: [
        { id: "#12345", customer: "John Doe", product: "Multivitamin Tablets", amount: "$29.99", status: "Delivered" },
        { id: "#12346", customer: "Jane Smith", product: "Blood Pressure Monitor", amount: "$49.99", status: "Shipped" },
        { id: "#12347", customer: "Mike Johnson", product: "Protein Powder", amount: "$59.99", status: "Processing" },
        { id: "#12348", customer: "Sarah Williams", product: "Fitness Tracker", amount: "$89.99", status: "Pending" }
    ],
    topProducts: [
        { name: "Multivitamin Tablets", sales: 234, revenue: "$7,016.66" },
        { name: "Blood Pressure Monitor", sales: 156, revenue: "$7,798.44" },
        { name: "Protein Powder", sales: 189, revenue: "$11,338.11" }
    ],
    stats: {
        totalRevenue: "$45.2K",
        totalOrders: 342,
        activeProducts: 125,
        customers: "1.2K"
    }
};
