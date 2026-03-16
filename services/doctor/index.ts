import { apiClient } from '../config';
import type { Doctor, DoctorSchedule, SchedulePayload } from '@/types/doctor';
import type { DoctorDashboardData, DoctorStats, TodaysAppointment, RecentPatient } from '@/types/dashboard/doctor';
import type { UserProfile } from '../auth/types';
import type { AppointmentResponse, AppointmentDetailResponse } from '@/types/appointment';
/**
 * Create a new doctor
 * POST /doctors/
 */
export async function createDoctor(doctorData: any): Promise<Doctor> {
    const { data } = await apiClient.post<Doctor>('/doctors/', doctorData);
    return data;
}

/**
 * Update doctor details (Doctor updates their own profile)
 * PUT /doctors/{doctor_id}
 */
export async function updateDoctor(doctorId: number, doctorData: Partial<Doctor>): Promise<void> {
    await apiClient.put(`/doctors/${doctorId}`, doctorData);
}

/**
 * Reset doctor password
 * PUT /doctors/reset_password
 */
export async function resetDoctorPassword(passwordData: any): Promise<void> {
    await apiClient.put('/doctors/reset_password', passwordData);
}

/**
 * Delete a doctor
 * DELETE /doctors/{doctor_id}
 */
export async function deleteDoctor(doctorId: number): Promise<void> {
    await apiClient.delete(`/doctors/${doctorId}`);
}

/**
 * Get all appointments for a doctor (detailed with patient info).
 * GET /doctors/{doctor_id}/appointments
 * Requires any logged-in user; doctor can only see their own
 */
export async function getDoctorAppointments(doctorId: number): Promise<AppointmentDetailResponse[]> {
    try {
        const { data } = await apiClient.get<AppointmentDetailResponse[]>(`/doctors/${doctorId}/appointments`);
        return data || [];
    } catch (error) {
        console.error(`Error fetching appointments for doctor ${doctorId}:`, error);
        return [];
    }
}

export async function getAllDoctors(
    page: number = 0,
    size: number = 10
): Promise<Doctor[]> {
    try {
        const { data } = await apiClient.get<Doctor[]>('/doctors/');
        return data;
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
}


export async function getDoctorById(id: number): Promise<Doctor | null> {
    try {
        const { data } = await apiClient.get<Doctor>(`/doctors/${id}`);
        return data;
    } catch (error) {
        console.error(`Error fetching doctor ${id} directly, trying fallback:`, error);
        try {
            const doctors = await getAllDoctors();
            const found = doctors.find(d => d.id === id);
            if (found) return found;
        } catch (e) {
            console.error("Fallback doctor fetch failed:", e);
        }
        return null;
    }
}

export async function getDoctorsBySpecialization(specialization: string): Promise<Doctor[]> {
    try {
        const { data } = await apiClient.get<Doctor[]>(`/doctors/specialization/${specialization}`);
        return data;
    } catch (error) {
        console.error(`Error fetching doctors by specialization ${specialization}:`, error);
        return [];
    }
}

export async function getDoctorsByExperience(experience: number): Promise<Doctor[]> {
    try {
        const { data } = await apiClient.get<Doctor[]>(`/doctors/experience/${experience}`);
        return data;
    } catch (error) {
        console.error(`Error fetching doctors by experience ${experience}:`, error);
        return [];
    }
}


export async function getDoctorSchedule(doctorId: number, targetDate?: string): Promise<DoctorSchedule[]> {
    try {
        const url = targetDate
            ? `/schedules/doctor/${doctorId}?target_date=${targetDate}`
            : `/schedules/doctor/${doctorId}`;
        const { data } = await apiClient.get<DoctorSchedule[]>(url);
        return data;
    } catch (error) {
        console.error(`Error fetching schedule for doctor ${doctorId}:`, error);
        return [];
    }
}

/**
 * Get all available slots for a specific doctor
 * GET /schedules/doctor/{doctor_id} (Public)
 */
export async function getDoctorSchedules(doctorId: number, targetDate?: string): Promise<DoctorSchedule[]> {
    const url = targetDate
        ? `/schedules/doctor/${doctorId}?target_date=${targetDate}`
        : `/schedules/doctor/${doctorId}`;
    const { data } = await apiClient.get<DoctorSchedule[]>(url);
    return data || [];
}

// ... (imports)

// ...

/**
 * Create recurring slots for specific days
 * POST /schedules/private (Secure)
 */
export async function createDoctorSchedule(scheduleData: SchedulePayload[]): Promise<DoctorSchedule[]> {
    const { data } = await apiClient.post<DoctorSchedule[]>('/schedules/private', scheduleData);
    return data;
}

/**
 * Update existing schedule
 * PUT /schedules/private/{schedule_id} (Secure)
 */
export async function updateDoctorSchedule(scheduleId: number, scheduleData: Partial<DoctorSchedule>): Promise<DoctorSchedule> {
    const { data } = await apiClient.put<DoctorSchedule>(`/schedules/private/${scheduleId}`, scheduleData);
    return data;
}

/**
 * Delete a recurring day's schedule
 * DELETE /schedules/private/{id} (Secure)
 */
export async function deleteDoctorSchedule(scheduleId: number): Promise<void> {
    await apiClient.delete(`/schedules/private/${scheduleId}`);
}

/**
 * List all planned exceptions for a doctor
 * GET /doctors/doctor_schedules/exceptions/{doctor_id} (Public)
 */
export async function getDoctorExceptions(doctorId: number): Promise<any[]> {
    const { data } = await apiClient.get<any[]>(`/doctors/doctor_schedules/exceptions/${doctorId}`);
    return data || [];
}

/**
 * Add a schedule exception (Leave/Special Hours)
 * POST /doctors/doctor_schedules/exceptions/{doctor_id} (Secure)
 */
export async function addDoctorException(doctorId: number, exceptionData: any): Promise<any> {
    const { data } = await apiClient.post<any>(`/doctors/doctor_schedules/exceptions/${doctorId}`, exceptionData);
    return data;
}

/**
 * Update an existing exception
 * PUT /doctors/doctor_schedules/exceptions/{exception_id} (Secure)
 */
export async function updateDoctorException(exceptionId: number, exceptionData: any): Promise<any> {
    const { data } = await apiClient.put<any>(`/doctors/doctor_schedules/exceptions/${exceptionId}`, exceptionData);
    return data;
}

/**
 * Delete a schedule exception
 * DELETE /doctors/doctor_schedules/exceptions/{exception_id} (Secure)
 */
export async function deleteDoctorException(exceptionId: number): Promise<void> {
    await apiClient.delete(`/doctors/doctor_schedules/exceptions/${exceptionId}`);
}

/**
 * View all appointments where the current logged-in user is the assigned doctor
 * GET /doctors/{id}/appointments
 */
export async function getDoctorSpecificAppointments(doctorId: number): Promise<AppointmentDetailResponse[]> {
    try {
        const { data } = await apiClient.get<AppointmentDetailResponse[]>(`/doctors/${doctorId}/appointments`);
        return data || [];
    } catch (error) {
        console.error("Error fetching doctor specific appointments:", error);
        return [];
    }
}

/**
 * Update appointment status (General status patch)
 * PATCH /appointments/{id}/status
 */
export async function updateAppointmentStatus(appointmentId: number, status: string): Promise<any> {
    const { data } = await apiClient.patch<any>(`/appointments/${appointmentId}/status`, { status });
    return data;
}

/**
 * Mark appointment as COMPLETED (Doctor only action)
 * PATCH /appointments/completed/{appointment_id}
 */
export async function completeAppointment(appointmentId: number): Promise<void> {
    await apiClient.patch(`/appointments/completed/${appointmentId}`);
}

/**
 * Invalidate appointment (Doctor only action)
 * PATCH /appointments/invalidate/{appointment_id}
 */
export async function invalidateAppointment(appointmentId: number): Promise<void> {
    await apiClient.patch(`/appointments/invalidate/${appointmentId}`);
}

/**
 * Cancel appointment (General cancellation)
 * PUT /appointments/cancel/{appointment_id}
 */
export async function cancelAppointment(appointmentId: number): Promise<void> {
    await apiClient.put(`/appointments/cancel/${appointmentId}`);
}

/**
 * Get patients who have booked appointments with the doctor
 * GET /patients/my-patients
 */
export async function getMyPatients(): Promise<any[]> {
    try {
        const doctorId = await getCurrentDoctorId();
        if (!doctorId) return [];

        // 1. Get Appointments
        const appointments = await getDoctorSpecificAppointments(doctorId);

        // 2. Extract Unique Patients from Appointment Data
        // Use a Map to ensure uniqueness by patient_id
        const uniquePatients = new Map<number, any>();

        appointments.forEach(apt => {
            if (!uniquePatients.has(apt.patient_id)) {
                const nameParts = (apt.patient_name || '').split(' ');
                const firstName = nameParts[0] || 'Patient';
                const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : `#${apt.patient_id}`;

                uniquePatients.set(apt.patient_id, {
                    id: apt.patient_id,
                    first_name: firstName,
                    last_name: lastName,
                    email: apt.patient_email || '',
                    phone_number: apt.patient_phone || '',
                    gender: apt.patient_gender || '',          // Placeholder as gender is not in AppointmentDetailResponse
                    image: apt.patient_image || null
                });
            }
        });

        return Array.from(uniquePatients.values());
    } catch (error) {
        console.error("Error fetching doctor's patients:", error);
        return [];
    }
}

/**
 * Get appointment history for a specific patient
 * GET /doctors/patients/{patient_id}/history
 */
export async function getPatientAppointmentHistory(patientId: number): Promise<AppointmentDetailResponse[]> {
    try {
        const { data } = await apiClient.get<AppointmentDetailResponse[]>(`/doctors/patients/${patientId}/history`);
        return data || [];
    } catch (error) {
        console.error(`Error fetching history for patient ${patientId}:`, error);
        return [];
    }
}

/**
 * Helper to get current doctor ID with fallback
 */
export async function getCurrentDoctorId(): Promise<number | null> {
    try {
        const userRes = await apiClient.get<UserProfile>('/users/me');
        const user = userRes.data;

        if ('doctor_id' in user && user.doctor_id) return (user as any).doctor_id;

        console.warn("doctor_id not found in profile, attempting fallback lookup by email...");
        const doctors = await getAllDoctors();
        const matchingDoctor = doctors.find(d => d.email === user.email);

        return matchingDoctor ? matchingDoctor.id : null;
    } catch (error) {
        console.error("Error getting current doctor ID:", error);
        return null;
    }
}

/**
 * Get all data for the doctor dashboard
 */
export async function getDoctorDashboardData(): Promise<DoctorDashboardData | null> {
    try {
        // 1. Get Current User -> Doctor ID
        const userRes = await apiClient.get<UserProfile>('/users/me');
        const user = userRes.data;

        const doctorId = await getCurrentDoctorId();

        if (!doctorId) {
            console.error("Current user is not a doctor and no matching doctor record found by email");
            return null;
        }

        // 2. Fetch Doctor Profile
        const doctor = await getDoctorById(doctorId);
        if (!doctor) {
            console.error(`Doctor profile not found for ID: ${doctorId}`);
            return null;
        }

        // 3. Fetch Appointments (Doctor's Appointments)
        const appointments = await getDoctorSpecificAppointments(doctorId);

        // 4. Transform Data
        const stats: DoctorStats = {
            patients: new Set(appointments.map(a => a.patient_id)).size,
            appointments: appointments.length,
            reports: 0,
            earnings: "Rs. 0"
        };

        const todayAppointments: TodaysAppointment[] = appointments
            .filter(a => a.appointment_date === new Date().toISOString().split('T')[0])
            .map(a => ({
                id: a.id,
                name: a.patient_name || `Patient #${a.patient_id}`, // API should return patient name now
                condition: a.reason_for_visit || 'Routine Checkup',
                gender: a.patient_gender,
                time: a.appointment_time.substring(0, 5),
                status: a.status,
                badge: a.status === 'SCHEDULED' ? 'pending' : 
                       a.status === 'COMPLETE' ? 'active' : 
                       a.status === 'INVALID' ? 'error' : 'default',
                image: a.patient_image || null
            }))
            .slice(0, 3);
        const uniquePatientIds = new Set<number>();
        const recentPatients: RecentPatient[] = [];
        for (const apt of appointments) {
            if (!uniquePatientIds.has(apt.patient_id)) {
                uniquePatientIds.add(apt.patient_id);
                let colorClass = 'bg-gray-100 text-gray-800';
                const statusLower = apt.status.toLowerCase();
                recentPatients.push({
                    id: apt.patient_id,
                    name: apt.patient_name || `Patient #${apt.patient_id}`,
                    lastVisit: apt.appointment_date,
                    status: apt.status,
                    statusColor: colorClass
                });
            }
            if (recentPatients.length >= 3) break;
        }
        return {
            userInfo: user, // Pass raw user info
            doctorInfo: {
                name: doctor.first_name + " " + doctor.last_name,
                speciality: doctor.specialization,
                experience: doctor.experience_years || 0,
                gender: doctor.gender || 'Unknown',
                mobileNo: doctor.phone_number || '',
                emailId: doctor.email || '',
                avatar: doctor.photo_url || "/doctor.png"
            },
            doctor: doctor, // Raw doctor object for editing
            stats,
            todaysAppointments: todayAppointments,
            recentPatients: recentPatients
        };

    } catch (error) {
        console.error("Error fetching doctor dashboard data:", error);
        return null;
    }
}
