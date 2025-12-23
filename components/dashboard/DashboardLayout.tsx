'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
    userType: 'patient' | 'doctor' | 'lab' | 'hospital' | 'pharmacy' | 'ecommerce';
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
    pharmacy: [
        { label: 'Dashboard', href: '/dashboard/pharmacy', icon: '📊' },
        { label: 'Orders', href: '/dashboard/pharmacy/orders', icon: '📦' },
        { label: 'Prescriptions', href: '/dashboard/pharmacy/prescriptions', icon: '💊' },
        { label: 'Inventory', href: '/dashboard/pharmacy/inventory', icon: '📋' },
        { label: 'Revenue', href: '/dashboard/pharmacy/revenue', icon: '💰' },
        { label: 'Profile', href: '/dashboard/pharmacy/profile', icon: '👤' }
    ]
};

export default function DashboardLayout({ children, userType, userName = "User" }: DashboardLayoutProps) {
    const items = menuItems[userType];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
