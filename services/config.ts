import axios from 'axios';
export const API_BASE_URL = 'http://localhost:8080';
export const API_URL = `${API_BASE_URL}/api/v1`;

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token') || localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            const tenantId = localStorage.getItem('tenant_id') || '1';
            config.headers['X-TenantID'] = tenantId;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized - clearing token');
            if (typeof window !== 'undefined') {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('auth_token');
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }
        if (error.response?.status === 403) {
            console.error('Forbidden - insufficient permissions');
        }
        if (error.response?.status === 404) {
            console.error('Resource not found');
        }
        if (error.response?.status === 500) {
            console.error('Server error - please try again later');
        }
        return Promise.reject(error);
    }
);
