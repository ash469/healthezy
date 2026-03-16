'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { adminAuth } from '@/services/adminAuth';

export default function AdminSidebar() {
    const pathname = usePathname();
    const params = useParams();
    const router = useRouter();
    const secret = params.secret as string;

    const navItems = [
        { label: 'Overview', path: `/admin/${secret}/dashboard`, icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
        { label: 'Applications', path: `/admin/${secret}/applications`, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { label: 'Users', path: `/admin/${secret}/users`, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { label: 'Patients', path: `/admin/${secret}/patients`, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    ];

    const handleLogout = () => {
        adminAuth.logout();
        router.push(`/admin/${secret}`);
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 z-50">
            {/* Header / Logo */}
            <div className="h-20 flex items-center px-6 border-b border-gray-100">
                <Link href={`/admin/${secret}/dashboard`} className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Healthezy" width={32} height={32} className="w-8 h-8 object-contain" />
                    <span className="text-xl font-bold text-[#0e5c63]">Healthezy</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-gray-50 text-[#0e5c63]'
                                : 'text-gray-600 hover:text-[#0e5c63] hover:bg-gray-50'
                                }`}
                        >
                            <svg className={`w-5 h-5 ${isActive ? 'text-[#0e5c63]' : 'text-gray-400 group-hover:text-[#0e5c63]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                            </svg>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2 text-sm font-semibold text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout console
                </button>
            </div>
        </aside>
    );
}
