'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { submitHospitalApplication } from '@/services/hospital';
import type { HospitalApplicationData } from '@/types/hospital';

export default function HospitalApplyPage() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<HospitalApplicationData>({
        name: '',
        type: 'General Hospital',
        description: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: 'INDIA',
        phone_number: '',
        email: '',
        website: '',
        emergency_number: '',
        total_beds: 0,
        available_beds: 0,
        is24x7: true,
        latitude: 18.9221,
        longitude: 72.8346,
        logo_url: '',
        license_number: '',
        accreditation: '',
        established_year: new Date().getFullYear()
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
                type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const processedData = {
                ...formData,
                website: formData.website || null // Fix for empty URL validation
            };
            await submitHospitalApplication(processedData);
            router.push('/dashboard/hospital');
        } catch (err: any) {
            console.error('Application error:', err);
            
            // Handle FastAPI-style 422 detail array
            let errorMessage = 'Failed to submit application. Please verify all fields.';
            const detail = err.response?.data?.detail;
            
            if (typeof detail === 'string') {
                errorMessage = detail;
            } else if (Array.isArray(detail)) {
                errorMessage = detail.map((d: any) => `${d.loc[d.loc.length - 1]}: ${d.msg}`).join(', ');
            } else if (detail?.message) {
                errorMessage = detail.message;
            }
            
            setError(errorMessage);
            setSubmitting(false);
        }
    };

    if (authLoading) return <div className="p-8 text-center text-[#0f766e]">Loading...</div>;
    if (!user || user.role !== 'hospital-admin') {
        return <div className="p-8 text-center text-red-600">Access Denied. Only Hospital Admins can access this page.</div>;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-teal-100">
                    <div className="bg-[#0D5C63] p-8 text-white relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Hospital Registration</h1>
                                <p className="opacity-90">Please provide the necessary details to register your facility on Healthezy.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => router.push('/dashboard/hospital')}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 border border-white/10"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        {/* Section 1: Basic Information */}
                        <div>
                            <h3 className="text-lg font-bold text-[#0D5C63] mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-sm">01</span>
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Hospital Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. St. Luke's Medical Center"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Hospital Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
                                    >
                                        <option value="General Hospital">General Hospital</option>
                                        <option value="Multi-Specialty">Multi-Specialty</option>
                                        <option value="Clinic">Clinic</option>
                                        <option value="Nursing Home">Nursing Home</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Description</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Tell us about your hospital's facilities and services..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Contact & Address */}
                        <div>
                            <h3 className="text-lg font-bold text-[#0D5C63] mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-sm">02</span>
                                Contact & Location
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Full Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Public Health Phone</label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        required
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Emergency Number</label>
                                    <input
                                        type="tel"
                                        name="emergency_number"
                                        required
                                        value={formData.emergency_number}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Website (Optional)</label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website || ''}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Facility Details */}
                        <div>
                            <h3 className="text-lg font-bold text-[#0D5C63] mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-sm">03</span>
                                Facility Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Total Beds</label>
                                    <input
                                        type="number"
                                        name="total_beds"
                                        required
                                        min="0"
                                        value={formData.total_beds}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">License No.</label>
                                    <input
                                        type="text"
                                        name="license_number"
                                        required
                                        value={formData.license_number}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Accreditation</label>
                                    <input
                                        type="text"
                                        name="accreditation"
                                        placeholder="NABH, JCI etc."
                                        value={formData.accreditation}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Est. Year</label>
                                    <input
                                        type="number"
                                        name="established_year"
                                        required
                                        value={formData.established_year}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="flex items-center gap-3 pt-6">
                                    <input
                                        type="checkbox"
                                        id="is24x7"
                                        name="is24x7"
                                        checked={formData.is24x7}
                                        onChange={(e) => setFormData(prev => ({ ...prev, is24x7: e.target.checked }))}
                                        className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursors-pointer"
                                    />
                                    <label htmlFor="is24x7" className="text-sm font-medium text-gray-700 cursor-pointer select-none">24/7 Availability</label>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <p className="text-xs text-gray-400 italic">* Your application will be reviewed by our team for verification manually.</p>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-[#0D5C63] hover:bg-[#084248] text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-teal-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {submitting ? 'Submitting...' : 'Submit Hospital Application'}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
