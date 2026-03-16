'use client';

import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/admin';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        applications: 0,
        users: 0,
        patients: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [hApps, lApps, users, patients] = await Promise.all([
                    adminService.getApplications('hospital', 'pending'),
                    adminService.getApplications('lab', 'pending'),
                    adminService.listAllUsers(true),
                    adminService.listAllPatients()
                ]);

                setStats({
                    applications: (hApps?.length || 0) + (lApps?.length || 0),
                    users: users?.length || 0,
                    patients: patients?.length || 0
                });
            } catch (err) {
                console.error('Data retrieval failure:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-10">
                <h1 className="text-[2.5rem] font-bold text-[#0e5c63] leading-tight">Overview</h1>
                <p className="text-gray-500 mt-1">Manage and monitor your system performance and applications.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    label="Pending Applications"
                    value={isLoading ? '...' : stats.applications}
                    description="New hospital and lab requests"
                />
                <StatCard
                    label="Registered Users"
                    value={isLoading ? '...' : stats.users}
                    description="Total staff and administrators"
                />
                <StatCard
                    label="Total Patients"
                    value={isLoading ? '...' : stats.patients}
                    description="Cumulative clinical records"
                />
            </div>
        </div>
    );
}

function StatCard({ label, value, description }: { label: string, value: string | number, description: string }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-sm font-semibold text-gray-500 mb-1">{label}</h4>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">{value}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">{description}</p>
        </div>
    );
}

function StatusRow({ label, value, status }: { label: string, value: string, status?: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">{label}</span>
            <div className="flex items-center gap-2">
                {status === 'active' && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />}
                <span className={`text-sm font-semibold ${status === 'active' ? 'text-green-600' : 'text-gray-900'}`}>{value}</span>
            </div>
        </div>
    );
}
