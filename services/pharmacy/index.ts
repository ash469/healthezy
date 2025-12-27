import { apiClient } from '../config';
import type { Pharmacy, Medicine } from './types';


export async function getAllPharmacies(): Promise<Pharmacy[]> {
    const { data } = await apiClient.get<Pharmacy[]>('/pharmacies');
    return data;
}


export async function getPharmacyMedicines(pharmacyId: number): Promise<Medicine[]> {
    const { data } = await apiClient.get<Medicine[]>(`/pharmacies/${pharmacyId}/medicines`);
    return data;
}


export async function getMedicineDetails(pharmacyId: number, medicineId: number): Promise<Medicine> {
    const { data } = await apiClient.get<Medicine>(`/pharmacies/${pharmacyId}/medicines/${medicineId}`);
    return data;
}
