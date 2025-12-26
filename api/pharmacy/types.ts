export interface Medicine {
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

export interface Pharmacy {
    id: number;
    name: string;
    location?: string;
    address?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
}
