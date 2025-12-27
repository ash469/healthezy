import { apiClient } from '../config';
import type { DoctorPageResponse } from './types';

/**
 * Get all doctors with pagination
 * @param page - Page number (default: 0)
 * @param size - Page size (default: 10)
 * @returns Paginated list of doctors
 */
export async function getAllDoctors(
    page: number = 0,
    size: number = 10
): Promise<DoctorPageResponse> {
    const { data } = await apiClient.get<DoctorPageResponse>('/doctors', {
        params: { page, size }
    });
    return data;
}
