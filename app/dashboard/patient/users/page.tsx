'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMyPatients } from '@/services/patient';
import type { PatientApiResponse } from '@/services/patient';

export default function UsersPage() {
    const [patients, setPatients] = useState<PatientApiResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true);
                const data = await getMyPatients();
                setPatients(data);
            } catch (err: any) {
                console.error("Error fetching patients:", err);
                setError("Failed to load family members.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mb-4"></div>
                    <p className="text-teal-600 font-medium">Loading family members...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link href="/dashboard/patient" className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-teal-900">My Family Members</h1>
                        <p className="text-gray-600">List of all linked patient profiles</p>
                    </div>
                    <Link href="/dashboard/patient" className="text-teal-700 hover:text-teal-900 font-medium flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-teal-50 border-b border-teal-100">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Gender</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Age</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Contact</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Blood Group</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Address</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {patients.length > 0 ? (
                                    patients.map((p) => (
                                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{p.first_name} {p.last_name || ''}</div>
                                                <div className="text-xs text-gray-400 capitalize">Family Member</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 capitalize">{p.gender}</td>
                                            <td className="px-6 py-4 text-gray-700">{p.age || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div>{p.email}</div>
                                                <div>{p.phone_number}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 font-medium">{p.blood_group || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={p.address}>
                                                {p.city}, {p.state}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-10 py-16 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <p className="font-medium">No family members found.</p>
                                                <p className="text-sm mt-1">Add a new family member from the main dashboard.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
