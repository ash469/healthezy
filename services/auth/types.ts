export type UserRole = "user" | "hospital-admin" | "doctor" | "hospital" | "lab-admin";

export interface LoginRequest {
    email: string;
    password: string;
    role: UserRole;
}

export interface SignupRequest {
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    role: "user" | "hospital-admin" | "lab-admin" | "hospital";
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface UserBase {
    id: number;
    email: string;
    role: UserRole;
}

// Role: "user" | "hospital-admin" | "lab-admin"
export interface StandardUserProfile extends UserBase {
    first_name: string;
    last_name: string;
    phone_number: string;
    is_superuser: boolean;
    hospital_id: number | null;
    lab_id: number | null;
    doctor_id: number | null;
    is_active: boolean;
    email_verified: boolean;
    phone_verified: boolean;
    last_login: string;
    created_at: string;
    updated_at: string;
}

// Role: "doctor"
export interface DoctorUserProfile extends UserBase {
    doctor_id: number;
    doctor_code: string;
    first_login: boolean;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    full_name: string;
    phone_number: string;
    gender: "male" | "female" | "other";
    specialization: string;
    qualification: string;
    registration_number: string;
    experience_years: number;
    consultation_fee: number;
    bio: string;
    address: string;
    photo_url: string | null;
    department_id: number;
    hospital_id: number;
    status: "active" | "inactive" | "on_leave";
}

// Role: "hospital"
export interface HospitalUserProfile extends UserBase {
    hospital_code: string;
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
    website: string;
    emergency_number: string;
    total_beds: number;
    available_beds: number;
    latitude: number;
    longitude: number;
    logo_url: string | null;
    license_number: string;
    accreditation: string;
    established_year: number;
    is_active: boolean;
    is24x7: boolean;
}

export type UserProfile = StandardUserProfile | DoctorUserProfile | HospitalUserProfile;

export interface UpdateUserRequest {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
}

