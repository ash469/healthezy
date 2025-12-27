import { DoctorDashboardData } from '@/types/dashboard/doctor';

export const doctorDashboardData: DoctorDashboardData = {
    doctorInfo: {
        name: "Doctor's Name",
        age: 36,
        gender: 'M',
        speciality: 'General Physician | MD',
        mobileNo: '9876543210',
        emailId: 'testmail00@gmail.com',
        avatar: '/doctor.png'
    },
    stats: {
        appointments: 15,
        patients: 15,
        reports: 15,
        earnings: "12.5k"
    },
    todaysAppointments: [
        {
            id: 1,
            name: "Mr. Sanjay",
            condition: "Fever | Cold",
            time: "11:30 AM",
            status: "Confirmed",
            badge: "bg-teal-500"
        },
        {
            id: 2,
            name: "Mr. Sanjay",
            condition: "Fever | Cold",
            time: "11:30 AM",
            status: "Pending",
            badge: "bg-orange-500"
        }
    ],
    recentPatients: [
        {
            id: 1,
            name: "Rahul Mishra",
            lastVisit: "3 Nov",
            status: "Active",
            statusColor: "bg-teal-500"
        },
        {
            id: 2,
            name: "Prince Mishra",
            lastVisit: "30 Oct",
            status: "Pending",
            statusColor: "bg-yellow-500"
        }
    ]
};
