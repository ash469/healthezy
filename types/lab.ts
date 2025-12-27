export interface Test {
    id: number;
    name: string;
    price: number;
    description?: string;
    parametersCovered?: number | string;
    homeCollection?: boolean;
    labVisit?: boolean;
    preparation?: string;
    resultTime?: string;
    sampleType?: string;
}

export interface Lab {
    id: number;
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
