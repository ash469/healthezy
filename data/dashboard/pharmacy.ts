import { PharmacyDashboardData } from '@/types/dashboard/pharmacy';

export const pharmacyDashboardData: PharmacyDashboardData = {
    pharmacyInfo: {
        name: "Pharmacy Name",
        mobileNo: "9876543210",
        emailId: "testmail00@gmail.com",
        address: "123 Health Street, Med City"
    },
    stats: {
        ordersToday: 15,
        pendingDeliveries: 15,
        totalProducts: 15
    },
    recentOrders: [
        {
            id: 1,
            name: "Ravi Sharma",
            prescriptionId: "Prescription #2547",
            status: "Pending",
            time: "11:30 AM",
            badge: "bg-teal-500"
        },
        {
            id: 2,
            name: "Ravi Sharma",
            prescriptionId: "Prescription #2547",
            status: "Pending",
            time: "11:30 AM",
            badge: "bg-teal-500"
        }
    ],
    inventoryStatus: [
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
    ]
};
