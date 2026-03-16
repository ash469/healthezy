/**
 * Official SuperAdmin Technical Reference Schemas
 */

export type AdminEntity = 'hospital' | 'lab';
export type AdminEntityPlural = 'hospitals' | 'labs';
export type AdminApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'UNDER_REVIEW';

export interface AdminHospitalResponse {
    id: number;
    hospital_code: string;
    name: string;
    type?: string;
    description?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    phone_number?: string;
    email: string;
    website?: string;
    emergency_number?: string;
    total_beds?: number;
    available_beds?: number;
    latitude?: number;
    longitude?: number;
    logo_url?: string;
    license_number?: string;
    accreditation?: string;
    established_year?: number;
    is_active?: boolean;
    is24x7?: boolean;
    status: AdminApplicationStatus;
    created_at?: string;
    updated_at?: string;
}

export interface AdminLabResponse {
    id: number;
    lab_code: string;
    name: string;
    type?: string;
    description?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    phone_number: string;
    email: string;
    website?: string;
    is24x7?: boolean;
    opening_time?: string;
    closing_time?: string;
    license_number?: string;
    accreditation?: string;
    established_year?: number;
    latitude?: number;
    longitude?: number;
    logo_url?: string;
    is_active?: boolean;
    status: AdminApplicationStatus;
    created_at?: string;
    updated_at?: string;
}

export interface AdminUserResponse {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: string;
    is_superuser: boolean;
    is_active: boolean;
    last_login: string | null;
}

export interface AdminPatientResponse {
    id: number;
    patient_code: string;
    full_name: string;
    email: string;
    phone_number: string;
    gender: string;
    date_of_birth: string;
}
