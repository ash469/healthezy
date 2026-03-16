export interface HospitalInfo {
    id: number;
    hospitalCode: string;
    name: string;
    speciality: string;
    mobileNo: string;
    emailId: string;
    address: string;
    description?: string;
    website?: string;
    emergencyNumber?: string;
    totalBeds?: number;
    availableBeds?: number;
    logoUrl?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
}

export interface HospitalStats {
    appointmentsToday: number;
    activeDoctors: number;
    reportsProcessed: number;
}

export interface HospitalTodaysAppointment {
    id: number;
    name: string;
    doctorName?: string;
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
