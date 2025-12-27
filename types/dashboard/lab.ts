export interface LabInfo {
    name: string;
    speciality: string;
    mobileNo: string;
    emailId: string;
    avatar: string;
}

export interface LabStats {
    testsToday: number;
    reportsPending: number;
    totalPatients: number;
}

export interface UpcomingBooking {
    id: number;
    name: string;
    test: string;
    time: string;
    status: string;
    badge: string;
}

export interface PendingReport {
    id: number;
    name: string;
    test: string;
    status: string;
    statusColor: string;
}

export interface LabDashboardData {
    labInfo: LabInfo;
    stats: LabStats;
    upcomingBookings: UpcomingBooking[];
    pendingReports: PendingReport[];
}
