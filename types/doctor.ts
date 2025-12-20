export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    price: number;
    imageUrl: string;
    rating: number;
    experience?: string;
}
