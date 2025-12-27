import { Pharmacy } from '@/types/pharmacy';

export const pharmacies: Pharmacy[] = [
    {
        id: 1,
        name: 'Sai Medicals',
        location: 'Sector 62, Noida',
        address: 'Shop No. 4, Local Shopping Complex, Sector 62, Noida, Uttar Pradesh 201309',
        rating: 4.5,
        reviews: 120,
        imageUrl: '/lab.png', // Using existing image for now as placeholder
        deliveryTime: '30 mins',
        minimumOrder: '₹200',
        activeDiscount: '20% OFF',
        latitude: 28.5355,
        longitude: 77.2249,
        availableMedicines: [
            {
                id: 1,
                name: 'Hyplori-20',
                price: 29.80,
                originalPrice: 33.20,
                discount: '10% OFF',
                tabletsPerStrip: 10,
                description: 'Effective medication for treating stomach ulcers and acid reflux.',
                uses: 'Used to treat peptic ulcers, GERD, and Zollinger-Ellison syndrome.',
                dosage: 'One tablet daily before meals or as directed by the physician.',
                sideEffects: 'May cause headache, diarrhea, or nausea in some patients.'
            },
            {
                id: 2,
                name: 'Dolo 650',
                price: 30.00,
                tabletsPerStrip: 15,
                description: 'Standard analgesic and antipyretic medication.',
                uses: 'Used for mild to moderate pain relief and reducing fever.',
                dosage: 'One tablet every 4-6 hours, not exceeding 4 tablets in 24 hours.',
                sideEffects: 'Common side effects include nausea and stomach pain.'
            },
            {
                id: 3,
                name: 'Azithral 500',
                price: 110.00,
                originalPrice: 125.00,
                discount: '12% OFF',
                tabletsPerStrip: 5,
                description: 'Broad-spectrum antibiotic belonging to the macrolide group.',
                uses: 'Used to treat various bacterial infections like pneumonia and bronchitis.',
                dosage: 'One tablet once daily for 3 to 5 days.',
                sideEffects: 'May cause stomach upset, vomiting, or dizziness.'
            },
            {
                id: 4,
                name: 'Pan 40',
                price: 95.00,
                tabletsPerStrip: 15,
                description: 'Proton pump inhibitor that reduces stomach acid.',
                uses: 'Treats acid-related diseases of the stomach and intestine.',
                dosage: 'Usually taken once daily in the morning before breakfast.',
                sideEffects: 'May cause joint pain, dizziness, or diarrhea.'
            }
        ]
    },
    {
        id: 2,
        name: 'Apollo Pharmacy',
        location: 'Indirapuram, Ghaziabad',
        address: 'Ground Floor, Plot No 12, Indirapuram, Ghaziabad',
        rating: 4.2,
        reviews: 350,
        imageUrl: '/lab.png',
        deliveryTime: '45 mins',
        minimumOrder: '₹300',
        activeDiscount: '15% OFF',
        latitude: 28.6415,
        longitude: 77.3714,
        availableMedicines: [
            { id: 5, name: 'Hyplori-20', price: 31.00, tabletsPerStrip: 10 },
            { id: 6, name: 'Shelcal 500', price: 105.00, tabletsPerStrip: 15 }
        ]
    },
    {
        id: 3,
        name: 'Wellness Forever',
        location: 'Connaught Place, Delhi',
        address: 'B-Block, Connaught Place, New Delhi',
        rating: 4.7,
        reviews: 500,
        imageUrl: '/lab.png',
        deliveryTime: '25 mins',
        minimumOrder: '₹150',
        latitude: 28.6304,
        longitude: 77.2177,
        availableMedicines: [
            { id: 7, name: 'Becosules', price: 45.00, tabletsPerStrip: 20 },
            { id: 8, name: 'Limcee', price: 25.00, tabletsPerStrip: 15 }
        ]
    },
    {
        id: 4,
        name: 'MedPlus',
        location: 'Koramangala, Bangalore',
        address: '80 Feet Road, Koramangala, Bangalore',
        rating: 4.6,
        reviews: 210,
        imageUrl: '/lab.png',
        deliveryTime: '35 mins',
        minimumOrder: '₹250',
        activeDiscount: '10% OFF',
        latitude: 12.9352,
        longitude: 77.6245,
        availableMedicines: [
            { id: 9, name: 'Hyplori-20', price: 30.00, tabletsPerStrip: 10 },
            { id: 10, name: 'Crocin Advance', price: 20.00, tabletsPerStrip: 15 }
        ]
    }
];

export const getPharmacyById = (id: number): Pharmacy | undefined => {
    return pharmacies.find(p => p.id === id);
};
