export interface AppointmentRequest {
    patient_id: number;
    doctor_id: number;
    hospital_id: number;
    department_id?: number;
    appointment_date: string; // Format: "YYYY-MM-DD"
    appointment_time: string; // Format: "HH:MM:SS"
    duration_minutes: number;
    visit_type: "Online" | "Offline";
    booking_type: "CHECKUP" | "Follow-Up";
    reason_for_visit: string;
    notes?: string;
}

export interface UpdateAppointment {
    booking_type?: string;
    appointment_date?: string;
    appointment_time?: string;
    reason_for_visit?: string;
    notes?: string;
}

export interface AppointmentResponse {
    id: number;
    appointment_number: string;
    patient_id: number;
    doctor_id: number | null;
    hospital_id: number | null;
    department_id: number | null;
    appointment_date: string; // "YYYY-MM-DD"
    appointment_time: string; // "HH:MM:SS"
    duration_minutes: number;
    visit_type: string;
    booking_type: string;
    status: string;
    appointment_mode: string | null;
    reason_for_visit: string | null;
    notes: string | null;
    token_number: number;
    checked_in_at: string | null;
    checked_out_at: string | null;
    consultation_started_at: string | null;
    consultation_ended_at: string | null;

    created_at: string;
}

export interface AppointmentDetailResponse extends AppointmentResponse {
    patient_name: string;
    doctor_name: string;
    patient_image: string | null;
    doctor_image: string | null;
    patient_email?: string | null;
    patient_phone?: string | null;
    patient_gender?: string | null;
}

export interface DoctorScheduleSlot {
    id: number;
    doctor_id: number;
    day: string;
    start_time: string;
    end_time: string;
    slot_duration: number;
    max_patients: number;
    buffer_time_minutes: number;
    hospital_id?: number | null;
    is_available: boolean;
}
