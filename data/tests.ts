import { Test } from '@/types/test';

export const tests: Test[] = [
    // Lab 1 (Path Labs) - Delhi
    {
        id: 1,
        labId: 1,
        name: 'Complete Blood Count (CBC)',
        description: 'A complete blood count test measures several components of your blood including red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.',
        price: 330,
        preparationRequired: 'No fasting required',
        reportTime: '24 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    },
    {
        id: 2,
        labId: 1,
        name: 'Glucose, Fasting (F)',
        description: 'Measures blood sugar levels after fasting. Used to diagnose diabetes and prediabetes.',
        price: 150,
        preparationRequired: '8-12 hours fasting required',
        reportTime: 'Same day',
        category: 'Blood Test',
        sampleType: 'Blood'
    },
    {
        id: 3,
        labId: 1,
        name: 'Vitamin B12 / Cyanocobalamin',
        description: 'Measures vitamin B12 levels in blood. Helps diagnose B12 deficiency and related conditions.',
        price: 800,
        preparationRequired: 'No special preparation',
        reportTime: '48 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    },
    {
        id: 4,
        labId: 1,
        name: 'Thyroid Profile',
        description: 'Comprehensive thyroid function test including T3, T4, and TSH levels.',
        price: 500,
        preparationRequired: 'No fasting required',
        reportTime: '24 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    },

    // Lab 2 (SVM Hospital) - Mumbai
    {
        id: 5,
        labId: 2,
        name: 'Complete Blood Count (CBC)',
        description: 'A complete blood count test measures several components of your blood including red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.',
        price: 450,
        preparationRequired: 'No fasting required',
        reportTime: '24 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    },
    {
        id: 6,
        labId: 2,
        name: 'Liver Function Test (LFT)',
        description: 'Measures enzymes and proteins in blood to check liver health. Includes bilirubin, ALT, AST, and alkaline phosphatase.',
        price: 600,
        preparationRequired: '8 hours fasting recommended',
        reportTime: '24 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    },
    {
        id: 7,
        labId: 2,
        name: 'HbA1c (Glycated Hemoglobin)',
        description: 'Measures average blood sugar levels over the past 2-3 months. Used for diabetes monitoring.',
        price: 550,
        preparationRequired: 'No fasting required',
        reportTime: '48 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    },

    // Lab 3 (Dhruva Laboratories) - Bangalore
    {
        id: 8,
        labId: 3,
        name: 'Complete Blood Count (CBC)',
        description: 'A complete blood count test measures several components of your blood including red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.',
        price: 300,
        preparationRequired: 'No fasting required',
        reportTime: '24 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    },
    {
        id: 9,
        labId: 3,
        name: 'Kidney Function Test (KFT)',
        description: 'Measures creatinine, urea, and electrolytes to assess kidney health and function.',
        price: 550,
        preparationRequired: 'No special preparation',
        reportTime: '24 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    },
    {
        id: 10,
        labId: 3,
        name: 'Urine Routine & Microscopy',
        description: 'Comprehensive urine analysis to detect urinary tract infections, kidney problems, and diabetes.',
        price: 200,
        preparationRequired: 'First morning sample preferred',
        reportTime: 'Same day',
        category: 'Urine Test',
        sampleType: 'Urine'
    },

    // Lab 4 (Lakhotia) - Hyderabad
    {
        id: 11,
        labId: 4,
        name: 'Complete Blood Count (CBC)',
        description: 'A complete blood count test measures several components of your blood including red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.',
        price: 500,
        preparationRequired: 'No fasting required',
        reportTime: '24 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    },
    {
        id: 12,
        labId: 4,
        name: 'Lipid Profile',
        description: 'Measures cholesterol levels including total cholesterol, HDL, LDL, and triglycerides.',
        price: 400,
        preparationRequired: '12 hours fasting required',
        reportTime: '24 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    },
    {
        id: 13,
        labId: 4,
        name: 'Vitamin D (25-OH)',
        description: 'Measures vitamin D levels in blood. Helps diagnose vitamin D deficiency.',
        price: 900,
        preparationRequired: 'No special preparation',
        reportTime: '48 hours',
        category: 'Blood Test',
        sampleType: 'Blood'
    }
];

export const getTestById = (id: number): Test | undefined => {
    return tests.find(test => test.id === id);
};

export const getTestsByLabId = (labId: number): Test[] => {
    return tests.filter(test => test.labId === labId);
};
