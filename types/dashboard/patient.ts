import type { UserProfile } from '@/services/auth/types';

export interface PatientInfo {
    name: string;
    age?: number;
    gender?: string;
    bloodGroup?: string;
    mobileNo: string;
    emailId: string;
    avatar: string;
}

export interface PatientStats {
    patients: number;
    appointments: number;
    prescriptions: number;
    labTests: number;
}

export interface AppointmentItem {
    id: number;
    doctor: string;
    patient: string;
    date: string;
    status: string;
    badge: string;
}

export interface LabReportItem {
    id: number;
    lab: string;
    test: string;
    date: string;
    price: number | string;
    status: string;
    badge: string;
}

import type { Patient } from '@/types/patient';

export interface PatientFamilyMember extends Patient {
    name: string; // Keep name for backward compatibility if needed, or rely on full_name from Patient
    type: string;
    nextVisit: string;
    badge: string;
}

export interface RecentReportItem {
    id: number;
    lab: string;
    test: string;
    status: string;
    badge: string;
}

export interface InsuranceClaim {
    hospital: string;
    amount: string;
    status: string;
    progress: number;
}

export interface PatientDashboardData {
    userInfo?: UserProfile;
    patientInfo: PatientInfo;
    stats: PatientStats;
    upcomingAppointments: AppointmentItem[];
    labReports: LabReportItem[];
    patients: PatientFamilyMember[];
    recentReports: RecentReportItem[];
    insuranceClaims: InsuranceClaim[];
}
