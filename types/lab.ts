/**
 * Lab API Types — matches the official API reference
 */

export type LabStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'UNDER_REVIEW';
export type TestCategory = 'Blood' | 'Urine' | 'Imaging';
export type SampleType = 'blood' | 'urine' | 'saliva' | 'stool';

/** Returned by GET /labs/, GET /labs/{id}, GET /labs/code/{code}, etc. */
export interface LabResponse {
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
    phone_number?: string;
    email?: string;
    website?: string | null;
    is24x7: boolean;
    opening_time?: string; // "HH:MM:SS"
    closing_time?: string; // "HH:MM:SS"
    hospital_id?: number | null;
    license_number?: string;
    accreditation?: string;
    established_year?: number;
    latitude?: string;
    longitude?: string;
    logo_url?: string | null;
    is_active: boolean;
    status: LabStatus;
    created_at?: string;
    updated_at?: string;
    rating?: number;
    imageUrl?: string; // Fallback for components
    availableTests?: LabTestResponse[];
}

/** Returned by GET /labs/{lab_id}/tests, POST /labs/{lab_id}/tests */
export interface LabTestResponse {
    id: number;
    lab_id: number;
    test_code: string;
    name: string;
    description?: string;
    category: TestCategory;
    turnaround_time_hours: number;
    sample_type: SampleType;
    test_price: number; // decimal number e.g. 350.00
    normal_range?: string;
    unit_of_measurement?: string;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

/** Returned by POST /labs/admin/register */
export interface UserResponse {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: string;
    is_superuser: boolean;
    password: null;
    hospital_id: number | null;
    is_active: boolean;
    email_verified: boolean;
    phone_verified: boolean;
    last_login: string | null;
    created_at: string;
    updated_at: string;
}

// ─── Request / Body Types ──────────────────────────────────────────────────────

/** Body for POST /labs/admin/register */
export interface SignUpForm {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: string;
    [key: string]: any;
}

/** Body for POST /labs/applications */
export interface NewLab {
    name: string;
    type: string;
    description?: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    phone_number: string;
    email: string;
    website?: string | null;
    is24x7: boolean;
    opening_time: string;    // "HH:MM:SS"
    closing_time: string;    // "HH:MM:SS"
    hospital_id?: number | null;
    license_number: string;
    accreditation: string;
    established_year: number;
    latitude: string;        // decimal string
    longitude: string;       // decimal string
}

/** Body for PUT /labs/{lab_id} — all optional */
export type LabUpdates = Partial<NewLab>;

/** Body for POST /labs/{lab_id}/tests */
export interface NewLabTest {
    name: string;
    description?: string;
    category: TestCategory;
    turnaround_time_hours: number;
    sample_type: SampleType;
    test_price: number;       // decimal number e.g. 350.00
    normal_range?: string;
    unit_of_measurement?: string;
}


// ─── Booking Types ─────────────────────────────────────────────────────────────

/** Body for POST /labs/bookings */
export interface NewLabBooking {
    patient_id: number;
    lab_id: number;
    test_ids: number[];
    booking_date: string; // "YYYY-MM-DD"
}

/** Returned by POST /labs/bookings */
export interface LabBookingResponse {
    id: number;
    booking_number: string;
    patient_id: number;
    lab_id: number;
    booking_date: string;
    status: string;
    total_price: number;
    created_at: string;
}

/** Returned by GET /labs/bookings */
export interface LabBookingDetailResponse extends LabBookingResponse {
    patient_name: string;
    patient_phone: string;
    lab_name: string;
    tests: LabTestResponse[];
}

// ─── Legacy aliases (keep for dashboard compatibility) ─────────────────────────

/** @deprecated Use LabResponse instead */
export type Lab = LabResponse;
/** @deprecated Use LabTestResponse instead */
export type Test = LabTestResponse;
/** @deprecated Use NewLab instead */
export type LabApplicationData = NewLab;
/** @deprecated Use LabResponse instead */
export type LabApplicationResponse = LabResponse;
