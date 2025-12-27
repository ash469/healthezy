export interface Medicine {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    description?: string;
    tabletsPerStrip?: number;
    pharmacyId?: number;
    uses?: string;
    dosage?: string;
    sideEffects?: string;
    manufacturer?: string;
    inStock?: boolean;
    category?: string;
    prescriptionRequired?: boolean;
}

export interface Pharmacy {
    id: number;
    name: string;
    location: string;
    address: string;
    rating: number;
    reviews?: number;
    imageUrl: string;
    deliveryTime?: string;
    minimumOrder?: string;
    activeDiscount?: string;
    latitude: number;
    longitude: number;
    availableMedicines: Medicine[];
}
