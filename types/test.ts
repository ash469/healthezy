export interface Test {
    id: number;
    labId: number;              // Foreign key to Lab
    name: string;
    description?: string;
    price: number;
    preparationRequired?: string;
    reportTime?: string;        // e.g., "24 hours", "Same day"
    category?: string;          // e.g., "Blood Test", "Imaging", "Urine Test"
    sampleType?: string;        // e.g., "Blood", "Urine", "Tissue"
}
