import { apiClient } from '../config';
import type { LoginRequest, LoginResponse } from './types';

// POST /auth/login
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
    if (data.token) localStorage.setItem('auth_token', data.token);
    return data;
}
