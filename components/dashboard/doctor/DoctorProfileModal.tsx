'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateDoctor } from '@/services/doctor';
import type { Doctor } from '@/types/doctor';

interface DoctorProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctor: Doctor | null;
    onSuccess: () => void;
}

interface DoctorProfileFormData {
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    gender: string;
    specialization: string
    registration_number: string;
    qualification: string;
    experience_years: number;
    consultation_fee: number;
    bio: string;
    address: string;
    photo_url: string;
}

export default function DoctorProfileModal({ isOpen, onClose, doctor, onSuccess }: DoctorProfileModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError
    } = useForm<DoctorProfileFormData>({
        defaultValues: {
            first_name: '',
            middle_name: '',
            last_name: '',
            phone_number: '',
            gender: '',
            specialization: '',
            qualification: '',
            experience_years: 0,
            consultation_fee: 0,
            bio: '',
            address: '',
            photo_url: ''
        }
    });

    useEffect(() => {
        if (isOpen && doctor) {
            reset({
                first_name: doctor.first_name || '',
                middle_name: doctor.middle_name || '',
                last_name: doctor.last_name || '',
                phone_number: doctor.phone_number || '',
                gender: doctor.gender || '',
                specialization: doctor.specialization || '',
                qualification: doctor.qualification || '',
                experience_years: doctor.experience_years || 0,
                consultation_fee: doctor.consultation_fee || 0,
                bio: doctor.bio || '',
                address: doctor.address || '',
                photo_url: doctor.photo_url || ''
            });
        }
    }, [isOpen, doctor, reset]);

    const onSubmit = async (data: DoctorProfileFormData) => {
        if (!doctor?.id) return;

        try {
            await updateDoctor(doctor.id, data);
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to update profile:", err);
            setError("root", {
                type: "manual",
                message: "Failed to update profile. Please check your information and try again."
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transform animate-in slide-in-from-bottom-8 duration-500 ease-out">
                {/* Header */}
                <div className="bg-[#0f766e] p-6 flex justify-between items-center text-white">
                    <div>
                        <h2 className="text-2xl font-bold">Edit Doctor Profile</h2>
                        <p className="text-teal-100 text-sm">Update your personal and professional information</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Body */}
                <div className="flex-1 overflow-y-auto p-8">
                    {errors.root && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded text-red-700 text-sm flex items-center gap-3">
                            <span>⚠️</span>
                            {errors.root.message}
                        </div>
                    )}

                    <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Section: Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('first_name', { required: 'First name is required' })}
                                    />
                                    {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Middle Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        {...register('middle_name')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('last_name', { required: 'Last name is required' })}
                                    />
                                    {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        {...register('phone_number')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                                    <select
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all px-4"
                                        {...register('gender')}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section: Professional Details */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Professional Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Specialization</label>
                                    <input
                                        type="text"
                                        className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${errors.specialization ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('specialization', { required: 'Specialization is required' })}
                                    />
                                    {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Qualification</label>
                                    <input
                                        type="text"
                                        className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${errors.qualification ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('qualification', { required: 'Qualification is required' })}
                                    />
                                    {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Experience (Years)</label>
                                    <input
                                        type="number"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        {...register('experience_years', { valueAsNumber: true })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Consultation Fee</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-500 font-bold">Rs. </span>
                                        <input
                                            type="number"
                                            className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                            {...register('consultation_fee', { valueAsNumber: true })}
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
                                    <textarea
                                        rows={3}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Describe your professional background..."
                                        {...register('bio')}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Additional Information */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                Additional Information
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Work Address / Clinic Location</label>
                                    <input
                                        type="text"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        {...register('address')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Photo URL</label>
                                    <input
                                        type="url"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        {...register('photo_url')}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Paste a valid image URL.</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-end gap-4 rounded-b-2xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-800 font-bold transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="profile-form"
                        disabled={isSubmitting}
                        className="px-10 py-2.5 bg-[#0f766e] hover:bg-[#115e59] text-white rounded-xl font-bold shadow-lg shadow-teal-900/20 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                    >
                        {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        {isSubmitting ? 'Saving Changes...' : 'Save Profile'}
                    </button>
                </div>
            </div>
        </div>
    );
}
