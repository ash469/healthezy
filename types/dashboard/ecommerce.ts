export interface EcommerceProduct {
    name: string;
    sales: number;
    revenue: string;
}

export interface EcommerceOrder {
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: string;
}

export interface EcommerceStats {
    totalRevenue: string;
    totalOrders: number;
    activeProducts: number;
    customers: string;
}

export interface EcommerceDashboardData {
    recentOrders: EcommerceOrder[];
    topProducts: EcommerceProduct[];
    stats: EcommerceStats;
}
