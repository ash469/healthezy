'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin';
import { AdminPatientResponse } from '@/types/admin';

export default function PatientRegistry() {
    const [patients, setPatients] = useState<AdminPatientResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await adminService.listAllPatients();
            setPatients(data || []);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-10 border-b border-gray-100 pb-8">
                <h1 className="text-[2.5rem] font-bold text-[#0e5c63]">Patients</h1>
                <p className="text-gray-500 mt-1">Central registry of all registered patients across the platform.</p>
            </header>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Patient Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Gender</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-gray-400">Loading registry...</td>
                                </tr>
                            ) : patients.length > 0 ? patients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[#0e5c63] flex items-center justify-center text-white font-bold">
                                                {patient.full_name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{patient.full_name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm text-[#0e5c63] font-semibold">{patient.email || 'No email'}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-bold text-gray-700">{patient.phone_number}</p>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <span className="text-xs font-bold text-gray-900 uppercase">{patient.gender}</span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-gray-400 font-medium">No patient records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
