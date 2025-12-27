export interface HospitalInfo {
    name: string;
    speciality: string;
    mobileNo: string;
    emailId: string;
    address: string;
}

export interface HospitalStats {
    appointmentsToday: number;
    activeDoctors: number;
    reportsProcessed: number;
}

export interface HospitalTodaysAppointment {
    id: number;
    name: string;
    details: string;
    time: string;
    badge: string;
}

export interface ActiveDoctor {
    id: number;
    name: string;
    speciality: string;
    status: string;
    statusColor: string;
}

export interface HospitalDashboardData {
    hospitalInfo: HospitalInfo;
    stats: HospitalStats;
    todaysAppointments: HospitalTodaysAppointment[];
    activeDoctors: ActiveDoctor[];
}
