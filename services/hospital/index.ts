import { apiClient } from '../config';
import type { Hospital } from '@/types/hospital';

// Backend API response type (this is what the real API returns)
interface HospitalApiResponse {
    id: number;
    hospitalCode: string;
    name: string;
    type: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    fullAddress: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    email: string;
    website?: string;
    licenseNumber: string;
    accreditation?: string;
    openingTime: string;
    closingTime: string;
    is24x7: boolean;
    facilities: string;
    specializations: string;
    logoUrl?: string;
    images?: string;
    totalBeds: number;
    availableBeds: number;
    rating?: number;
    reviewCount: number;
    doctorCount?: number;
}

interface HospitalPageResponse {
    content: HospitalApiResponse[];
    totalPages?: number;
    totalElements?: number;
    number?: number;
}

/**
 * Transform API response to frontend Hospital type
 */
function transformHospital(apiHospital: HospitalApiResponse): Hospital {
    return {
        id: apiHospital.id,
        name: apiHospital.name,
        location: `${apiHospital.city}, ${apiHospital.state}`,
        address: apiHospital.fullAddress || apiHospital.address,
        city: apiHospital.city,
        phoneNumber: apiHospital.phoneNumber,
        email: apiHospital.email,
        logoUrl: apiHospital.logoUrl,
        rating: apiHospital.rating,
        latitude: apiHospital.latitude,
        longitude: apiHospital.longitude,
        specializations: apiHospital.specializations,
        type: apiHospital.type,
        description: apiHospital.description,
        website: apiHospital.website,
        openingTime: apiHospital.openingTime,
        closingTime: apiHospital.closingTime,
        is24x7: apiHospital.is24x7,
        facilities: apiHospital.facilities,
        totalBeds: apiHospital.totalBeds,
        availableBeds: apiHospital.availableBeds,
        reviewCount: apiHospital.reviewCount,
        doctorCount: apiHospital.doctorCount,
    };
}

/**
 * Get all hospitals with pagination
 */
export async function getAllHospitals(
    page: number = 0,
    size: number = 10
): Promise<Hospital[]> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<HospitalPageResponse>('/hospitals', {
    //     params: { page, size }
    // });
    // return data.content.map(transformHospital);

    // For now, return dummy data from data/hospitals.ts
    const { hospitals } = await import('@/data/hospitals');
    return hospitals;
}

/**
 * Get hospital by ID
 */
export async function getHospitalById(id: number): Promise<Hospital | null> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<HospitalApiResponse>(`/hospitals/${id}`);
    // return transformHospital(data);

    // For now, return dummy data
    const { getHospitalById } = await import('@/data/hospitals');
    return getHospitalById(id) || null;
}
