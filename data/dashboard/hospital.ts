import { HospitalDashboardData } from '@/types/dashboard/hospital';

export const hospitalDashboardData: HospitalDashboardData = {
    hospitalInfo: {
        name: "Hospital's Name",
        speciality: "Cardiology | Neurology | Oncology",
        mobileNo: "9876543210",
        emailId: "testmail00@gmail.com",
        address: "123 Health Street, Med City"
    },
    stats: {
        appointmentsToday: 15,
        activeDoctors: 15,
        reportsProcessed: 15
    },
    todaysAppointments: [
        {
            id: 1,
            name: "Ravi Sharma",
            details: "Cardiology • Dr. Rajesh Kumar",
            time: "11:30 AM",
            badge: "bg-teal-500"
        },
        {
            id: 2,
            name: "Ravi Sharma",
            details: "Cardiology • Dr. Vinay Kumar",
            time: "11:30 AM",
            badge: "bg-teal-500"
        }
    ],
    activeDoctors: [
        {
            id: 1,
            name: "Dr. Mehra",
            speciality: "General Physician",
            status: "Active",
            statusColor: "bg-teal-500"
        },
        {
            id: 2,
            name: "Dr. Mehra",
            speciality: "General Physician",
            status: "Offline",
            statusColor: "bg-yellow-500"
        }
    ]
};
