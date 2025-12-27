export interface PatientInfo {
    name: string;
    age: number;
    gender: string;
    bloodGroup: string;
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
    specialization: string;
    date: string;
    status: string;
    badge: string;
}

export interface LabReportItem {
    id: number;
    lab: string;
    test: string;
    date: string;
    status: string;
    badge: string;
}

export interface PatientFamilyMember {
    id: number;
    name: string;
    type: string;
    nextVisit: string;
    badge: string;
}

export interface RecentOrderItem {
    id: number;
    pharmacy: string;
    medicine: string;
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
    patientInfo: PatientInfo;
    stats: PatientStats;
    upcomingAppointments: AppointmentItem[];
    labReports: LabReportItem[];
    patients: PatientFamilyMember[];
    recentOrders: RecentOrderItem[];
    insuranceClaims: InsuranceClaim[];
}
