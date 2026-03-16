'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDoctorsInHospital, addDoctorToHospital, getMyHospitalAdmin } from '@/services/hospital';
import { getAllDoctors, createDoctor, updateDoctor, deleteDoctor } from '@/services/doctor';
import type { Doctor } from '@/types/doctor';
import type { Hospital } from '@/types/hospital';
import '@/app/dashboard.css';

export default function DoctorManagement() {
    const [hospital, setHospital] = useState<Hospital | null>(null);
    const [staff, setStaff] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const hData = await getMyHospitalAdmin();
            setHospital(hData);
            if (hData) {
                const sData = await getDoctorsInHospital(hData.id);
                setStaff(sData || []);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleDelete = async (doctorId: number) => {
        if (!confirm('Are you sure you want to remove this doctor?')) return;
        try {
            await deleteDoctor(doctorId);
            // Optimization: Filter locally first for instant UI response
            setStaff(prev => prev.filter(d => d.id !== doctorId));
            // Then re-fetch to ensure sync with server
            await fetchData();
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete doctor.');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError('');
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Construct payload with exact types and fields expected by backend
        try {
            if (editingDoctor) {
                await updateDoctor(editingDoctor.id, data as any);
            } else {
                const payload = {
                    first_name: String(data.first_name),
                    middle_name: data.middle_name ? String(data.middle_name) : null,
                    last_name: String(data.last_name),
                    email: String(data.email),
                    phone_number: String(data.phone_number),
                    gender: String(data.gender),
                    specialization: String(data.specialization),
                    qualification: String(data.qualification),
                    registration_number: String(data.registration_number),
                    experience_years: Number(data.experience_years) || 0,
                    consultation_fee: Number(data.consultation_fee) || 0,
                    bio: data.bio ? String(data.bio) : null,
                    address: hospital?.address || 'Hospital Address',
                    photo_url: data.photo_url ? String(data.photo_url) : '',
                    department_id: data.department_id ? Number(data.department_id) : null,
                    hospital_id: hospital ? Number(hospital.id) : null
                };
                await createDoctor(payload as any);
            }
            setIsAddingNew(false);
            setEditingDoctor(null);
            fetchData();
        } catch (err: any) {
            const detail = err.response?.data?.detail;
            setFormError(typeof detail === 'string' ? detail : JSON.stringify(detail) || 'Failed to save doctor details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-[#0f766e] font-semibold">Synchronizing medical staff directories...</div>;
    if (!hospital) return <div className="p-8 text-center text-red-600 font-bold uppercase tracking-widest">Unauthorized Access</div>;

    if (isAddingNew || editingDoctor) {
        return (
            <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-teal-100">
                        <div className="bg-[#0D5C63] p-8 text-white relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">
                                        {editingDoctor ? 'Update Practitioner' : 'Practitioner Registration'}
                                    </h1>
                                    <p className="opacity-90">Please provide the necessary details to {editingDoctor ? 'update the' : 'register a new'} medical professional.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsAddingNew(false);
                                        setEditingDoctor(null);
                                    }}
                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 border border-white/10"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Registry
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8">
                            {formError && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                                    {formError}
                                </div>
                            )}

                            {/* Section 1: Personal Details */}
                            <div>
                                <h3 className="text-lg font-bold text-[#0D5C63] mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-sm">01</span>
                                    Personal Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">First Name</label>
                                        <input
                                            name="first_name"
                                            required
                                            defaultValue={editingDoctor?.first_name}
                                            placeholder="e.g. John"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Middle Name</label>
                                        <input
                                            name="middle_name"
                                            defaultValue={editingDoctor?.middle_name || ''}
                                            placeholder="Optional"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-sans"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Last Name</label>
                                        <input
                                            name="last_name"
                                            required
                                            defaultValue={editingDoctor?.last_name}
                                            placeholder="e.g. Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email ID</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            defaultValue={editingDoctor?.email}
                                            placeholder="doctor@example.com"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                                        <input
                                            name="phone_number"
                                            required
                                            defaultValue={editingDoctor?.phone_number}
                                            placeholder="+91..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Gender</label>
                                        <select
                                            name="gender"
                                            required
                                            defaultValue={editingDoctor?.gender || 'male'}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all bg-white"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Photo URL (Optional)</label>
                                        <input
                                            name="photo_url"
                                            defaultValue={editingDoctor?.photo_url || ''}
                                            placeholder="https://example.com/photo.jpg"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-3 space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Professional Bio (Optional)</label>
                                        <textarea
                                            name="bio"
                                            rows={3}
                                            defaultValue={editingDoctor?.bio || ''}
                                            placeholder="Describe the doctor's expertise and experience..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Professional Profile */}
                            <div>
                                <h3 className="text-lg font-bold text-[#0D5C63] mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-sm">02</span>
                                    Professional Profile
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Specialization</label>
                                        <input
                                            name="specialization"
                                            required
                                            defaultValue={editingDoctor?.specialization}
                                            placeholder="e.g. Cardiology"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Qualification</label>
                                        <input
                                            name="qualification"
                                            required
                                            defaultValue={editingDoctor?.qualification}
                                            placeholder="e.g. MBBS, MD"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Registration Number</label>
                                        <input
                                            name="registration_number"
                                            required
                                            defaultValue={editingDoctor?.registration_number}
                                            placeholder="e.g. REG-123456"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Experience (Years)</label>
                                        <input
                                            name="experience_years"
                                            type="number"
                                            required
                                            defaultValue={editingDoctor?.experience_years}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Practice Details */}
                            <div>
                                <h3 className="text-lg font-bold text-[#0D5C63] mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-sm">03</span>
                                    Practice Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Consultation Fee (INR)</label>
                                        <input
                                            name="consultation_fee"
                                            type="number"
                                            required
                                            step="0.01"
                                            defaultValue={editingDoctor?.consultation_fee}
                                            placeholder="500.00"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Department ID (Optional)</label>
                                        <input
                                            name="department_id"
                                            type="number"
                                            defaultValue={editingDoctor?.department_id || ''}
                                            placeholder="e.g. 1"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                                <p className="text-xs text-gray-400 italic">* Practitioner records are synchronized across the facility network upon submission.</p>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAddingNew(false);
                                            setEditingDoctor(null);
                                        }}
                                        className="px-8 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-[#0D5C63] hover:bg-[#084248] text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isSubmitting ? 'Processing...' : (editingDoctor ? 'Update Records' : 'Finalize Registration')}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="patient-dashboard">
            <header className="dashboard-header">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/hospital" className="text-gray-400 hover:text-teal-600 transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#0f766e]">
                            Medical Personnel
                        </h1>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setIsAddingNew(true);
                            setEditingDoctor(null);
                        }}
                        className="claim-btn submit px-6"
                    >
                        Register New Doctor
                    </button>
                </div>
            </header>

            <div className="content-card overflow-hidden mt-8">
                <div className="card-header pb-4 border-b border-gray-100 mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="card-title">Doctors Registry</h2>
                    </div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{staff.length} Assigned Doctors</span>
                </div>
                <div className="patients-list">
                    {staff.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 italic">No medical personnel records found for this facility.</div>
                    ) : (
                        staff.map((doc) => (
                            <div key={doc.id} className="patient-item relative mb-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded bg-teal-50 flex items-center justify-center text-teal-400 font-bold text-lg">
                                        {doc.first_name[0]}{doc.last_name[0]}
                                    </div>
                                    <div>
                                        <h3 className="patient-name text-black">Dr. {doc.first_name} {doc.last_name}</h3>
                                        <p className="patient-visit text-[10px] font-bold text-teal-600 uppercase tracking-widest">{doc.specialization} • {doc.experience_years} Years Exp.</p>
                                    </div>
                                </div>
                                <div className="flex gap-2" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                                    <button
                                        onClick={() => setEditingDoctor(doc)}
                                        className="px-4 py-1.5 bg-teal-50 text-teal-600 text-[10px] font-bold rounded-lg uppercase tracking-tight hover:bg-teal-100 transition-all font-sans"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="px-4 py-1.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-lg uppercase tracking-tight hover:bg-red-100 transition-all font-sans"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
