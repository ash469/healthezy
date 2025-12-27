export interface PharmacyInfo {
    name: string;
    mobileNo: string;
    emailId: string;
    address: string;
}

export interface PharmacyStats {
    ordersToday: number;
    pendingDeliveries: number;
    totalProducts: number;
}

export interface RecentPharmacyOrder {
    id: number;
    name: string;
    prescriptionId: string;
    status: string;
    time: string;
    badge: string;
}

export interface InventoryItem {
    id: number;
    name: string;
    type: string;
    status: string;
    statusColor: string;
}

export interface PharmacyDashboardData {
    pharmacyInfo: PharmacyInfo;
    stats: PharmacyStats;
    recentOrders: RecentPharmacyOrder[];
    inventoryStatus: InventoryItem[];
}
