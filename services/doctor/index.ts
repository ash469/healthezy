import { apiClient } from '../config';
import type { Doctor, AppointmentSchedule } from '@/types/doctor';
import type { DoctorDashboardData } from '@/types/dashboard/doctor';

// Backend API response type (this is what the real API returns)
interface DoctorApiResponse {
    id: number;
    hospitalId?: number;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    specialization?: string;
    qualification?: string;
    experienceYears?: number;
    consultationFee?: number;
    hospitalName?: string;
    photoUrl?: string;
    rating?: number;
    gender?: 'Male' | 'Female' | 'MALE' | 'FEMALE' | 'OTHER';
    status?: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
}

interface DoctorPageResponse {
    content: DoctorApiResponse[];
    totalPages?: number;
    totalElements?: number;
    number?: number;
}

/**
 * Transform API response to frontend Doctor type
 */
function transformDoctor(apiDoctor: DoctorApiResponse): Doctor {
    return {
        id: apiDoctor.id,
        hospitalId: apiDoctor.hospitalId,
        fullName: apiDoctor.fullName,
        firstName: apiDoctor.firstName,
        lastName: apiDoctor.lastName,
        specialization: apiDoctor.specialization,
        qualification: apiDoctor.qualification,
        experienceYears: apiDoctor.experienceYears,
        experience: apiDoctor.experienceYears ? `${apiDoctor.experienceYears} years` : undefined,
        consultationFee: apiDoctor.consultationFee,
        hospitalName: apiDoctor.hospitalName,
        photoUrl: apiDoctor.photoUrl,
        rating: apiDoctor.rating,
        gender: apiDoctor.gender,
        status: apiDoctor.status,
    };
}

/**
 * Get all doctors with pagination
 */
export async function getAllDoctors(
    page: number = 0,
    size: number = 10
): Promise<Doctor[]> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<DoctorPageResponse>('/doctors', {
    //     params: { page, size }
    // });
    // return data.content.map(transformDoctor);

    // For now, return dummy data from data/doctors.ts
    const { doctors } = await import('@/data/doctors');
    return doctors;
}

/**
 * Get doctor by ID
 */
export async function getDoctorById(id: number): Promise<Doctor | null> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<DoctorApiResponse>(`/doctors/${id}`);
    // return transformDoctor(data);

    // For now, return dummy data
    const { getDoctorById } = await import('@/data/doctors');
    return getDoctorById(id) || null;
}

/**
 * Get appointment schedule for a doctor
 */
export async function getDoctorSchedule(doctorId: number): Promise<AppointmentSchedule | null> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<AppointmentSchedule>(`/doctors/${doctorId}/schedule`);
    // return data;

    // For now, return dummy data
    const { appointmentSchedules } = await import('@/data/appointments');
    return appointmentSchedules.find(apt => apt.doctorId === doctorId) || null;
}

/**
 * Get all data for the doctor dashboard
 */
export async function getDoctorDashboardData(): Promise<DoctorDashboardData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Fetch from centralized dummy data
    const { doctorDashboardData } = await import('@/data/dashboard/doctor');
    return doctorDashboardData;
}
