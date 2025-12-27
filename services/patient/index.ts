import { PatientDashboardData } from '@/types/dashboard/patient';

/**
 * Get all data for the patient dashboard
 */
export async function getPatientDashboardData(): Promise<PatientDashboardData> {
    // In production, this would be a single API call or multiple parallel calls
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Fetch from centralized dummy data
    const { patientDashboardData } = await import('@/data/dashboard/patient');
    return patientDashboardData;
}
