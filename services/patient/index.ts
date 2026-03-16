import { apiClient } from '../config';
import type { PatientDashboardData, PatientInfo, PatientStats, AppointmentItem } from '@/types/dashboard/patient';
import { getDoctorById } from '@/services/doctor'; // Import getDoctorById
import { getPatientLabBookings } from '@/services/lab';
import type { Patient, PatientCreateRequest } from '@/types/patient';
export type PatientApiResponse = Patient;
import type { AppointmentResponse } from '@/types/appointment';
import type { UserProfile } from '../auth/types';

/**
 * 1. Create a Patient
 * Endpoint: POST /patients/
 */
export async function createPatient(patientData: PatientCreateRequest): Promise<PatientApiResponse> {
    try {
        const { data } = await apiClient.post<PatientApiResponse>('/patients/', patientData);
        return data;
    } catch (error: any) {
        console.error("Error creating patient:", error);
        throw new Error(`CREATE_PATIENT_ERROR: ${error.response?.data?.detail || error.message}`);
    }
}

/**
 * 2. Get Full Details of a Patient
 * Endpoint: GET /patients/{patient_id}
 */
export async function getPatientById(patientId: number): Promise<PatientApiResponse> {
    try {
        const { data } = await apiClient.get<PatientApiResponse>(`/patients/${patientId}`);
        return data;
    } catch (error: any) {
        console.error(`Error fetching patient ${patientId}:`, error);
        throw new Error(`FETCH_PATIENT_ERROR: ${error.response?.data?.detail || error.message}`);
    }
}

/**
 * 3. Get My Patients
 * Endpoint: GET /patients/
 */
export async function getMyPatients(): Promise<PatientApiResponse[]> {
    try {
        const { data } = await apiClient.get<PatientApiResponse[]>('/patients/');
        return data || [];
    } catch (error: any) {
        console.error("Error fetching my patients:", error);
        throw new Error(`FETCH_PATIENTS_ERROR: ${error.response?.data?.detail || error.message}`);
    }
}

/**
 * 4. Update Patient Details
 * Endpoint: PUT /patients/{patient_id}
 */
export async function updatePatient(patientId: number, patientData: Partial<PatientCreateRequest>): Promise<PatientApiResponse> {
    try {
        const { data } = await apiClient.put<PatientApiResponse>(`/patients/${patientId}`, patientData);
        return data;
    } catch (error: any) {
        console.error(`Error updating patient ${patientId}:`, error);
        throw new Error(`UPDATE_PATIENT_ERROR: ${error.response?.data?.detail || error.message}`);
    }
}

/**
 * 5. Delete Patient
 * Endpoint: DELETE /patients/{patient_id}
 */
export async function deletePatient(patientId: number): Promise<void> {
    try {
        await apiClient.delete(`/patients/${patientId}`);
    } catch (error: any) {
        console.error(`Error deleting patient ${patientId}:`, error);
        throw new Error(`DELETE_PATIENT_ERROR: ${error.response?.data?.detail || error.message}`);
    }
}

/**
 * 6. Get All Patients (Admin Only)
 * Endpoint: GET /patients/all
 */
export async function getAllPatients(): Promise<PatientApiResponse[]> {
    try {
        const { data } = await apiClient.get<PatientApiResponse[]>('/patients/all');
        return data || [];
    } catch (error: any) {
        console.error("Error fetching all patients:", error);
        throw new Error(`FETCH_ALL_PATIENTS_ERROR: ${error.response?.data?.detail || error.message}`);
    }
}

/**
 * Get all data for the patient dashboard
 */
export async function getPatientDashboardData(): Promise<PatientDashboardData> {
    try {
        console.log("Fetching patient dashboard data...");

        // 1. Get Current User 
        let user: UserProfile;
        try {
            const userRes = await apiClient.get<UserProfile>('/users/me');
            user = userRes.data;
            console.log("DEBUG: /users/me response data:", JSON.stringify(user, null, 2));
        } catch (error: any) {
            console.error("Error fetching /users/me:", error);
            throw new Error(`AUTH_ERROR: Failed to fetch your user profile. ${error.response?.data?.detail || error.message}`);
        }

        // 2. Fetch Patients
        console.log("Fetching patients...");
        let patients: PatientApiResponse[] = [];
        try {
            patients = await getMyPatients();
        } catch (error: any) {
            console.warn("Failed to fetch patients, continuing with empty list:", error);
        }

        // 3. Fetch Appointments
        console.log("Fetching appointments...");
        let appointments: AppointmentResponse[] = [];
        try {
            const aptRes = await apiClient.get<AppointmentResponse[]>('/appointments/my');
            appointments = aptRes.data || [];
        } catch (error: any) {
            console.warn("Failed to fetch appointments, continuing with empty list:", error);
        }

        // 4. Transform Appointments
        const todayStr = new Date().toISOString().split('T')[0];
        // Fetch doctor details for appointments to get accurate names
        const doctorIds = new Set(appointments.map(a => a.doctor_id).filter((id): id is number => id !== null));
        const doctorsMap: Record<number, string> = {};
        await Promise.all(Array.from(doctorIds).map(async (id) => {
            try {
                const doc = await getDoctorById(id);
                if (doc) doctorsMap[id] = `Dr. ${doc.full_name}`;
            } catch (e) {
                console.warn(`Failed to fetch doctor ${id}`, e);
            }
        }));

        // Create a map of patient IDs to names for easy lookup
        const patientsMap: Record<number, string> = {};
        patients.forEach(p => {
            patientsMap[p.id] = p.full_name;
        });

        const upcomingAppointments: AppointmentItem[] = appointments
            .filter(a => a.appointment_date >= todayStr)
            .map(a => {
                const docNameFromApi = (a as any).doctor_name;
                const doctorName = a.doctor_id && doctorsMap[a.doctor_id] ? doctorsMap[a.doctor_id] : (docNameFromApi || "Dr. Assigned");
                const patientName = patientsMap[a.patient_id] || `Patient #${a.patient_id}`;
                // Combine date and time for display
                const dateTimeString = `${a.appointment_date}T${a.appointment_time}`;
                const dateObj = new Date(dateTimeString);

                // Check if date is valid
                const isValidDate = !isNaN(dateObj.getTime());
                const formattedDate = isValidDate
                    ? dateObj.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                    : `${a.appointment_date} ${a.appointment_time}`; // Fallback

                return {
                    id: a.id,
                    doctor: doctorName,
                    patient: patientName,
                    date: formattedDate,
                    status: a.status,
                    badge: a.status === 'Confirmed' ? 'active' : 'pending'
                };
            });

        // 4b. Fetch Lab Bookings
        console.log("Fetching lab bookings...");
        let labBookingsRaw: any[] = [];
        try {
            labBookingsRaw = await getPatientLabBookings();
        } catch (error: any) {
            console.warn("Failed to fetch lab bookings, continuing with empty list:", error);
        }

        const transformedLabReports = labBookingsRaw.map(b => ({
            id: b.id,
            lab: b.lab_name || "Unknown Lab",
            test: b.tests ? b.tests.map((t: any) => t.name).join(', ') : "Tests",
            date: b.booking_date,
            price: b.total_price || 0,
            status: b.status,
            badge: b.status === 'Completed' || b.status === 'COMPLETED' ? 'active' : 'pending'
        }));

        // 5. Find "Self" Patient (based on email match)
        const selfPatient = patients.find(p => p.email === user.email);

        // 6. Construct Dashboard Data
        const stats: PatientStats = {
            patients: patients.length,
            appointments: appointments.length,
            prescriptions: 0,
            labTests: transformedLabReports.length
        };

        const dashboardData: PatientDashboardData = {
            userInfo: user,
            patientInfo: {
                name: ('first_name' in user) ? `${user.first_name} ${user.last_name || ''}`.trim() : (user as any).name || "User",
                age: selfPatient?.age,
                gender: selfPatient?.gender,
                bloodGroup: selfPatient?.blood_group,
                mobileNo: user.phone_number || selfPatient?.phone_number || "N/A",
                emailId: user.email,
                avatar: "/doctor.png"
            },
            stats: stats,
            upcomingAppointments: upcomingAppointments,
            labReports: transformedLabReports,
            patients: patients.map(p => ({
                ...p,
                name: p.full_name,
                type: p.gender === 'male' ? 'Family Member (M)' : 'Family Member (F)',
                nextVisit: "No scheduled visit",
                badge: "active"
            })),
            recentReports: [],
            insuranceClaims: []
        };

        return dashboardData;

    } catch (error: any) {
        console.error("Error in getPatientDashboardData:", error);
        throw error;
    }
}
