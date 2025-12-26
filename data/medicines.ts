
import { Medicine } from '@/types/pharmacy';

export const medicines: Medicine[] = [
    { id: 'm1', name: 'Hyplori-20', price: 0, tabletsPerStrip: 10 },
    { id: 'm2', name: 'Dolo 650', price: 0, tabletsPerStrip: 15 },
    { id: 'm3', name: 'Azithral 500', price: 0, tabletsPerStrip: 5 },
    { id: 'm4', name: 'Pan 40', price: 0, tabletsPerStrip: 15 },
    { id: 'm5', name: 'Shelcal 500', price: 0, tabletsPerStrip: 15 },
    { id: 'm6', name: 'Becosules', price: 0, tabletsPerStrip: 20 },
    { id: 'm7', name: 'Limcee', price: 0, tabletsPerStrip: 15 },
    { id: 'm8', name: 'Crocin Advance', price: 0, tabletsPerStrip: 15 }
];

export const getMedicineById = (id: string): Medicine | undefined => {
    return medicines.find(m => m.id === id);
};
