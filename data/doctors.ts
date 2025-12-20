
import { Doctor } from '@/types/doctor';

export const doctors: Doctor[] = [
    {
        id: '1',
        name: 'Dr. Mehra',
        specialty: 'General Physician',
        hospital: 'AIIMS | New Delhi',
        price: 700,
        imageUrl: '/doctor.png',
        rating: 4.5,
        experience: '10+ Years',
        gender: 'Female'
    },
    {
        id: '2',
        name: 'Dr. Sharma',
        specialty: 'Cardiologist',
        hospital: 'Fortis | Mumbai',
        price: 1200,
        imageUrl: '/doctor.png',
        rating: 4.8,
        experience: '15+ Years',
        gender: 'Male'
    },
    {
        id: '3',
        name: 'Dr. Gupta',
        specialty: 'Dermatologist',
        hospital: 'Apollo | Bangalore',
        price: 800,
        imageUrl: '/doctor.png',
        rating: 4.6,
        experience: '8+ Years',
        gender: 'Male'
    },
    {
        id: '4',
        name: 'Dr. Kapoor',
        specialty: 'Pediatrician',
        hospital: 'Max | Delhi',
        price: 600,
        imageUrl: '/doctor.png',
        rating: 4.7,
        experience: '5+ Years',
        gender: 'Female'
    },
    {
        id: '5',
        name: 'Dr. Kailash',
        specialty: 'Urologist',
        hospital: 'Apollo Hospital',
        price: 700,
        imageUrl: '/doctor.png',
        rating: 4.9,
        experience: '12+ Years',
        gender: 'Male'
    }
];

export const getDoctorById = (id: string): Doctor | undefined => {
    return doctors.find(doctor => doctor.id === id);
};
