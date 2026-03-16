import type { UserProfile } from '@/services/auth/types';
import type { Doctor } from '@/types/doctor';

export interface DoctorInfo {
    name: string;
    experience: number;
    gender: string;
    speciality: string;
    mobileNo: string;
    emailId: string;
    avatar: string;
}

export interface DoctorStats {
    appointments: number;
    patients: number;
    reports: number;
    earnings: string;
}

export interface TodaysAppointment {
    id: number;
    name: string;
    condition: string;
    gender?: string | null;
    time: string;
    status: string;
    badge: string;
}

export interface RecentPatient {
    id: number;
    name: string;
    lastVisit: string;
    status: string;
    statusColor: string;
}

export interface DoctorDashboardData {
    userInfo?: UserProfile;
    doctorInfo: DoctorInfo;
    doctor?: Doctor; // Raw doctor object for editing
    stats: DoctorStats;
    todaysAppointments: TodaysAppointment[];
    recentPatients: RecentPatient[];
}
