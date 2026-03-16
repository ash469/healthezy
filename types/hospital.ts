export interface Hospital {
    id: number;
    hospital_code: string;
    name: string;
    type?: string | null;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    phone_number: string;
    email: string;
    website?: string | null;
    emergency_number: string;
    total_beds: number;
    available_beds: number;
    latitude: number | string;
    longitude: number | string;
    logo_url?: string | null;
    license_number?: string | null;
    accreditation?: string | null;
    established_year: number;
    is_active: boolean;
    is24x7: boolean;
}

// export interface Department {
//     id: number;
//     department_code: string;
//     name: string;
//     description?: string | null;
//     head_of_department?: string | null;
//     phone_number?: string | null;
//     email?: string | null;
//     floor_number?: number | null;
//     building?: string | null;
//     is_active: boolean;
// }

export interface HospitalApplicationData {
    name: string;
    type: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    phone_number: string;
    email: string;
    website: string | null;
    emergency_number: string;
    total_beds: number;
    available_beds: number;
    is24x7: boolean;
    latitude: number;
    longitude: number;
    logo_url: string;
    license_number: string;
    accreditation: string;
    established_year: number;
}

export interface HospitalApplicationResponse extends HospitalApplicationData {
    id: number;
    admin_id: number;
    status: 'PENDING' | 'REVIEW' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN' | 'APPROVED';
    created_at: string;
    updated_at: string;
}
