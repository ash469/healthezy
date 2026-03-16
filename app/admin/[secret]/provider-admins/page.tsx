'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin';
import { AdminUserResponse, AdminEntity } from '@/types/admin';

export default function ProviderAdmins() {
    const [admins, setAdmins] = useState<AdminUserResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<AdminEntity>('hospital');

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await adminService.listProviderAdmins(activeTab, true);
            setAdmins(data || []);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    return (
        <div className="p-10 max-w-7xl mx-auto font-sans">
            <header className="mb-10 flex items-end justify-between border-b border-gray-100 pb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Facility Administrators</h1>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Administrative oversight of hospital and laboratory officers.</p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded border border-gray-200 shadow-sm">
                    <button
                        onClick={() => setActiveTab('hospital')}
                        className={`px-5 py-2 text-[11px] font-bold uppercase tracking-widest transition-all rounded ${activeTab === 'hospital' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Hospital Admins
                    </button>
                    <button
                        onClick={() => setActiveTab('lab')}
                        className={`px-5 py-2 text-[11px] font-bold uppercase tracking-widest transition-all rounded ${activeTab === 'lab' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Lab Admins
                    </button>
                </div>
            </header>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Administrator Name</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contact Coordinates</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Administrative Role</th>
                            <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Account Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <tr><td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-medium italic animate-pulse tracking-wide">Synchronizing facility leadership registry...</td></tr>
                        ) : admins.length > 0 ? admins.map((admin) => (
                            <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-8 py-6">
                                    <p className="font-bold text-gray-900 text-base">{admin.first_name} {admin.last_name}</p>
                                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Registry ID: USR-{admin.id.toString().padStart(6, '0')}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-gray-700 font-medium text-[13px]">{admin.email}</p>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase mt-0.5">Primary Administrative Contact</p>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-[9px] font-black uppercase rounded-full border border-gray-200 tracking-widest shadow-sm">
                                        {admin.role}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-full border tracking-widest shadow-sm ${admin.is_active ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                        {admin.is_active ? 'ACTIVE' : 'SUSPENDED'}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={4} className="px-8 py-20 text-center text-gray-400 bg-gray-50/50 italic tracking-wide font-medium">No facility administrators found for this category.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
