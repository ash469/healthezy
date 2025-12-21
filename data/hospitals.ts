import { Hospital } from '@/types/hospital';
import { Doctor } from '@/types/doctor';

export const hospitals: Hospital[] = [
    {
        id: '1',
        name: 'SVM Hospital',
        location: 'ABC Road, Lucknow, U.P',
        address: 'Sector 15, Rohini, Delhi NCR', // Keeping this for internal details if needed, or matching prompt
        imageUrl: '/hospital.png',
        rating: 4.5,
        latitude: 28.7041,
        longitude: 77.1025,
        doctors: [
            {
                id: 'h1d1',
                name: 'Dr. Mehra',
                specialty: 'General Physician',
                hospital: 'SVM Hospital',
                price: 700,
                imageUrl: '/doctor.png',
                rating: 4.5,
                experience: '10+ Years',
                gender: 'Female'
            },
            {
                id: 'h1d2',
                name: 'Dr. Sharma',
                specialty: 'Cardiologist',
                hospital: 'SVM Hospital',
                price: 1200,
                imageUrl: '/doctor.png',
                rating: 4.8,
                experience: '15+ Years',
                gender: 'Male'
            },
            {
                id: 'h1d3',
                name: 'Dr. Kapoor',
                specialty: 'Pediatrician',
                hospital: 'SVM Hospital',
                price: 600,
                imageUrl: '/doctor.png',
                rating: 4.7,
                experience: '5+ Years',
                gender: 'Female'
            }
        ]
    },
    {
        id: '2',
        name: 'SVM Hospital', // Matching image repeated names style or just showing variations
        location: 'ABC Road, Lucknow, U.P',
        address: 'Ansari Nagar, New Delhi',
        imageUrl: '/hospital.png',
        rating: 4.5,
        latitude: 28.5672,
        longitude: 77.2100,
        doctors: [
            {
                id: 'h2d1',
                name: 'Dr. Gupta',
                specialty: 'Dermatologist',
                hospital: 'SVM Hospital',
                price: 800,
                imageUrl: '/doctor.png',
                rating: 4.6,
                experience: '8+ Years',
                gender: 'Male'
            },
            {
                id: 'h2d2',
                name: 'Dr. Verma',
                specialty: 'Orthopedic',
                hospital: 'SVM Hospital',
                price: 1000,
                imageUrl: '/doctor.png',
                rating: 4.7,
                experience: '12+ Years',
                gender: 'Male'
            }
        ]
    },
    {
        id: '3',
        name: 'SVM Hospital',
        location: 'ABC Road, Lucknow, U.P',
        address: 'Mulund Goregaon Link Road, Mumbai',
        imageUrl: '/hospital.png',
        rating: 4.5,
        latitude: 19.1646,
        longitude: 72.9505,
        doctors: [
            {
                id: 'h3d1',
                name: 'Dr. Patel',
                specialty: 'Neurologist',
                hospital: 'SVM Hospital',
                price: 1500,
                imageUrl: '/doctor.png',
                rating: 4.9,
                experience: '20+ Years',
                gender: 'Male'
            },
            {
                id: 'h3d2',
                name: 'Dr. Desai',
                specialty: 'Gynecologist',
                hospital: 'SVM Hospital',
                price: 900,
                imageUrl: '/doctor.png',
                rating: 4.5,
                experience: '10+ Years',
                gender: 'Female'
            }
        ]
    },
    {
        id: '4',
        name: 'SVM Hospital',
        location: 'ABC Road, Lucknow, U.P',
        address: 'Bannerghatta Road, Bangalore',
        imageUrl: '/hospital.png',
        rating: 4.5,
        latitude: 12.9082,
        longitude: 77.5980,
        doctors: [
            {
                id: 'h4d1',
                name: 'Dr. Kailash',
                specialty: 'Urologist',
                hospital: 'SVM Hospital',
                price: 700,
                imageUrl: '/doctor.png',
                rating: 4.9,
                experience: '12+ Years',
                gender: 'Male'
            },
            {
                id: 'h4d2',
                name: 'Dr. Reddy',
                specialty: 'ENT Specialist',
                hospital: 'SVM Hospital',
                price: 650,
                imageUrl: '/doctor.png',
                rating: 4.4,
                experience: '7+ Years',
                gender: 'Female'
            }
        ]
    }
];

export const getHospitalById = (id: string): Hospital | undefined => {
    return hospitals.find(hospital => hospital.id === id);
};

export const getDoctorsByHospitalId = (hospitalId: string): Doctor[] => {
    const hospital = getHospitalById(hospitalId);
    return hospital?.doctors || [];
};

export const getDoctorByIds = (hospitalId: string, doctorId: string): Doctor | undefined => {
    const hospital = getHospitalById(hospitalId);
    return hospital?.doctors.find(doctor => doctor.id === doctorId);
};
