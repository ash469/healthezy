import { apiClient } from '../config';
import type { Lab, Test } from '@/types/lab';

// Backend API response types
interface TestApiResponse {
    id: number;
    name: string;
    price: number;
    description?: string;
    parametersCovered?: number | string;
    homeCollection?: boolean;
    labVisit?: boolean;
}

interface LabApiResponse {
    id: number;
    name: string;
    location: string;
    address: string;
    price: number;
    latitude: number;
    longitude: number;
    imageUrl: string;
    rating: number;
    availableTests: TestApiResponse[];
    slots?: { [key: string]: string[] };
}

/**
 * Transform API test response to frontend Test type
 */
function transformTest(apiTest: TestApiResponse): Test {
    return {
        id: apiTest.id,
        name: apiTest.name,
        price: apiTest.price,
        description: apiTest.description,
        parametersCovered: apiTest.parametersCovered,
        homeCollection: apiTest.homeCollection,
        labVisit: apiTest.labVisit,
    };
}

/**
 * Transform API lab response to frontend Lab type
 */
function transformLab(apiLab: LabApiResponse): Lab {
    return {
        id: apiLab.id,
        name: apiLab.name,
        location: apiLab.location,
        address: apiLab.address,
        price: apiLab.price,
        latitude: apiLab.latitude,
        longitude: apiLab.longitude,
        imageUrl: apiLab.imageUrl,
        rating: apiLab.rating,
        availableTests: apiLab.availableTests.map(transformTest),
        slots: apiLab.slots,
    };
}

/**
 * Get all labs
 */
export async function getAllLabs(): Promise<Lab[]> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<LabApiResponse[]>('/labs');
    // return data.map(transformLab);

    // For now, return dummy data
    const { labs } = await import('@/data/labs');
    return labs;
}

/**
 * Get lab by ID
 */
export async function getLabById(id: number): Promise<Lab | null> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<LabApiResponse>(`/labs/${id}`);
    // return transformLab(data);

    // For now, return dummy data
    const { getLabById } = await import('@/data/labs');
    return getLabById(id) || null;
}

/**
 * Search tests across all labs
 */
export async function searchTests(query: string): Promise<Test[]> {
    // In production, replace with real API call
    // const { data } = await apiClient.get<TestApiResponse[]>('/tests/search', {
    //     params: { q: query }
    // });
    // return data.map(transformTest);

    // For now, search in dummy data
    const { labs } = await import('@/data/labs');
    const allTests = labs.flatMap(lab => lab.availableTests);
    return allTests.filter(test =>
        test.name.toLowerCase().includes(query.toLowerCase())
    );
}
