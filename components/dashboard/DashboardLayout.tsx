'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
    userType: 'patient' | 'doctor' | 'lab' | 'hospital' | 'store' | 'ecommerce';
    userName?: string;
}

const menuItems = {
    patient: [
        { label: 'Dashboard', href: '/dashboard/patient', icon: '📊' },
        { label: 'My Appointments', href: '/dashboard/patient/appointments', icon: '📅' },
        { label: 'Lab Reports', href: '/dashboard/patient/reports', icon: '🧪' },
        { label: 'Prescriptions', href: '/dashboard/patient/prescriptions', icon: '💊' },
        { label: 'Insurance', href: '/dashboard/patient/insurance', icon: '🏥' },
        { label: 'Profile', href: '/dashboard/patient/register', icon: '👤' }
    ],
    doctor: [
        { label: 'Dashboard', href: '/dashboard/doctor', icon: '📊' },
        { label: 'Appointments', href: '/dashboard/doctor/appointments', icon: '📅' },
        { label: 'Manage Slots', href: '/dashboard/doctor/slots', icon: '⏰' },
        { label: 'Patients', href: '/dashboard/doctor/patients', icon: '👥' },
        { label: 'Earnings', href: '/dashboard/doctor/earnings', icon: '💰' },
        { label: 'Profile', href: '/dashboard/doctor/profile', icon: '👤' }
    ],
    ecommerce: [
        { label: 'Dashboard', href: '/dashboard/ecommerce', icon: '📊' },
        { label: 'Orders', href: '/dashboard/ecommerce/orders', icon: '📦' },
        { label: 'Add Product', href: '/dashboard/ecommerce/products/new', icon: '➕' },
        { label: 'Create Offer', href: '/dashboard/ecommerce/offers', icon: '🎁' },
        { label: 'Inventory', href: '/dashboard/ecommerce/inventory', icon: '📋' },
        { label: 'Analytics', href: '/dashboard/ecommerce/analytics', icon: '📈' }
    ],
    lab: [
        { label: 'Dashboard', href: '/dashboard/lab', icon: '📊' },
        { label: 'Test Bookings', href: '/dashboard/lab/bookings', icon: '📅' },
        { label: 'Add Test', href: '/dashboard/lab/tests/new', icon: '➕' },
        { label: 'Reports', href: '/dashboard/lab/reports', icon: '📄' },
        { label: 'Revenue', href: '/dashboard/lab/revenue', icon: '💰' },
        { label: 'Profile', href: '/dashboard/lab/profile', icon: '👤' }
    ],
    hospital: [
        { label: 'Dashboard', href: '/dashboard/hospital', icon: '📊' },
        { label: 'Doctors', href: '/dashboard/hospital/doctors', icon: '👨‍⚕️' },
        { label: 'Add Doctor', href: '/dashboard/hospital/doctors/new', icon: '➕' },
        { label: 'Appointments', href: '/dashboard/hospital/appointments', icon: '📅' },
        { label: 'Departments', href: '/dashboard/hospital/departments', icon: '🏥' },
        { label: 'Analytics', href: '/dashboard/hospital/analytics', icon: '📈' }
    ],
    store: [
        { label: 'Dashboard', href: '/dashboard/store', icon: '📊' },
        { label: 'Orders', href: '/dashboard/store/orders', icon: '📦' },
        { label: 'Inventory', href: '/dashboard/store/inventory', icon: '📋' },
        { label: 'Add Product', href: '/dashboard/store/products/new', icon: '➕' },
        { label: 'Revenue', href: '/dashboard/store/revenue', icon: '💰' },
        { label: 'Profile', href: '/dashboard/store/profile', icon: '👤' }
    ]
};

export default function DashboardLayout({ children, userType, userName = "User" }: DashboardLayoutProps) {
    const items = menuItems[userType];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r fixed h-screen overflow-y-auto">
                <div className="p-6 border-b">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold">HealthEzy</span>
                    </Link>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Welcome back,</p>
                        <p className="font-semibold text-lg capitalize">{userName}</p>
                        <p className="text-xs text-gray-500 capitalize">{userType}</p>
                    </div>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors group"
                                >
                                    <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t">
                    <button className="w-full btn btn-outline">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
