export interface Medicine {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    description?: string;
    tabletsPerStrip?: number;
}

export interface Pharmacy {
    id: string;
    name: string;
    location: string;
    address: string;
    rating: number;
    reviews: number;
    imageUrl: string;
    deliveryTime: string;
    minimumOrder: string;
    activeDiscount?: string;
    latitude: number;
    longitude: number;
    availableMedicines: Medicine[];
}
