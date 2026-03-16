export interface Doctor {
    id: number;
    doctor_code: string;
    role: string;
    password?: string;
    first_login: boolean;
    first_name: string;
    middle_name?: string;
    last_name: string;
    full_name: string;
    email: string;
    phone_number: string;
    gender: string;
    specialization: string;
    qualification: string;
    registration_number: string;
    experience_years: number;
    consultation_fee: number;
    bio?: string;
    address?: string;
    photo_url?: string;
    department_id?: number | null;
    hospital_id?: number | null;
    status: string;
    hospital_name?: string;
}

// Based on actual API response: [{"day":"tuesday","start_time":"09:00:00","slot_duration":30,"max_patients":1,"buffer_time_minutes":0,"is_available":true}]
export interface DoctorSchedule {
    id?: number;
    schedule_id?: number; // New field from API
    doctor_id?: number;
    day?: string;
    day_of_week?: string;
    start_time: string;
    end_time?: string;
    slot_duration: number;
    max_patients?: number;
    max_patients_per_slot?: number;
    buffer_time_minutes?: number;
    hospital_id?: number | null;
    is_available: boolean;
}

export interface SchedulePayload {
    day: string;
    start_time: string;
    slot_duration: number;
    max_patients: number;
    buffer_time_minutes: number;
    is_available: boolean;
}

export interface DoctorScheduleException {
    id: number;
    doctor_id: number;
    exception_date: string;
    is_available: boolean;
    start_time?: string | null;
    end_time?: string | null;
    reason?: string | null;
}

export interface TimeSlot {
    time: string;
    available: boolean;
    date?: string;
}

export interface CategorizedSlots {
    morning: TimeSlot[];
    afternoon: TimeSlot[];
    evening: TimeSlot[];
}
