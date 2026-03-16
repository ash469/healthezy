import { apiClient } from '../config';
import type { Hospital, HospitalApplicationData, HospitalApplicationResponse } from '@/types/hospital';
import type { Doctor } from '@/types/doctor';
import type {
    HospitalDashboardData,
    HospitalStats,
    HospitalTodaysAppointment,
    ActiveDoctor
} from '@/types/dashboard/hospital';
import type { AppointmentResponse, AppointmentDetailResponse } from '@/types/appointment';

/**
 * Get Hospital Application for current user
 * GET /api/v1/hospitals/applications/me
 */
export async function getHospitalApplication(): Promise<HospitalApplicationResponse[]> {
    try {
        const { data } = await apiClient.get<HospitalApplicationResponse[]>('/hospitals/applications/me');
        return Array.isArray(data) ? data : [];
    } catch (error: any) {
        if (error.response?.status === 404) return [];
        throw error;
    }
}

/**
 * Get specific hospital application by ID
 * GET /api/v1/hospitals/applications/{id}
 */
export async function getHospitalApplicationById(id: number): Promise<HospitalApplicationResponse | null> {
    try {
        const { data } = await apiClient.get<HospitalApplicationResponse>(`/hospitals/applications/${id}`);
        return data;
    } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
    }
}

/**
 * Update Hospital Profile
 * PUT /hospitals/{hospital_code}
 */
export async function updateHospitalProfile(code: string, data: Partial<Hospital>): Promise<Hospital> {
    const { data: response } = await apiClient.put<Hospital>(`/hospitals/${code}`, data);
    return response;
}

/**
 * Get all hospitals
 */
export async function getAllHospitals(): Promise<Hospital[]> {
    try {
        const { data } = await apiClient.get<Hospital[]>('/hospitals/');
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        return [];
    }
}

/**
 * Get hospital by ID
 */
export async function getHospitalById(id: number): Promise<Hospital | null> {
    try {
        const { data } = await apiClient.get<Hospital>(`/hospitals/${id}`);
        return data;
    } catch (error) {
        console.error(`Error fetching hospital ${id}:`, error);
        return null;
    }
}

/**
 * Get hospital by Code
 */
export async function getHospitalByCode(code: string): Promise<Hospital | null> {
    try {
        const { data } = await apiClient.get<Hospital>(`/hospitals/code/${code}`);
        return data;
    } catch (error) {
        console.error(`Error fetching hospital by code ${code}:`, error);
        return null;
    }
}

/**
 * Find hospitals by city
 */
export async function getHospitalsByCity(city: string): Promise<Hospital[]> {
    try {
        const { data } = await apiClient.get<Hospital[]>(`/hospitals/city/${city}`);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(`Error fetching hospitals in city ${city}:`, error);
        return [];
    }
}

/**
 * Find hospitals by type
 */
export async function getHospitalsByType(type: string): Promise<Hospital[]> {
    try {
        const { data } = await apiClient.get<Hospital[]>(`/hospitals/type/${type}`);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(`Error fetching hospitals by type ${type}:`, error);
        return [];
    }
}

/**
 * Get nearby hospitals
 */
export async function getNearbyHospitals(latitude: number, longitude: number, radiusKm: number = 10): Promise<Hospital[]> {
    try {
        const { data } = await apiClient.get<Hospital[]>('/hospitals/nearby', {
            params: { latitude, longitude, radius_km: radiusKm }
        });
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching nearby hospitals:", error);
        return [];
    }
}

/**
 * Get Doctors in Hospital
 */
export async function getDoctorsInHospital(id: number): Promise<Doctor[]> {
    try {
        const { data } = await apiClient.get<Doctor[]>(`/hospitals/${id}/doctors`);
        return data;
    } catch (error) {
        console.error(`Error fetching doctors for hospital ${id}:`, error);
        return [];
    }
}

/**
 * Get all data for the hospital dashboard
 */
export async function getHospitalDashboardData(): Promise<HospitalDashboardData | null> {
    try {
        // 1. Get current user profile to find their assigned hospital
        const { data: profile } = await apiClient.get<any>('/users/me');
        if (!profile || !profile.hospital_id) {
            console.error("No hospital_id found in user profile");
            return null;
        }
        const hospitalId = profile.hospital_id;

        // 2. Get Hospital Details
        const hospitalRes = await apiClient.get<Hospital>(`/hospitals/${hospitalId}`);
        const hospital = hospitalRes.data;
        // 2. Fetch Doctors
        const doctorsRes = await apiClient.get<Doctor[]>(`/hospitals/${hospitalId}/doctors`);
        const doctors = doctorsRes.data || [];
        // 3. Fetch Appointments
        const aptRes = await apiClient.get<AppointmentDetailResponse[]>(`/hospitals/${hospitalId}/appointments`);
        const appointments = aptRes.data || [];
        // 4. Transform Data
        const today = new Date().toISOString().split('T')[0];
        const todaysAppointmentsData = appointments.filter(a => a.appointment_date === today);
        const stats: HospitalStats = {
            appointmentsToday: todaysAppointmentsData.length,
            activeDoctors: doctors.length,
            reportsProcessed: 0
        };

        const todaysAppointments: HospitalTodaysAppointment[] = todaysAppointmentsData.map(a => ({
            id: a.id,
            name: a.patient_name || `Patient #${a.patient_id}`,
            doctorName: a.doctor_name ? `Dr. ${a.doctor_name}` : 'Unknown Doctor',
            details: a.reason_for_visit || 'Routine Checkup',
            time: a.appointment_time.substring(0, 5),
            badge: a.status === 'Confirmed' ? 'Approved' : 'Pending'
        }));

        const activeDoctors: ActiveDoctor[] = doctors.slice(0, 5).map(d => ({
            id: d.id,
            name: d.full_name || `${d.first_name || ''} ${d.last_name || ''}`.trim() || 'Doctor',
            speciality: d.specialization,
            status: d.status || 'Active',
            statusColor: (d.status === 'On Leave' || d.status === 'Active') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-blue-800'
        }));

        return {
            hospitalInfo: {
                id: hospital.id,
                hospitalCode: hospital.hospital_code,
                name: hospital.name,
                speciality: hospital.type || 'General Hospital',
                mobileNo: hospital.phone_number,
                emailId: hospital.email,
                address: [
                    hospital.address,
                    hospital.city,
                    hospital.state,
                    hospital.country
                ].filter(Boolean).join(', '),
                description: hospital.description || '',
                website: hospital.website || '',
                emergencyNumber: hospital.emergency_number || '',
                totalBeds: hospital.total_beds || 0,
                availableBeds: hospital.available_beds || 0,
                logoUrl: hospital.logo_url || '',
                city: hospital.city || '',
                state: hospital.state || '',
                zipCode: hospital.zip_code || '',
                country: hospital.country || '',
                latitude: typeof hospital.latitude === 'string' ? parseFloat(hospital.latitude) : hospital.latitude,
                longitude: typeof hospital.longitude === 'string' ? parseFloat(hospital.longitude) : hospital.longitude
            },
            stats,
            todaysAppointments,
            activeDoctors
        };

    } catch (error) {
        console.error("Error fetching hospital dashboard data:", error);
        return null;
    }
}

/**
 * Hospital Admin: Get My Hospital
 * GET /api/v1/hospitals/admin/my_hospital
 */
export async function getMyHospitalAdmin(): Promise<Hospital> {
    const { data } = await apiClient.get<Hospital>('/hospital_admin/my_hospital');
    return data;
}

/**
 * Get all appointments for a specific hospital (Admin view)
 * GET /api/v1/hospitals/{hospital_id}/appointments
 */
export async function getHospitalAppointments(hospitalId: number): Promise<AppointmentDetailResponse[]> {
    try {
        const { data } = await apiClient.get<AppointmentDetailResponse[]>(`/hospitals/${hospitalId}/appointments`);
        return data || [];
    } catch (error) {
        console.error(`Error fetching appointments for hospital ${hospitalId}:`, error);
        return [];
    }
}

/**
 * Hospital Admin: Manage Appointments (Legacy/Alternative)
 * GET /api/v1/hospitals/admin/my_hospital/appointments
 */
export async function getHospitalAdminAppointments(params?: any): Promise<AppointmentDetailResponse[]> {
    const { data } = await apiClient.get<AppointmentDetailResponse[]>('/hospital_admin/my_hospital/appointments', {
        params
    });
    return data;
}

/**
 * Helper to get current hospital ID for logged-in admin
 */
export async function getCurrentHospitalId(): Promise<number | null> {
    try {
        const { data: profile } = await apiClient.get<any>('/users/me');
        return profile?.hospital_id || null;
    } catch (error) {
        console.error("Error getting current hospital ID:", error);
        return null;
    }
}

/**
 * Hospital Admin: Add Doctor to Staff
 * PUT /hospitals/add/{doctor_id}
 */
export async function addDoctorToHospital(doctorId: number): Promise<any> {
    const { data } = await apiClient.put(`/hospital_admin/add/${doctorId}`);
    return data;
}

/**
 * Submit Hospital Application
 * POST /api/v1/hospitals/applications
 */
export async function submitHospitalApplication(data: HospitalApplicationData): Promise<HospitalApplicationResponse> {
    const { data: response } = await apiClient.post<HospitalApplicationResponse>('/hospitals/applications', data);
    return response;
}
