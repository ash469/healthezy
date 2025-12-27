
export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    tokenType: string;
    userId: number;
    email: string;
    phone: string;
    name: string;
    firstName: string;
    lastName: string;
    role: 'SUPER_ADMIN' | 'HOSPITAL_ADMIN' | 'DOCTOR' | 'PHARMACIST' | 'PATIENT' | 'LAB_ADMIN' | 'SELLER';
    userType: string;
    tenantId: number;
    expiresIn: number;
}
