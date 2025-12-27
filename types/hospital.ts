export interface Hospital {
    id: number;
    name: string;
    location?: string;
    address?: string;
    city?: string;
    phoneNumber?: string;
    email?: string;
    logoUrl?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
    specializations?: string;
    type?: string;
    description?: string;
    website?: string;
    openingTime?: string;
    closingTime?: string;
    is24x7?: boolean;
    facilities?: string;
    totalBeds?: number;
    availableBeds?: number;
    reviewCount?: number;
    doctorCount?: number;
}
