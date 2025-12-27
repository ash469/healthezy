import { apiClient } from '../config';
import type { Pharmacy, Medicine } from '@/types/pharmacy';
import type { PharmacyDashboardData } from '@/types/dashboard/pharmacy';

// Backend API response types
interface MedicineApiResponse {
    id: number;
    pharmacyId: number;
    name: string;
    description?: string;
    uses?: string;
    dosage?: string;
    sideEffects?: string;
    price: number;
    manufacturer?: string;
    inStock: boolean;
    category?: string;
    prescriptionRequired?: boolean;
}

interface PharmacyApiResponse {
    id: number;
    name: string;
    location?: string;
    address?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
    medicines?: MedicineApiResponse[];
}

/**
 * Transform API medicine response to frontend Medicine type
 */
function transformMedicine(apiMedicine: MedicineApiResponse): Medicine {
    return {
        id: apiMedicine.id,
        name: apiMedicine.name,
        price: apiMedicine.price,
        description: apiMedicine.description,
        pharmacyId: apiMedicine.pharmacyId,
        uses: apiMedicine.uses,
        dosage: apiMedicine.dosage,
        sideEffects: apiMedicine.sideEffects,
        manufacturer: apiMedicine.manufacturer,
        inStock: apiMedicine.inStock,
        category: apiMedicine.category,
        prescriptionRequired: apiMedicine.prescriptionRequired,
    };
}

/**
 * Transform API pharmacy response to frontend Pharmacy type
 */
function transformPharmacy(apiPharmacy: PharmacyApiResponse): Pharmacy {
    return {
        id: apiPharmacy.id,
        name: apiPharmacy.name,
        location: apiPharmacy.location || '',
        address: apiPharmacy.address || '',
        rating: apiPharmacy.rating || 0,
        latitude: apiPharmacy.latitude || 0,
        longitude: apiPharmacy.longitude || 0,
        imageUrl: '/lab.png', // Default image
        availableMedicines: apiPharmacy.medicines?.map(transformMedicine) || [],
    };
}

/**
 * Get all pharmacies
 */
export async function getAllPharmacies(): Promise<Pharmacy[]> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<PharmacyApiResponse[]>('/pharmacies');
    // return data.map(transformPharmacy);

    // For now, return dummy data
    const { pharmacies } = await import('@/data/pharmacy');
    return pharmacies;
}

/**
 * Get pharmacy by ID
 */
export async function getPharmacyById(id: number): Promise<Pharmacy | null> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<PharmacyApiResponse>(`/pharmacies/${id}`);
    // return transformPharmacy(data);

    // For now, return dummy data
    const { getPharmacyById } = await import('@/data/pharmacy');
    return getPharmacyById(id) || null;
}

/**
 * Search medicines across all pharmacies
 */
export async function searchMedicines(query: string): Promise<Medicine[]> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<MedicineApiResponse[]>('/medicines/search', {
    //     params: { q: query }
    // });
    // return data.map(transformMedicine);

    // For now, search in dummy data
    const { pharmacies } = await import('@/data/pharmacy');
    const allMedicines = pharmacies.flatMap(p => p.availableMedicines || []);
    return allMedicines.filter(m =>
        m.name.toLowerCase().includes(query.toLowerCase())
    );
}

/**
 * Get all data for the pharmacy dashboard
 */
export async function getPharmacyDashboardData(): Promise<PharmacyDashboardData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Fetch from centralized dummy data
    const { pharmacyDashboardData } = await import('@/data/dashboard/pharmacy');
    return pharmacyDashboardData;
}
