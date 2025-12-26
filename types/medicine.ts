export interface Medicine {
    id: number;
    pharmacyId: number;         // Foreign key to Pharmacy
    name: string;
    description?: string;
    uses?: string;              // Medical uses
    dosage?: string;            // Recommended dosage
    sideEffects?: string;       // Possible side effects
    price: number;
    manufacturer?: string;
    inStock: boolean;
    category?: string;          // e.g., "Antibiotic", "Pain Relief", "Vitamin"
    prescriptionRequired?: boolean;
}
