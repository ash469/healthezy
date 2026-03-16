import axios from 'axios';
import { API_URL } from './config';

/**
 * Isolated Admin Authentication Service
 * Uses 'admin_access_token' to avoid conflict with main app
 */
export const adminAuth = {
    async login(credentials: any) {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        if (response.data.access_token) {
            localStorage.setItem('admin_access_token', response.data.access_token);
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('admin_access_token');
    },

    getToken() {
        return localStorage.getItem('admin_access_token');
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};

/**
 * Isolated Admin API Client
 */
export const adminClient = axios.create({
    baseURL: API_URL,
});

adminClient.interceptors.request.use((config) => {
    const token = adminAuth.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Added X-TenantID for backend consistency
    if (typeof window !== 'undefined') {
        const tenantId = localStorage.getItem('tenant_id') || '1';
        config.headers['X-TenantID'] = tenantId;
    }
    return config;
});
