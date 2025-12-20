import { Lab } from '@/types/lab';

export const labs: Lab[] = [
    {
        id: '1',
        name: 'Path Labs',
        location: 'Delhi',
        address: 'Sector 62, Noida, Delhi NCR',
        price: 330,
        latitude: 28.5355,
        longitude: 77.2249,
        imageUrl: '/lab.png',
        rating: 4.5,
        availableTests: [
            { id: 't1', name: 'COMPLETE BLOOD COUNT; CBC', price: 330, parametersCovered: 20, homeCollection: true, labVisit: true },
            { id: 't2', name: 'GLUCOSE, FASTING (F)', price: 150, parametersCovered: 5, homeCollection: true, labVisit: true },
            { id: 't3', name: 'VITAMIN B12 / CYANOCOBALAMIN', price: 800, parametersCovered: 1, homeCollection: true, labVisit: false },
            { id: 't4', name: 'THYROID PROFILE', price: 500, parametersCovered: 3, homeCollection: false, labVisit: true }
        ],
        slots: {
            morning: ['10:00', '11:00', '11:30', '12:00'],
            afternoon: ['12:30', '01:00', '02:00', '03:00']
        }
    },
    {
        id: '2',
        name: 'SVM Hospital',
        location: 'Mumbai',
        address: 'Andheri West, Mumbai',
        price: 450,
        latitude: 19.1286,
        longitude: 72.8397,
        imageUrl: '/lab.png',
        rating: 4.2,
        availableTests: [
            { id: 't1', name: 'COMPLETE BLOOD COUNT; CBC', price: 450, parametersCovered: 20, homeCollection: true, labVisit: true },
            { id: 't5', name: 'LIVER FUNCTION TEST', price: 600, parametersCovered: 12, homeCollection: true, labVisit: true },
        ]
    },
    {
        id: '3',
        name: 'Dhruva Laboratories',
        location: 'Bangalore',
        address: 'Koramangala, Bangalore',
        price: 300,
        latitude: 12.9716,
        longitude: 77.5946,
        imageUrl: '/lab.png',
        rating: 4.7,
        availableTests: [
            { id: 't1', name: 'COMPLETE BLOOD COUNT; CBC', price: 300 },
            { id: 't6', name: 'KIDNEY FUNCTION TEST', price: 550 },
        ]
    },
    {
        id: '4',
        name: 'Lakhotia',
        location: 'Hyderabad',
        address: 'Banjara Hills, Hyderabad',
        price: 500,
        latitude: 17.3641,
        longitude: 78.4710,
        imageUrl: '/lab.png',
        rating: 4.6,
        availableTests: [
            { id: 't1', name: 'COMPLETE BLOOD COUNT; CBC', price: 500 },
            { id: 't7', name: 'LIPID PROFILE', price: 400 },
        ]
    }
];

export const getLabById = (id: string): Lab | undefined => {
    return labs.find(lab => lab.id === id);
};
