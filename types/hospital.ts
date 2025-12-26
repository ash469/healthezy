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
    isActive?: boolean;
}
