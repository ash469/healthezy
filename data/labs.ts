import { Lab } from '@/types/lab';

export const labs: Lab[] = [
    {
        id: 1,
        name: 'Path Labs',
        location: 'Delhi',
        address: 'Sector 62, Noida, Delhi NCR',
        price: 330,
        latitude: 28.5355,
        longitude: 77.2249,
        imageUrl: '/lab.png',
        rating: 4.5,
        availableTests: [
            {
                id: 1,
                name: 'COMPLETE BLOOD COUNT; CBC',
                price: 330,
                parametersCovered: 20,
                homeCollection: true,
                labVisit: true,
                description: 'A complete blood count (CBC) is a blood test used to evaluate your overall health and detect a wide range of disorders.',
                preparation: 'No special preparation needed.',
                resultTime: '12-24 hours',
                sampleType: 'Blood'
            },
            {
                id: 2,
                name: 'GLUCOSE, FASTING (F)',
                price: 150,
                parametersCovered: 5,
                homeCollection: true,
                labVisit: true,
                description: 'Measures the amount of glucose (sugar) in your blood after you haven\'t eaten for at least 8 hours.',
                preparation: '8-12 hours fasting required.',
                resultTime: '8-12 hours',
                sampleType: 'Blood'
            },
            {
                id: 3,
                name: 'VITAMIN B12 / CYANOCOBALAMIN',
                price: 800,
                parametersCovered: 1,
                homeCollection: true,
                labVisit: false,
                description: 'Measures the amount of vitamin B12 in your blood.',
                preparation: 'May require overnight fasting.',
                resultTime: '24-48 hours',
                sampleType: 'Blood'
            },
            {
                id: 4,
                name: 'THYROID PROFILE',
                price: 500,
                parametersCovered: 3,
                homeCollection: false,
                labVisit: true,
                description: 'A group of tests that measure how well your thyroid gland is working.',
                preparation: 'No specific preparation needed.',
                resultTime: '24 hours',
                sampleType: 'Blood'
            }
        ],
        slots: {
            morning: ['10:00', '11:00', '11:30', '12:00'],
            afternoon: ['12:30', '01:00', '02:00', '03:00']
        }
    },
    {
        id: 2,
        name: 'SVM Hospital',
        location: 'Mumbai',
        address: 'Andheri West, Mumbai',
        price: 450,
        latitude: 19.1286,
        longitude: 72.8397,
        imageUrl: '/lab.png',
        rating: 4.2,
        availableTests: [
            { id: 5, name: 'COMPLETE BLOOD COUNT; CBC', price: 450, parametersCovered: 20, homeCollection: true, labVisit: true },
            { id: 6, name: 'LIVER FUNCTION TEST', price: 600, parametersCovered: 12, homeCollection: true, labVisit: true },
        ]
    },
    {
        id: 3,
        name: 'Dhruva Laboratories',
        location: 'Bangalore',
        address: 'Koramangala, Bangalore',
        price: 300,
        latitude: 12.9716,
        longitude: 77.5946,
        imageUrl: '/lab.png',
        rating: 4.7,
        availableTests: [
            { id: 7, name: 'COMPLETE BLOOD COUNT; CBC', price: 300 },
            { id: 8, name: 'KIDNEY FUNCTION TEST', price: 550 },
        ]
    },
    {
        id: 4,
        name: 'Lakhotia',
        location: 'Hyderabad',
        address: 'Banjara Hills, Hyderabad',
        price: 500,
        latitude: 17.3641,
        longitude: 78.4710,
        imageUrl: '/lab.png',
        rating: 4.6,
        availableTests: [
            { id: 9, name: 'COMPLETE BLOOD COUNT; CBC', price: 500 },
            { id: 10, name: 'LIPID PROFILE', price: 400 },
        ]
    }
];

export const getLabById = (id: number): Lab | undefined => {
    return labs.find(lab => lab.id === id);
};
