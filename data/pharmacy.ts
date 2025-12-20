import { Pharmacy } from '@/types/pharmacy';

export const pharmacies: Pharmacy[] = [
    {
        id: '1',
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
            { id: 'm1', name: 'Hyplori-20', price: 29.80, originalPrice: 33.20, discount: '10% OFF', tabletsPerStrip: 10 },
            { id: 'm2', name: 'Dolo 650', price: 30.00, tabletsPerStrip: 15 },
            { id: 'm3', name: 'Azithral 500', price: 110.00, originalPrice: 125.00, discount: '12% OFF', tabletsPerStrip: 5 },
            { id: 'm4', name: 'Pan 40', price: 95.00, tabletsPerStrip: 15 }
        ]
    },
    {
        id: '2',
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
            { id: 'm1', name: 'Hyplori-20', price: 31.00, tabletsPerStrip: 10 },
            { id: 'm5', name: 'Shelcal 500', price: 105.00, tabletsPerStrip: 15 }
        ]
    },
    {
        id: '3',
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
            { id: 'm6', name: 'Becosules', price: 45.00, tabletsPerStrip: 20 },
            { id: 'm7', name: 'Limcee', price: 25.00, tabletsPerStrip: 15 }
        ]
    },
    {
        id: '4',
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
            { id: 'm1', name: 'Hyplori-20', price: 30.00, tabletsPerStrip: 10 },
            { id: 'm8', name: 'Crocin Advance', price: 20.00, tabletsPerStrip: 15 }
        ]
    }
];

export const getPharmacyById = (id: string): Pharmacy | undefined => {
    return pharmacies.find(p => p.id === id);
};
