import { Medicine } from '@/types/medicine';

export const medicines: Medicine[] = [
    // Pharmacy 1 (Sai Medicals) - Noida
    {
        id: 1,
        pharmacyId: 1,
        name: 'Hyplori-20',
        description: 'Proton pump inhibitor used to treat gastric acid-related disorders',
        uses: 'Treatment of GERD, peptic ulcers, and Zollinger-Ellison syndrome',
        dosage: '20mg once daily before breakfast',
        sideEffects: 'Headache, nausea, diarrhea, abdominal pain',
        price: 29.80,
        manufacturer: 'Lupin Ltd',
        inStock: true,
        category: 'Gastro',
        prescriptionRequired: false
    },
    {
        id: 2,
        pharmacyId: 1,
        name: 'Dolo 650',
        description: 'Paracetamol tablet for pain relief and fever reduction',
        uses: 'Relief from headache, toothache, body ache, fever, and common cold symptoms',
        dosage: '1-2 tablets every 4-6 hours, maximum 4g per day',
        sideEffects: 'Rare: skin rash, liver damage (with overdose)',
        price: 30.00,
        manufacturer: 'Micro Labs',
        inStock: true,
        category: 'Pain Relief',
        prescriptionRequired: false
    },
    {
        id: 3,
        pharmacyId: 1,
        name: 'Azithral 500',
        description: 'Azithromycin antibiotic for bacterial infections',
        uses: 'Treatment of respiratory tract infections, skin infections, and sexually transmitted infections',
        dosage: '500mg once daily for 3-5 days',
        sideEffects: 'Nausea, vomiting, diarrhea, stomach pain',
        price: 110.00,
        manufacturer: 'Alembic Pharmaceuticals',
        inStock: true,
        category: 'Antibiotic',
        prescriptionRequired: true
    },
    {
        id: 4,
        pharmacyId: 1,
        name: 'Pan 40',
        description: 'Pantoprazole for acid reflux and stomach ulcers',
        uses: 'Treatment of GERD, erosive esophagitis, and Zollinger-Ellison syndrome',
        dosage: '40mg once daily before meals',
        sideEffects: 'Headache, dizziness, diarrhea, joint pain',
        price: 95.00,
        manufacturer: 'Alkem Laboratories',
        inStock: true,
        category: 'Gastro',
        prescriptionRequired: false
    },

    // Pharmacy 2 (Apollo Pharmacy) - Ghaziabad
    {
        id: 5,
        pharmacyId: 2,
        name: 'Hyplori-20',
        description: 'Proton pump inhibitor used to treat gastric acid-related disorders',
        uses: 'Treatment of GERD, peptic ulcers, and Zollinger-Ellison syndrome',
        dosage: '20mg once daily before breakfast',
        sideEffects: 'Headache, nausea, diarrhea, abdominal pain',
        price: 31.00,
        manufacturer: 'Lupin Ltd',
        inStock: true,
        category: 'Gastro',
        prescriptionRequired: false
    },
    {
        id: 6,
        pharmacyId: 2,
        name: 'Shelcal 500',
        description: 'Calcium and Vitamin D3 supplement',
        uses: 'Prevention and treatment of calcium deficiency, osteoporosis, and bone health',
        dosage: '1 tablet daily with food',
        sideEffects: 'Constipation, gas, upset stomach',
        price: 105.00,
        manufacturer: 'Elder Pharmaceuticals',
        inStock: true,
        category: 'Vitamin',
        prescriptionRequired: false
    },
    {
        id: 7,
        pharmacyId: 2,
        name: 'Metformin 500',
        description: 'Oral diabetes medication that helps control blood sugar levels',
        uses: 'Treatment of type 2 diabetes mellitus',
        dosage: '500mg twice daily with meals',
        sideEffects: 'Nausea, vomiting, diarrhea, stomach upset, metallic taste',
        price: 25.00,
        manufacturer: 'Sun Pharma',
        inStock: true,
        category: 'Diabetes',
        prescriptionRequired: true
    },

    // Pharmacy 3 (Wellness Forever) - Delhi
    {
        id: 8,
        pharmacyId: 3,
        name: 'Becosules',
        description: 'Multivitamin capsule with B-complex vitamins',
        uses: 'Treatment of vitamin B deficiency, stress, fatigue, and weakness',
        dosage: '1 capsule daily after meals',
        sideEffects: 'Rare: allergic reactions, nausea',
        price: 45.00,
        manufacturer: 'Pfizer',
        inStock: true,
        category: 'Vitamin',
        prescriptionRequired: false
    },
    {
        id: 9,
        pharmacyId: 3,
        name: 'Limcee',
        description: 'Vitamin C supplement (500mg)',
        uses: 'Prevention and treatment of vitamin C deficiency, boosting immunity',
        dosage: '1 tablet daily',
        sideEffects: 'Rare: stomach upset, diarrhea',
        price: 25.00,
        manufacturer: 'Abbott',
        inStock: true,
        category: 'Vitamin',
        prescriptionRequired: false
    },
    {
        id: 10,
        pharmacyId: 3,
        name: 'Cetirizine 10mg',
        description: 'Antihistamine for allergy relief',
        uses: 'Relief from allergic rhinitis, urticaria, and allergic skin conditions',
        dosage: '10mg once daily',
        sideEffects: 'Drowsiness, dry mouth, fatigue',
        price: 15.00,
        manufacturer: 'Cipla',
        inStock: true,
        category: 'Allergy',
        prescriptionRequired: false
    },

    // Pharmacy 4 (MedPlus) - Bangalore
    {
        id: 11,
        pharmacyId: 4,
        name: 'Hyplori-20',
        description: 'Proton pump inhibitor used to treat gastric acid-related disorders',
        uses: 'Treatment of GERD, peptic ulcers, and Zollinger-Ellison syndrome',
        dosage: '20mg once daily before breakfast',
        sideEffects: 'Headache, nausea, diarrhea, abdominal pain',
        price: 30.00,
        manufacturer: 'Lupin Ltd',
        inStock: true,
        category: 'Gastro',
        prescriptionRequired: false
    },
    {
        id: 12,
        pharmacyId: 4,
        name: 'Crocin Advance',
        description: 'Fast-acting paracetamol for pain and fever',
        uses: 'Quick relief from headache, body ache, toothache, and fever',
        dosage: '1-2 tablets every 4-6 hours as needed',
        sideEffects: 'Rare: allergic reactions, liver damage (with overdose)',
        price: 20.00,
        manufacturer: 'GSK',
        inStock: true,
        category: 'Pain Relief',
        prescriptionRequired: false
    },
    {
        id: 13,
        pharmacyId: 4,
        name: 'Amoxicillin 500',
        description: 'Broad-spectrum antibiotic',
        uses: 'Treatment of bacterial infections including respiratory, ear, and urinary tract infections',
        dosage: '500mg three times daily',
        sideEffects: 'Nausea, diarrhea, rash, allergic reactions',
        price: 85.00,
        manufacturer: 'Cipla',
        inStock: true,
        category: 'Antibiotic',
        prescriptionRequired: true
    }
];

export const getMedicineById = (id: number): Medicine | undefined => {
    return medicines.find(medicine => medicine.id === id);
};

export const getMedicinesByPharmacyId = (pharmacyId: number): Medicine[] => {
    return medicines.filter(medicine => medicine.pharmacyId === pharmacyId);
};
