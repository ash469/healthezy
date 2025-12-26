
import { Doctor } from '@/types/doctor';

export const doctors: Doctor[] = [
    {
        id: 1,
        hospitalId: 1, 
        fullName: 'Dr. Mehra',
        specialization: 'General Physician',
        hospitalName: 'SVM Hospital | New Delhi',
        consultationFee: 700,
        photoUrl: '/doctor.png',
        rating: 4.5,
        experience: '10+ Years',
        experienceYears: 10,
        gender: 'Female'
    },
    {
        id: 2,
        hospitalId: 2,
        fullName: 'Dr. Sharma',
        specialization: 'Cardiologist',
        hospitalName: 'SVM Hospital | Mumbai',
        consultationFee: 1200,
        photoUrl: '/doctor.png',
        rating: 4.8,
        experience: '15+ Years',
        experienceYears: 15,
        gender: 'Male'
    },
    {
        id: 3,
        hospitalId: 3, 
        fullName: 'Dr. Gupta',
        specialization: 'Dermatologist',
        hospitalName: 'SVM Hospital | Bangalore',
        consultationFee: 800,
        photoUrl: '/doctor.png',
        rating: 4.6,
        experience: '8+ Years',
        experienceYears: 8,
        gender: 'Male'
    },
    {
        id: 4,
        hospitalId: 4,
        fullName: 'Dr. Kapoor',
        specialization: 'Pediatrician',
        hospitalName: 'SVM Hospital | Bangalore',
        consultationFee: 600,
        photoUrl: '/doctor.png',
        rating: 4.7,
        experience: '5+ Years',
        experienceYears: 5,
        gender: 'Female'
    },
    {
        id: 5,
        hospitalId: 1, // SVM Hospital, Delhi
        fullName: 'Dr. Kailash',
        specialization: 'Urologist',
        hospitalName: 'SVM Hospital | New Delhi',
        consultationFee: 900,
        photoUrl: '/doctor.png',
        rating: 4.9,
        experience: '12+ Years',
        experienceYears: 12,
        gender: 'Male'
    },

    // New dummy doctors for Hospital 1 (Delhi)
    {
        id: 6,
        hospitalId: 1,
        fullName: 'Dr. Priya Singh',
        specialization: 'Gynecologist',
        hospitalName: 'SVM Hospital | New Delhi',
        consultationFee: 850,
        photoUrl: '/doctor.png',
        rating: 4.7,
        experience: '9+ Years',
        experienceYears: 9,
        gender: 'Female'
    },
    {
        id: 7,
        hospitalId: 1,
        fullName: 'Dr. Rajesh Kumar',
        specialization: 'Orthopedic',
        hospitalName: 'SVM Hospital | New Delhi',
        consultationFee: 1000,
        photoUrl: '/doctor.png',
        rating: 4.6,
        experience: '14+ Years',
        experienceYears: 14,
        gender: 'Male'
    },

    // New dummy doctors for Hospital 2 (Mumbai)
    {
        id: 8,
        hospitalId: 2,
        fullName: 'Dr. Anjali Desai',
        specialization: 'Neurologist',
        hospitalName: 'SVM Hospital | Mumbai',
        consultationFee: 1100,
        photoUrl: '/doctor.png',
        rating: 4.8,
        experience: '11+ Years',
        experienceYears: 11,
        gender: 'Female'
    },
    {
        id: 9,
        hospitalId: 2,
        fullName: 'Dr. Vikram Patel',
        specialization: 'ENT Specialist',
        hospitalName: 'SVM Hospital | Mumbai',
        consultationFee: 750,
        photoUrl: '/doctor.png',
        rating: 4.5,
        experience: '7+ Years',
        experienceYears: 7,
        gender: 'Male'
    },
    {
        id: 10,
        hospitalId: 2,
        fullName: 'Dr. Sneha Reddy',
        specialization: 'Ophthalmologist',
        hospitalName: 'SVM Hospital | Mumbai',
        consultationFee: 800,
        photoUrl: '/doctor.png',
        rating: 4.7,
        experience: '6+ Years',
        experienceYears: 6,
        gender: 'Female'
    },

    // New dummy doctors for Hospital 3 (Bangalore)
    {
        id: 11,
        hospitalId: 3,
        fullName: 'Dr. Arjun Rao',
        specialization: 'Psychiatrist',
        hospitalName: 'SVM Hospital | Bangalore',
        consultationFee: 950,
        photoUrl: '/doctor.png',
        rating: 4.6,
        experience: '10+ Years',
        experienceYears: 10,
        gender: 'Male'
    },
    {
        id: 12,
        hospitalId: 3,
        fullName: 'Dr. Kavya Nair',
        specialization: 'Endocrinologist',
        hospitalName: 'SVM Hospital | Bangalore',
        consultationFee: 900,
        photoUrl: '/doctor.png',
        rating: 4.8,
        experience: '8+ Years',
        experienceYears: 8,
        gender: 'Female'
    },
    {
        id: 13,
        hospitalId: 3,
        fullName: 'Dr. Suresh Iyer',
        specialization: 'General Surgeon',
        hospitalName: 'SVM Hospital | Bangalore',
        consultationFee: 1200,
        photoUrl: '/doctor.png',
        rating: 4.9,
        experience: '16+ Years',
        experienceYears: 16,
        gender: 'Male'
    },

    // New dummy doctors for Hospital 4 (Bangalore - different location)
    {
        id: 14,
        hospitalId: 4,
        fullName: 'Dr. Lakshmi Menon',
        specialization: 'Radiologist',
        hospitalName: 'SVM Hospital | Bangalore',
        consultationFee: 700,
        photoUrl: '/doctor.png',
        rating: 4.5,
        experience: '5+ Years',
        experienceYears: 5,
        gender: 'Female'
    },
    {
        id: 15,
        hospitalId: 4,
        fullName: 'Dr. Anil Verma',
        specialization: 'Gastroenterologist',
        hospitalName: 'SVM Hospital | Bangalore',
        consultationFee: 1050,
        photoUrl: '/doctor.png',
        rating: 4.7,
        experience: '13+ Years',
        experienceYears: 13,
        gender: 'Male'
    },
    {
        id: 16,
        hospitalId: 4,
        fullName: 'Dr. Deepa Joshi',
        specialization: 'Pulmonologist',
        hospitalName: 'SVM Hospital | Bangalore',
        consultationFee: 850,
        photoUrl: '/doctor.png',
        rating: 4.6,
        experience: '9+ Years',
        experienceYears: 9,
        gender: 'Female'
    }
];

export const getDoctorById = (id: number): Doctor | undefined => {
    return doctors.find(doctor => doctor.id === id);
};

// New helper function to get doctors by hospital ID
export const getDoctorsByHospitalId = (hospitalId: number): Doctor[] => {
    return doctors.filter(doctor => doctor.hospitalId === hospitalId);
};
