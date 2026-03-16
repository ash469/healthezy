"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMyPatients } from '@/services/doctor';

export default function MyPatientsPage() {
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getMyPatients();
                setPatients(data);
            } catch (err) {
                console.error("Error fetching patients:", err);
                setError("Failed to load your patient list.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading patients...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-teal-900">My Patients</h1>
                        <p className="text-gray-600">List of patients who have booked appointments with you</p>
                    </div>
                    <Link href="/dashboard/doctor" className="text-teal-700 hover:text-teal-900 font-medium">
                        Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-teal-50 border-b border-teal-100">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Gender</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Email</th>
                                    <th className='px-6 py-4 text-sm font-semibold text-teal-900'>Phone Number</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {patients.length > 0 ? (
                                    patients.map((p) => (
                                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">{p.first_name} {p.last_name}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div>{p.gender}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div>{p.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <div>{p.phone_number}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <Link href={`/dashboard/doctor/patients/${p.id}`} className="text-teal-600 hover:text-teal-800 font-medium">
                                                    View History
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-10 py-16 text-center text-gray-500">
                                            No patients found.
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
