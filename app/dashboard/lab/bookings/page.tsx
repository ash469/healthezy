'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getLabBookings, getMyManagedLabs } from '@/services/lab';
import type { LabBookingDetailResponse, LabResponse } from '@/types/lab';
import '@/app/dashboard.css';

function LabBookingsContent() {
    const searchParams = useSearchParams();
    const urlLabId = searchParams.get('lab_id');
    
    const [bookings, setBookings] = useState<LabBookingDetailResponse[]>([]);
    const [managedLabs, setManagedLabs] = useState<LabResponse[]>([]);
    const [selectedLabId, setSelectedLabId] = useState<number | undefined>(
        urlLabId ? Number(urlLabId) : undefined
    );
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState({ status: '', date: '' });

    const fetchBookings = async () => {
        setIsLoading(true);
        try {
            const data = await getLabBookings(selectedLabId);
            setBookings(data || []);
        } catch (err) {
            console.error('Fetch bookings error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchLabs = async () => {
        try {
            const labsData = await getMyManagedLabs();
            setManagedLabs(labsData || []);
        } catch (err) {
            console.error('Fetch labs error:', err);
        }
    };

    useEffect(() => {
        fetchLabs();
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [selectedLabId]);

    const filteredBookings = bookings.filter(booking => {
        if (filter.status && booking.status !== filter.status) return false;
        if (filter.date && booking.booking_date !== filter.date) return false;
        return true;
    });

    if (isLoading && bookings.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="patient-dashboard bg-gray-50 min-h-screen">
            <header className="dashboard-header mb-8">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard/lab" className="p-2 bg-white rounded-lg shadow-sm text-teal-600 hover:bg-teal-50 transition-all border border-teal-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f766e] tracking-tight">
                                Lab Bookings
                            </h1>
                            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-black self-center mt-1">
                                {filteredBookings.length} RECORD{filteredBookings.length !== 1 ? 'S' : ''}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium mt-1">View and manage patient bookings for your laboratory.</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-6 lg:mt-0">
                    {/* Lab Selector */}
                    <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Laboratory</label>
                        <select
                            value={selectedLabId || ''}
                            onChange={(e) => setSelectedLabId(e.target.value ? Number(e.target.value) : undefined)}
                            className="bg-transparent text-sm font-bold text-teal-800 outline-none cursor-pointer focus:text-teal-600 transition-colors"
                        >
                            <option value="">All Managed Labs</option>
                            {managedLabs.map(lab => (
                                <option key={lab.id} value={lab.id}>{lab.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-2 border-r border-gray-100 pr-4">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</label>
                            <select
                                value={filter.status}
                                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                className="bg-transparent text-sm font-bold text-teal-800 outline-none cursor-pointer focus:text-teal-600 transition-colors"
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2 pl-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">By Date</label>
                            <input 
                                type="date"
                                value={filter.date}
                                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                                className="bg-transparent text-sm font-bold text-teal-800 outline-none cursor-pointer focus:text-teal-600 transition-colors border-none p-0 w-32"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#f0fdfa] border-b border-teal-50">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Booking No</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Laboratory</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Patient Details</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Tests</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Schedule</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Price</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 bg-white">
                                {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-teal-50/20 transition-all group border-b border-gray-50 last:border-0">
                                        <td className="px-6 py-4">
                                            <p className="font-mono text-[10px] font-bold text-gray-400">#{booking.booking_number}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded bg-teal-600 text-white flex items-center justify-center text-[10px] font-black">
                                                    {booking.lab_name?.charAt(0)}
                                                </div>
                                                <p className="font-bold text-slate-700 text-sm whitespace-nowrap">{booking.lab_name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-900 text-sm group-hover:text-teal-700 transition-colors">
                                                {booking.patient_name}
                                            </p>
                                            <p className="text-[10px] text-gray-400 font-bold tracking-tight">{booking.patient_phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {booking.tests.map(test => (
                                                    <span key={test.id} className="bg-white text-teal-700 px-2 py-0.5 rounded text-[10px] font-bold border border-teal-100 shadow-sm">
                                                        {test.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                <p className="text-slate-600 font-bold text-xs tracking-tight">{booking.booking_date}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-teal-600 font-black text-sm">₹{booking.total_price}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg border ${
                                                booking.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                booking.status === 'CANCELLED' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                booking.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                'bg-teal-50 text-teal-600 border-teal-100'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <div className="p-4 bg-teal-50 rounded-full">
                                                    <svg className="w-10 h-10 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">No Active Bookings</p>
                                                <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed mx-auto italic font-medium">No bookings found for the selected filters.</p>
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

export default function LabBookingsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        }>
            <LabBookingsContent />
        </Suspense>
    );
}
