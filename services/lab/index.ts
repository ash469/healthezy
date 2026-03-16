import { apiClient } from '../config';
import type {
    LabResponse,
    LabTestResponse,
    UserResponse,
    NewLab,
    LabUpdates,
    NewLabTest,
    NewLabBooking,
    LabBookingResponse,
    LabBookingDetailResponse,
    SignUpForm,
} from '@/types/lab';
import type { LabDashboardData } from '@/types/dashboard/lab';


/**
 * 1. POST /labs/admin/register
 *    Register a new lab-admin user (superuser token required despite public router).
 */
export async function registerLabAdmin(formData: SignUpForm): Promise<UserResponse> {
    const { data } = await apiClient.post<UserResponse>('/labs/admin/register', formData);
    return data;
}

/**
 * 2. GET /labs/
 *    List all active labs.
 */
export async function getAllLabs(): Promise<LabResponse[]> {
    const { data } = await apiClient.get<LabResponse[]>('/labs/');
    return data;
}

/**
 * 3. GET /labs/code/{lab_code}
 *    Get a single lab by its unique code string (e.g. LAB-A1B2C3D4).
 */
export async function getLabByCode(labCode: string): Promise<LabResponse | null> {
    try {
        const { data } = await apiClient.get<LabResponse>(`/labs/code/${labCode}`);
        return data;
    } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
    }
}

/**
 * 4. GET /labs/{lab_id}
 *    Get a single lab by its integer ID.
 */
export async function getLabById(labId: number): Promise<LabResponse | null> {
    try {
        const { data } = await apiClient.get<LabResponse>(`/labs/${labId}`);
        return data;
    } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
    }
}

/**
 * 5. GET /labs/city/{city}
 *    All labs in a given city.
 */
export async function getLabsByCity(city: string): Promise<LabResponse[]> {
    const { data } = await apiClient.get<LabResponse[]>(`/labs/city/${city}`);
    return data;
}

/**
 * 6. GET /labs/nearby
 *    Labs within a radius of a coordinate.
 *    Query params: latitude, longitude, radius_km
 */
export async function getNearbyLabs(
    latitude: number,
    longitude: number,
    radius_km: number = 10
): Promise<LabResponse[]> {
    const { data } = await apiClient.get<LabResponse[]>('/labs/nearby', {
        params: { latitude, longitude, radius_km },
    });
    return data;
}

/**
 * 7. GET /labs/{lab_id}/tests
 *    All tests offered by a specific lab.
 */
export async function getLabTests(labId: number): Promise<LabTestResponse[]> {
    const { data } = await apiClient.get<LabTestResponse[]>(`/labs/${labId}/tests`);
    return data;
}

// --- LAB-ADMIN Routes (user_auth_guard + enforce_lab_admin_privilege) ---

/**
 * 8. POST /labs/applications
 *    Submit a new lab registration application.
 */
export async function submitLabApplication(labData: NewLab): Promise<LabResponse> {
    const { data } = await apiClient.post<LabResponse>('/labs/applications', labData);
    return data;
}

/**
 * 9. GET /labs/applications/me
 *    All applications submitted by the currently logged-in lab-admin.
 */
export async function getMyLabApplications(): Promise<LabResponse[]> {
    const { data } = await apiClient.get<LabResponse[]>('/labs/applications/me');
    return data;
}

/**
 * 9.1 GET /labs/me
 *     All labs managed by the currently logged-in lab-admin.
 */
export async function getMyManagedLabs(): Promise<LabResponse[]> {
    const { data } = await apiClient.get<LabResponse[]>('/labs/me');
    return data;
}

/**
 * 10. GET /labs/applications/{application_id}
 *     A specific application by its ID.
 */
export async function getLabApplicationById(applicationId: number): Promise<LabResponse | null> {
    try {
        const { data } = await apiClient.get<LabResponse>(`/labs/applications/${applicationId}`);
        return data;
    } catch (error: any) {
        if (error.response?.status === 404) return null;
        throw error;
    }
}

/**
 * 11. PATCH /labs/applications/{application_id}/withdraw
 *     Withdraw a pending lab application.
 */
export async function withdrawLabApplication(applicationId: number): Promise<void> {
    await apiClient.patch(`/labs/applications/${applicationId}/withdraw`);
}

/**
 * 12. PUT /labs/{lab_id}
 *     Update an approved lab's details (all fields optional).
 *     Returns { message: "Lab {id} updated successfully" }
 */
export async function updateLab(labId: number, updates: LabUpdates): Promise<{ message: string }> {
    const { data } = await apiClient.put<{ message: string }>(`/labs/${labId}`, updates);
    return data;
}

/**
 * 13. DELETE /labs/{lab_id}
 *     Soft-delete a lab (scoped by admin ownership unless superuser).
 *     Returns { message: "Lab {id} deleted successfully" }
 */
export async function deleteLab(labId: number): Promise<{ message: string }> {
    const { data } = await apiClient.delete<{ message: string }>(`/labs/${labId}`);
    return data;
}

/**
 * 14. POST /labs/{lab_id}/tests
 *     Add a new test to an approved lab.
 */
export async function addLabTest(labId: number, testData: NewLabTest): Promise<LabTestResponse> {
    const { data } = await apiClient.post<LabTestResponse>(`/labs/${labId}/tests`, testData);
    return data;
}

/**
 * 15. DELETE /labs/{lab_id}/tests/{test_id}
 *     Delete a specific test from a lab.
 *     Returns { message: "Test {id} deleted successfully" }
 */
export async function deleteLabTest(
    labId: number,
    testId: number
): Promise<{ message: string }> {
    const { data } = await apiClient.delete<{ message: string }>(`/labs/${labId}/tests/${testId}`);
    return data;
}

// --- Booking Routes ---

/**
 * 16. POST /labs/bookings
 *     Create a new lab booking.
 */
export const bookLabTest = async (bookingData: NewLabBooking): Promise<LabBookingResponse> => {
    const { data } = await apiClient.post<LabBookingResponse>('/labs/bookings', bookingData);
    return data;
};

/**
 * 17. GET /labs/bookings
 *     All bookings for the currently logged-in lab admin, optionally filtered by lab_id.
 */
export async function getLabBookings(labId?: number): Promise<LabBookingDetailResponse[]> {
    const { data } = await apiClient.get<LabBookingDetailResponse[]>('/labs/bookings', {
        params: labId ? { lab_id: labId } : {},
    });
    return data;
}

/**
 * 18. GET /patients/lab-bookings
 *     All bookings for the currently logged-in patient.
 */
export async function getPatientLabBookings(): Promise<LabBookingDetailResponse[]> {
    const { data } = await apiClient.get<LabBookingDetailResponse[]>('/patients/lab-bookings');
    return data;
}

// --- Dashboard Helpers ---

/**
 * Aggregate: fetch dashboard data for the currently logged-in lab-admin.
 * Combines /users/me → lab_id → /labs/{id} + /labs/{id}/tests
 */
export async function getLabDashboardData(): Promise<LabDashboardData | null> {
    try {
        // Find the lab that belongs to this admin from their applications
        const myLabs = await getMyLabApplications();

        if (!myLabs || myLabs.length === 0) {
            console.error('No lab applications found for this user');
            return null;
        }

        // Just take the first lab the admin manages
        const lab = myLabs[0];
        const labId: number = lab.id;

        const { data: tests } = await apiClient.get<LabTestResponse[]>(`/labs/${labId}/tests`);

        return {
            labInfo: lab,
            availableTests: tests ?? [],
        };
    } catch (error) {
        console.error('Error fetching lab dashboard data:', error);
        return null;
    }
}

// --- Legacy aliases (backward compat) ---
/** @deprecated Use getMyLabApplications() */
export const getLabApplication = getMyLabApplications;
/** @deprecated Use deleteLabTest() */
export const removeLabTest = deleteLabTest;
