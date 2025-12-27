import { apiClient } from '../config';
import type { Lab, Test } from './types';

export async function getAllLabs(): Promise<Lab[]> {
    const { data } = await apiClient.get<Lab[]>('/labs');
    return data;
}

export async function getLabTests(labId: number): Promise<Test[]> {
    const { data } = await apiClient.get<Test[]>(`/labs/${labId}/tests`);
    return data;
}

export async function getTestDetails(labId: number, testId: number): Promise<Test> {
    const { data } = await apiClient.get<Test>(`/labs/${labId}/tests/${testId}`);
    return data;
}
