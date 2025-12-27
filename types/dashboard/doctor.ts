export interface DoctorInfo {
    name: string;
    age: number;
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
    doctorInfo: DoctorInfo;
    stats: DoctorStats;
    todaysAppointments: TodaysAppointment[];
    recentPatients: RecentPatient[];
}
