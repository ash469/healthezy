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
