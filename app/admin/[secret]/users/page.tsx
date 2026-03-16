'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin';
import { AdminUserResponse } from '@/types/admin';

export default function UserDirectory() {
    const [users, setUsers] = useState<AdminUserResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterActive, setFilterActive] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await adminService.listAllUsers(filterActive);
            setUsers(data || []);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filterActive]);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                <div>
                    <h1 className="text-[2.5rem] font-bold text-[#0e5c63]">Users</h1>
                    <p className="text-gray-500 mt-1">Manage system administrators and staff access.</p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setFilterActive(true)}
                        className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${filterActive ? 'bg-white text-[#0e5c63] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilterActive(false)}
                        className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${!filterActive ? 'bg-white text-[#0e5c63] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Deactivated
                    </button>
                </div>
            </header>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-gray-400">Loading users...</td>
                                </tr>
                            ) : users.length > 0 ? users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#0e5c63]/5 flex items-center justify-center text-[#0e5c63] font-bold">
                                                {user.first_name[0]}{user.last_name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{user.first_name} {user.last_name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm text-gray-600 font-medium">{user.email}</span>
                                    </td>
                                    <td className="px-6 py-5 font-mono text-xs text-gray-500">
                                        {user.phone_number || 'No contact'}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-md">
                                                {user.role}
                                            </span>
                                            {user.is_superuser && (
                                                <span className="px-2.5 py-1 bg-[#0e5c63]/10 text-[#0e5c63] text-[10px] font-bold uppercase rounded-md border border-[#0e5c63]/20">
                                                    Admin
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-gray-400 font-medium">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
