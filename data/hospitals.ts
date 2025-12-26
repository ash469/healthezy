import { Hospital } from '@/types/hospital';

export const hospitals: Hospital[] = [
    {
        id: 1,
        name: 'SVM Hospital',
        location: 'ABC Road, Lucknow, U.P',
        address: 'Sector 15, Rohini, Delhi NCR',
        logoUrl: '/hospital.png',
        rating: 4.5,
        latitude: 28.7041,
        longitude: 77.1025,
        specializations: 'Cardiology, Pediatrics, General Medicine'
    },
    {
        id: 2,
        name: 'SVM Hospital',
        location: 'ABC Road, Lucknow, U.P',
        address: 'Ansari Nagar, New Delhi',
        logoUrl: '/hospital.png',
        rating: 4.5,
        latitude: 28.5672,
        longitude: 77.2100,
        specializations: 'Dermatology, Orthopedics'
    },
    {
        id: 3,
        name: 'SVM Hospital',
        location: 'ABC Road, Lucknow, U.P',
        address: 'Mulund Goregaon Link Road, Mumbai',
        logoUrl: '/hospital.png',
        rating: 4.5,
        latitude: 19.1646,
        longitude: 72.9505,
        specializations: 'Neurology, Gynecology'
    },
    {
        id: 4,
        name: 'SVM Hospital',
        location: 'ABC Road, Lucknow, U.P',
        address: 'Bannerghatta Road, Bangalore',
        logoUrl: '/hospital.png',
        rating: 4.5,
        latitude: 12.9082,
        longitude: 77.5980,
        specializations: 'Urology, ENT'
    }
];

export const getHospitalById = (id: number): Hospital | undefined => {
    return hospitals.find(hospital => hospital.id === id);
};
