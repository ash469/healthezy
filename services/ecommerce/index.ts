import { EcommerceDashboardData } from '@/types/dashboard/ecommerce';

/**
 * Get all data for the ecommerce dashboard
 */
export async function getEcommerceDashboardData(): Promise<EcommerceDashboardData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Fetch from centralized dummy data
    const { ecommerceDashboardData } = await import('@/data/dashboard/ecommerce');
    return ecommerceDashboardData;
}
