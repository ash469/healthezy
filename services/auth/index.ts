import { apiClient } from '../config';
import type { LoginRequest, LoginResponse, UserProfile, UpdateUserRequest, SignupRequest } from './types';

/**
 * Register a new user or hospital
 * POST /auth/signup
 */
export async function signup(userData: SignupRequest): Promise<UserProfile> {
    const { data } = await apiClient.post<UserProfile>('/auth/signup', userData);
    return data;
}

/**
 * Login user and store access token
 * POST /auth/login
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
    if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        if (credentials.role) {
            localStorage.setItem('role', credentials.role);
        }
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    }

    return data;
}

/**
 * Get current user profile
 * GET /users/me
 * Requires: Authorization header with Bearer token
 */
export async function getCurrentUser(): Promise<UserProfile> {
    const token = localStorage.getItem('access_token') || localStorage.getItem('auth_token');

    if (!token) {
        throw new Error('AUTH_ERROR: No authentication token found. Please login.');
    }

    try {
        const { data } = await apiClient.get<UserProfile>('/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new Error('AUTH_ERROR: Session expired. Please login again.');
        }
        throw error;
    }
}

/**
 * Logout user and clear token
 */
export function logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    delete apiClient.defaults.headers.common['Authorization'];
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return !!(localStorage.getItem('access_token') || localStorage.getItem('auth_token'));
}

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
    return localStorage.getItem('access_token') || localStorage.getItem('auth_token');
}
/**
 * Update user details
 * PATCH /users/{target_user_id}
 */
export async function updateUser(userId: number, updateData: UpdateUserRequest): Promise<UserProfile> {
    const token = getAuthToken();

    if (!token) {
        throw new Error('AUTH_ERROR: No authentication token found. Please login.');
    }

    try {
        const token = getAuthToken();
        const { data } = await apiClient.patch<UserProfile>(`/users/${userId}`, updateData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data;
    } catch (error: any) {
        console.error(`Error updating user ${userId}:`, error);
        if (error.response?.status === 401) {
            throw new Error('AUTH_ERROR: Session expired. Please login again.');
        }
        throw new Error(`UPDATE_ERROR: ${error.response?.data?.detail || error.message}`);
    }
}
/**
 * Resolve the correct dashboard path for a given role
 */
export function resolveDashboardPath(role: string): string {
    const r = (role || '').toLowerCase();

    // Exact mapping based on directory structure and API blueprint
    const dashboardRoutes: Record<string, string> = {
        'user': '/dashboard/patient',
        'patient': '/dashboard/patient',
        'doctor': '/dashboard/doctor',
        'lab-admin': '/dashboard/lab',
        'lab_admin': '/dashboard/lab',
        'hospital': '/dashboard/hospital',
        'hospital-admin': '/dashboard/hospital',
        'hospital_admin': '/dashboard/hospital',
        'pharmacist': '/dashboard/pharmacy',
        'seller': '/dashboard/ecommerce',
        'super_admin': '/dashboard/admin'
    };

    return dashboardRoutes[r] || '/';
}
