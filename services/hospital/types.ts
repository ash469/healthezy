// Only define the fields we actually need in the frontend
export interface Hospital {
    id: number;
    name: string;
    location?: string;        // Used for display (e.g., "ABC Road, Lucknow, U.P")
    address?: string;         // Full address
    city?: string;
    phoneNumber?: string;
    email?: string;
    logoUrl?: string;         // Hospital logo/image
    rating?: number;          // Star rating
    latitude?: number;        // Required for Google Maps direction link
    longitude?: number;       // Required for Google Maps direction link
    specializations?: string;
    isActive?: boolean;
}

// Minimal paginated response - only what we use
export interface HospitalPageResponse {
    content: Hospital[];
    totalPages?: number;
    totalElements?: number;
    number?: number;
}
