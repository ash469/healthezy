'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getHospitalApplicationById } from '@/services/hospital';
import type { HospitalApplicationResponse } from '@/types/hospital';
import { useAuth } from '@/contexts/AuthContext';

export default function HospitalApplicationDetails() {
    const { id } = useParams();
    const router = useRouter();
    const { user, isLoading: authLoading } = useAuth();
    const [application, setApplication] = useState<HospitalApplicationResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            if (id && user) {
                try {
                    const data = await getHospitalApplicationById(Number(id));
                    if (data) {
                        setApplication(data);
                    } else {
                        setError('Application not found.');
                    }
                } catch (err) {
                    console.error('Error fetching application details:', err);
                    setError('Failed to load application details.');
                } finally {
                    setLoading(false);
                }
            }
        };

        if (!authLoading && user) {
            fetchDetails();
        } else if (!authLoading && !user) {
            setLoading(false);
        }
    }, [id, user, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
                <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin mb-4"></div>
                <div className="text-[#0f766e] font-medium">Loading application details...</div>
            </div>
        );
    }

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">Please login to view details.</div>;
    }

    if (error || !application) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-100 text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15.667c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
                    <p className="text-gray-550 mb-6">{error || 'Something went wrong.'}</p>
                    <button
                        onClick={() => router.back()}
                        className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const statusColors = {
        PENDING: 'bg-orange-100 text-orange-700 border-orange-200',
        REVIEW: 'bg-blue-100 text-blue-700 border-blue-200',
        ACCEPTED: 'bg-teal-100 text-teal-700 border-teal-200',
        APPROVED: 'bg-teal-100 text-teal-700 border-teal-200',
        REJECTED: 'bg-red-100 text-red-700 border-red-200',
        WITHDRAWN: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    const currentStatusColor = statusColors[application.status as keyof typeof statusColors] || statusColors.PENDING;

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-teal-50 mb-8">
                    <div className="bg-[#0D5C63] p-8 text-white relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest leading-none">
                                        Application Details
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest leading-none border bg-white ${currentStatusColor.split(' ')[1]}`}>
                                        {application.status}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold">{application.name}</h1>
                                <p className="opacity-80 mt-1 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {application.city}, {application.state}
                                </p>
                            </div>
                            <button
                                onClick={() => router.push('/dashboard/hospital')}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 border border-white/10"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Dashboard
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Section 1: Facility Overview */}
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                    Facility Overview
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg italic">
                                    "{application.description || 'No description provided.'}"
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div className="bg-teal-50/30 p-4 rounded-2xl border border-teal-50">
                                    <p className="text-xs font-bold text-teal-600 uppercase mb-1">Hospital Type</p>
                                    <p className="font-bold text-gray-800">{application.type}</p>
                                </div>
                                <div className="bg-blue-50/30 p-4 rounded-2xl border border-blue-50">
                                    <p className="text-xs font-bold text-blue-600 uppercase mb-1">Est. Year</p>
                                    <p className="font-bold text-gray-800">{application.established_year}</p>
                                </div>
                                <div className="bg-purple-50/30 p-4 rounded-2xl border border-purple-50">
                                    <p className="text-xs font-bold text-purple-600 uppercase mb-1">Total Beds</p>
                                    <p className="font-bold text-gray-800">{application.total_beds}</p>
                                </div>
                                <div className="bg-orange-50/30 p-4 rounded-2xl border border-orange-50">
                                    <p className="text-xs font-bold text-orange-600 uppercase mb-1">24/7 Service</p>
                                    <p className="font-bold text-gray-800">{application.is24x7 ? 'Available' : 'Limited Hours'}</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                    Location Details
                                </h3>
                                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Address</p>
                                            <p className="text-gray-800 font-medium mt-0.5">{application.address}</p>
                                            <p className="text-gray-800 font-medium">{application.city}, {application.state}, {application.zip_code}</p>
                                            <p className="text-gray-500 text-xs mt-1">{application.country}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Latitude</p>
                                            <p className="text-gray-800 font-medium">{application.latitude}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">Longitude</p>
                                            <p className="text-gray-800 font-medium">{application.longitude}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                    Contact Info
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:border-teal-200">
                                        <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Phone</p>
                                            <p className="text-gray-800 font-bold truncate">{application.phone_number}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:border-red-200">
                                        <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15.667c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Emergency</p>
                                            <p className="text-red-700 font-bold truncate">{application.emergency_number}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:border-blue-200">
                                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Email</p>
                                            <p className="text-gray-800 font-bold text-xs truncate">{application.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:border-teal-200">
                                        <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Website</p>
                                            <p className="text-gray-800 font-bold text-xs truncate">{application.website || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                    Certifications
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                                        <p className="text-[10px] font-bold text-amber-600 uppercase">License Number</p>
                                        <p className="text-gray-800 font-bold">{application.license_number}</p>
                                    </div>
                                    <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                                        <p className="text-[10px] font-bold text-indigo-600 uppercase">Accreditation</p>
                                        <p className="text-gray-800 font-bold">{application.accreditation || 'In Progress'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-gray-50/50 p-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
                        <div>
                            <p className="text-xs text-gray-400 font-medium">Application ID: {application.id}</p>
                            <p className="text-xs text-gray-400 font-medium">Applied on: {new Date(application.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-4">
                            {application.status === 'REJECTED' && (
                                <Link
                                    href="/dashboard/hospital/apply"
                                    className="px-8 py-3 bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition-all active:scale-95"
                                >
                                    Re-apply Now
                                </Link>
                            )}
                            <button
                                onClick={() => router.push('/dashboard/hospital')}
                                className="px-8 py-3 bg-white text-gray-700 border border-gray-200 font-bold rounded-2xl shadow-sm hover:border-teal-500 hover:text-teal-600 transition-all active:scale-95"
                            >
                                Close View
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
