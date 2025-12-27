export interface Test {
    id: number;
    labId: number;
    name: string;
    description?: string;
    price: number;
    preparationRequired?: string;
    reportTime?: string;
    category?: string;
    sampleType?: string;
}

export interface Lab {
    id: number;
    name: string;
    location?: string;
    address?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
}
