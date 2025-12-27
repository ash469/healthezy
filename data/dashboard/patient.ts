import { PatientDashboardData } from '@/types/dashboard/patient';

export const patientDashboardData: PatientDashboardData = {
    patientInfo: {
        name: "Patient's Name",
        age: 25,
        gender: 'M',
        bloodGroup: 'A+',
        mobileNo: '98564x1370',
        emailId: 'xyz@email.com',
        avatar: '/doctor.png'
    },
    stats: {
        patients: 4,
        appointments: 6,
        prescriptions: 6,
        labTests: 2
    },
    upcomingAppointments: [
        {
            id: 1,
            doctor: "Dr. Mehra",
            specialization: "General Physician",
            date: "Dec 25, 2025",
            status: "Confirmed",
            badge: "bg-teal-500"
        },
        {
            id: 2,
            doctor: "Dr. Kailash",
            specialization: "Urologist",
            date: "Dec 30, 2025",
            status: "Pending",
            badge: "bg-orange-500"
        }
    ],
    labReports: [
        {
            id: 1,
            lab: "PathLabs",
            test: "Blood Test",
            date: "Dec 20, 2025",
            status: "Available",
            badge: "bg-green-500"
        },
        {
            id: 2,
            lab: "Sal Labs",
            test: "Urine Test",
            date: "Dec 18, 2025",
            status: "Pending",
            badge: "bg-yellow-500"
        }
    ],
    patients: [
        { id: 1, name: "Rahul Mishra", type: "New Born", nextVisit: "Dec 25, 12", badge: "bg-teal-500" },
        { id: 2, name: "Prince Mishra", type: "New Born", nextVisit: "Dec 25, 12", badge: "bg-blue-500" }
    ],
    recentOrders: [
        {
            id: 1,
            pharmacy: "Apollo Pharma",
            medicine: "Dolo 650",
            status: "Delivered",
            badge: "bg-green-500"
        },
        {
            id: 2,
            pharmacy: "Wellness Store",
            medicine: "Vitamin D3",
            status: "Pending",
            badge: "bg-orange-500"
        }
    ],
    insuranceClaims: [
        {
            hospital: "City Hospital",
            amount: "Rs. 50k",
            status: "Under Review",
            progress: 65
        }
    ]
};
