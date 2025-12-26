
import { Test } from '@/types/lab';

export const tests: Test[] = [
    { id: 't1', name: 'COMPLETE BLOOD COUNT; CBC', price: 0, parametersCovered: 20, homeCollection: true, labVisit: true },
    { id: 't2', name: 'GLUCOSE, FASTING (F)', price: 0, parametersCovered: 5, homeCollection: true, labVisit: true },
    { id: 't3', name: 'VITAMIN B12 / CYANOCOBALAMIN', price: 0, parametersCovered: 1, homeCollection: true, labVisit: false },
    { id: 't4', name: 'THYROID PROFILE', price: 0, parametersCovered: 3, homeCollection: false, labVisit: true },
    { id: 't5', name: 'LIVER FUNCTION TEST', price: 0, parametersCovered: 12, homeCollection: true, labVisit: true },
    { id: 't6', name: 'KIDNEY FUNCTION TEST', price: 0, parametersCovered: 0 },
    { id: 't7', name: 'LIPID PROFILE', price: 0, parametersCovered: 0 }
];

export const getTestById = (id: string): Test | undefined => {
    return tests.find(t => t.id === id);
};
