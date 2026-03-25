import { adminClient } from './adminAuth';
import {
    AdminEntity,
    AdminUserResponse,
    AdminPatientResponse,
    AdminHospitalResponse,
    AdminLabResponse
} from '../types/admin';

/**
 * SuperAdmin (System Global Admin) API Service
 * Strictly limited to the final 5 core routes provided.
 */
export const adminService = {
    /**
     * List Applications
     * GET /api/v1/admin/applications/{hospital|lab}
     */
    async getApplications(entity: AdminEntity, status: string = 'pending'): Promise<any[]> {
        const response = await adminClient.get(`/admin/applications/${entity}`, {
            params: { status }
        });
        return response.data;
    },

    /**
     * View Details
     * GET /api/v1/{hospitals|labs}/applications/{id}
     */
    async getApplicationDetails(entity: 'hospitals' | 'labs', id: number): Promise<AdminHospitalResponse | AdminLabResponse> {
        const response = await adminClient.get(`/${entity}/applications/${id}`);
        return response.data;
    },

    /**
     * Approve / Reject
     * PATCH /api/v1/admin/{hospitals|labs}/{approve|reject}/{id}
     */
    async performApplicationAction(entity: 'hospitals' | 'labs', action: 'approve' | 'reject', id: number) {
        const response = await adminClient.patch(`/admin/${entity}/${action}/${id}`);
        return response.data;
    },

    /**
     * User Management
     * GET /api/v1/admin/users
     */
    async listAllUsers(active: boolean = true): Promise<AdminUserResponse[]> {
        const response = await adminClient.get('/admin/users', {
            params: { active: active.toString() }
        });
        return response.data;
    },

    /**
     * Patient Data
     * GET /api/v1/admin/patients
     */
    async listAllPatients(): Promise<AdminPatientResponse[]> {
        const response = await adminClient.get('/admin/patients');
        return response.data;
    },

    /**
     * List Provider Admins (Hospitals or Labs)
     * Filters all users by their specific administrative role.
     */
    async listProviderAdmins(entity: AdminEntity, active: boolean = true): Promise<AdminUserResponse[]> {
        const users = await this.listAllUsers(active);
        const role = entity === 'hospital' ? 'hospital-admin' : 'lab-admin';
        return users.filter(user => user.role === role);
    }
};
