'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Doctor } from '@/types/doctor';
import { createDoctor, updateDoctor } from '@/services/doctor';

interface DoctorFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctor?: Doctor | null;
    hospitalId: number;
    onSuccess: () => void;
}

interface DoctorFormData {
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    gender: string;
    specialization: string;
    qualification: string;
    registration_number: string;
    experience_years: number;
    consultation_fee: number;
    bio: string;
    address: string;
    photo_url: string;
    department_id: number;
}

export default function DoctorFormModal({ isOpen, onClose, doctor, hospitalId, onSuccess }: DoctorFormModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError
    } = useForm<DoctorFormData>({
        defaultValues: {
            first_name: '',
            middle_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            gender: '',
            specialization: '',
            qualification: '',
            registration_number: '',
            experience_years: 0,
            consultation_fee: 0,
            bio: '',
            address: '',
            photo_url: '',
            department_id: 1,
        }
    });

    useEffect(() => {
        if (isOpen) {
            if (doctor) {
                reset({
                    first_name: doctor.first_name || '',
                    middle_name: doctor.middle_name || '',
                    last_name: doctor.last_name || '',
                    email: doctor.email || '',
                    phone_number: doctor.phone_number || '',
                    gender: doctor.gender || '',
                    specialization: doctor.specialization || '',
                    qualification: doctor.qualification || '',
                    registration_number: doctor.registration_number || '',
                    experience_years: doctor.experience_years || 0,
                    consultation_fee: doctor.consultation_fee || 0,
                    bio: doctor.bio || '',
                    address: doctor.address || '',
                    photo_url: doctor.photo_url || '',
                    department_id: doctor.department_id || 1,
                });
            } else {
                reset({
                    first_name: '',
                    middle_name: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                    gender: '',
                    specialization: '',
                    qualification: '',
                    registration_number: '',
                    experience_years: 0,
                    consultation_fee: 0,
                    bio: '',
                    address: '',
                    photo_url: '',
                    department_id: 1,
                });
            }
        }
    }, [isOpen, doctor, reset]);

    const onSubmit = async (data: DoctorFormData) => {
        try {
            const payload = {
                ...data,
                experience_years: Number(data.experience_years),
                consultation_fee: Number(data.consultation_fee),
                hospital_id: hospitalId,
                department_id: Number(data.department_id)
            };

            if (doctor) {
                await updateDoctor(doctor.id, payload);
            } else {
                await createDoctor(payload);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error("Failed to save doctor:", err);
            setError("root", {
                type: "manual",
                message: err.response?.data?.message || 'Failed to save doctor details. Please try again.'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#0f766e]">
                        {doctor ? 'Edit Doctor' : 'Add New Doctor'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {errors.root && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {errors.root.message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('first_name', { required: 'First name is required' })}
                                />
                                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none"
                                    {...register('middle_name')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('last_name', { required: 'Last name is required' })}
                                />
                                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                                <select
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('gender', { required: 'Gender is required' })}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none resize-none"
                                    rows={1}
                                    {...register('bio')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Professional Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Professional Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none ${errors.specialization ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('specialization', { required: 'Specialization is required' })}
                                />
                                {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none ${errors.qualification ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('qualification', { required: 'Qualification is required' })}
                                />
                                {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Registration No. *</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none ${errors.registration_number ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('registration_number', { required: 'Registration number is required' })}
                                />
                                {errors.registration_number && <p className="text-red-500 text-xs mt-1">{errors.registration_number.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none"
                                    {...register('experience_years', { valueAsNumber: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee *</label>
                                <input
                                    type="number"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none ${errors.consultation_fee ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('consultation_fee', { required: 'Consultation fee is required', valueAsNumber: true })}
                                />
                                {errors.consultation_fee && <p className="text-red-500 text-xs mt-1">{errors.consultation_fee.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none"
                                    {...register('department_id', { valueAsNumber: true })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact & Other */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Contact & Other</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('email', { required: 'Email is required' })}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('phone_number', { required: 'Phone number is required' })}
                                />
                                {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none"
                                    {...register('address')}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                                <input
                                    type="url"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none"
                                    {...register('photo_url')}
                                />
                                <p className="text-xs text-gray-500 mt-1">Paste a direct link to the doctor's photo (e.g., from Imgur, Google Photos, or your hospital's asset server).</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-[#0f766e] rounded-lg hover:bg-[#0d6b63] transition-colors flex items-center gap-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : 'Save Doctor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
