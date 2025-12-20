export interface Test {
    id: string;
    name: string;
    price: number;
    description?: string;
    parametersCovered?: number | string; // e.g. "20 Parameter(s) Covered"
    homeCollection?: boolean;
    labVisit?: boolean;
}

export interface Lab {
    id: string;
    name: string;
    location: string;
    address: string;
    price: number;
    latitude: number;
    longitude: number;
    imageUrl: string;
    rating: number;
    availableTests: Test[];
    slots?: { [key: string]: string[] };
}
