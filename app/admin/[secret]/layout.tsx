'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { adminAuth } from '@/services/adminAuth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    const secret = params.secret as string;
    const isLoginPage = pathname === `/admin/${secret}`;

    useEffect(() => {
        // Simple authentication check using the dedicated admin token
        const authenticated = adminAuth.isAuthenticated();

        if (!authenticated && !isLoginPage) {
            router.push(`/admin/${secret}`);
        } else {
            setIsAuthorized(true);
        }
    }, [isLoginPage, router, secret]);

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased flex">
            {!isLoginPage && <AdminSidebar />}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
