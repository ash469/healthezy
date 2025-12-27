import { LabDashboardData } from '@/types/dashboard/lab';

export const labDashboardData: LabDashboardData = {
    labInfo: {
        name: "Lab's Name",
        speciality: "Blood Test | X-Ray | Scan | Urine Test | MRI/CT Scan",
        mobileNo: "9876543210",
        emailId: "labemail00@gmail.com",
        avatar: "/lab-avatar.png"
    },
    stats: {
        testsToday: 15,
        reportsPending: 15,
        totalPatients: 15
    },
    upcomingBookings: [
        {
            id: 1,
            name: "Mr. Sanjay",
            test: "Fever | Cold",
            time: "11:30 AM",
            status: "Confirmed",
            badge: "bg-teal-500"
        },
        {
            id: 2,
            name: "Mr. Sanjay",
            test: "Fever | Cold",
            time: "11:30 AM",
            status: "Pending",
            badge: "bg-orange-500"
        }
    ],
    pendingReports: [
        {
            id: 1,
            name: "Rahul Mishra",
            test: "CBC Test",
            status: "Active",
            statusColor: "bg-teal-500"
        },
        {
            id: 2,
            name: "Prince Mishra",
            test: "CBC Test",
            status: "Pending",
            statusColor: "bg-yellow-500"
        }
    ]
};
