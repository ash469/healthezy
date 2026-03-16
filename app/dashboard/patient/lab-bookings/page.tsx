'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPatientLabBookings } from '@/services/lab';
import type { LabBookingDetailResponse } from '@/types/lab';

export default function PatientLabBookingsPage() {
    const [bookings, setBookings] = useState<LabBookingDetailResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await getPatientLabBookings();
            setBookings(data || []);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.lab_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             booking.booking_number?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-teal-600 mb-2">
                            <Link href="/dashboard/patient" className="hover:underline text-sm font-bold flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                                Back to Dashboard
                            </Link>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Lab Bookings</h1>
                        <p className="text-slate-500 font-medium">View and manage all your laboratory test appointments</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search by Lab Name or Booking ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-100 focus:border-teal-500 outline-none transition-all font-medium text-slate-700"
                        />
                        <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <div className="flex gap-2">
                        {['All', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-xl text-xs font-black tracking-widest transition-all ${
                                    statusFilter === status 
                                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' 
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bookings Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                    </div>
                ) : filteredBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all group">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-teal-50 rounded-2xl text-teal-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.283a2 2 0 01-1.186.116l-2.054-.41a6 6 0 00-4.173.424l-.411.197a.3.3 0 01-.41-.353l.367-1.33a3 3 0 00-.518-2.673l-1.082-1.393a.3.3 0 01.121-.462l1.625-.542a3 3 0 001.996-1.996l.542-1.625a.3.3 0 01.462-.121l1.393 1.082a3 3 0 002.673.518l1.33-.367a.3.3 0 01.353.411l-.197.41a6 6 0 00-.424 4.173l.41 2.054a2 2 0 01-.116 1.186l-.283.628a6 6 0 00-.517 3.86l.477 2.387a2 2 0 00.547 1.022l1.011 1.011a2 2 0 010 2.828l-.707.707a2 2 0 01-2.828 0l-1.011-1.011z" /></svg>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
                                                booking.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                                                booking.status === 'CANCELLED' ? 'bg-rose-100 text-rose-700' :
                                                'bg-teal-100 text-teal-700'
                                            }`}>
                                                {booking.status}
                                            </span>
                                            <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-tight">#{booking.booking_number}</p>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-black text-slate-900 mb-1">{booking.lab_name}</h3>
                                    <p className="text-sm font-bold text-slate-500 mb-6 flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {booking.booking_date}
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Tests</div>
                                        <div className="flex flex-wrap gap-2">
                                            {booking.tests?.map((test: any, idx: number) => (
                                                <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-700 rounded-lg text-xs font-bold border border-slate-100">
                                                    {test.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Total Paid</p>
                                        <p className="text-lg font-black text-teal-600">₹{booking.total_price}</p>
                                    </div>
                                    <Link 
                                        href={`/labs/${booking.lab_id}/booking-confirmation?appointmentNumber=${booking.booking_number}`}
                                        className="p-3 bg-white text-teal-600 rounded-2xl border-2 border-teal-100 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all shadow-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">No Bookings Found</h2>
                        <p className="text-slate-500 font-medium mb-8">You haven't booked any lab tests yet.</p>
                        <Link href="/labs" className="bg-teal-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-teal-600/20 hover:bg-teal-700 transition-all">
                            Browse Labs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
