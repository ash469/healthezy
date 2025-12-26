import { apiClient } from '../config';
import type { HospitalPageResponse } from './types';

/**
 * Get all hospitals with pagination
 * @param page - Page number (default: 0)
 * @param size - Page size (default: 10)
 * @returns Paginated list of hospitals
 */
export async function getAllHospitals(
    page: number = 0,
    size: number = 10
): Promise<HospitalPageResponse> {
    const { data } = await apiClient.get<HospitalPageResponse>('/hospitals', {
        params: { page, size }
    });
    return data;
}
