// Only define the fields we actually need in the frontend
export interface Doctor {
    id: number;
    hospitalId?: number;      // Foreign key to link doctor to hospital
    fullName?: string;
    firstName?: string;
    lastName?: string;
    specialization?: string;
    qualification?: string;
    experienceYears?: number;
    consultationFee?: number;
    hospitalName?: string;
    photoUrl?: string;
    rating?: number;
    gender?: 'Male' | 'Female' | 'MALE' | 'FEMALE' | 'OTHER';
    status?: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
}

export interface DoctorPageResponse {
    content: Doctor[];
    totalPages?: number;
    totalElements?: number;
    number?: number;
}

export interface TimeSlot {
    time: string;               // 24-hour format from backend (e.g., "09:00", "14:30")
    available: boolean;
    date?: string;
}

export interface DaySchedule {
    day: string;                // e.g., "Monday", "Tuesday"
    timeSlots: TimeSlot[];      // Slots specific to this day
}

export interface AppointmentSchedule {
    doctorId: number;
    weekSchedule: DaySchedule[]; // Different slots for each day of the week
    consultationDuration?: number;
}

export interface CategorizedSlots {
    morning: TimeSlot[];        // 06:00 - 11:59
    afternoon: TimeSlot[];      // 12:00 - 16:59
    evening: TimeSlot[];        // 17:00 - 20:59
}
