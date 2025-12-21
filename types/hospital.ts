import { Doctor } from './doctor';

export interface Hospital {
    id: string;
    name: string;
    location: string;
    address: string;
    imageUrl: string;
    rating: number;
    latitude: number;
    longitude: number;
    doctors: Doctor[];
}
