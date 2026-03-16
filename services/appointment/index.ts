import { apiClient } from '../config';
import type { AppointmentResponse, AppointmentRequest, DoctorScheduleSlot, UpdateAppointment, AppointmentDetailResponse } from '@/types/appointment';

const BASE_PATH = '/appointments';

/**
 * Book a new appointment
 * POST /appointments/
 */
export async function bookAppointment(appointmentData: AppointmentRequest): Promise<AppointmentResponse> {
    const { data } = await apiClient.post<AppointmentResponse>(`${BASE_PATH}/`, appointmentData);
    return data;
}

/**
 * Get all appointments for the current user
 * GET /appointments/my
 */
export async function getMyAppointments(): Promise<AppointmentResponse[]> {
    const { data } = await apiClient.get<AppointmentResponse[]>(`${BASE_PATH}/my`);
    return data;
}

/**
 * Get appointment by ID
 * GET /appointments/{id}
 */
export async function getAppointmentById(id: number): Promise<AppointmentResponse> {
    const { data } = await apiClient.get<AppointmentResponse>(`${BASE_PATH}/${id}`);
    return data;
}

/**
 * Cancel Appointment
 * Endpoint: PUT /cancel/{appointment_id}
 */
export async function cancelAppointment(appointmentId: number): Promise<void> {
    await apiClient.put(`${BASE_PATH}/cancel/${appointmentId}`);
}

/**
 * Get Hospital Appointments
 * GET /hospitals/{hospital_id}/appointments
 */
export async function getHospitalAppointments(hospitalId: number): Promise<AppointmentDetailResponse[]> {
    const { data } = await apiClient.get<AppointmentDetailResponse[]>(`/hospitals/${hospitalId}/appointments`);
    return data;
}

/**
 * Update Appointment
 * Endpoint: PUT /{appointment_id}
 */
export async function updateAppointment(appointmentId: number, updateData: UpdateAppointment): Promise<AppointmentResponse> {
    const { data } = await apiClient.put<AppointmentResponse>(`${BASE_PATH}/${appointmentId}`, updateData);
    return data;
}

/**
 * Get doctor's schedule/available slots
 * GET /schedules/doctor/{doctor_id}
 */
export async function getDoctorSchedule(doctorId: number, targetDate?: string): Promise<DoctorScheduleSlot[]> {
    const url = targetDate
        ? `/schedules/doctor/${doctorId}?target_date=${targetDate}`
        : `/schedules/doctor/${doctorId}`;
    const { data } = await apiClient.get<DoctorScheduleSlot[]>(url);
    return data;
}

/**
 * Helper function to format date for API (YYYY-MM-DD)
 */
export function formatDateForAPI(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Helper function to format time for API (HH:MM:SS)
 */
export function formatTimeForAPI(time: string): string {
    // If time is already in HH:MM:SS format, return as is
    if (time.match(/^\d{2}:\d{2}:\d{2}$/)) {
        return time;
    }

    // If time is in HH:MM format, add :00 for seconds
    if (time.match(/^\d{2}:\d{2}$/)) {
        return `${time}:00`;
    }

    throw new Error('Invalid time format. Expected HH:MM or HH:MM:SS');
}

/**
 * Helper function to check if a slot is available on a specific date
 */
export function isSlotAvailable(
    slot: DoctorScheduleSlot,
    selectedDate: Date
): boolean {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const selectedDay = days[selectedDate.getDay()];

    return slot.day.toLowerCase() === selectedDay && slot.is_available;
}
