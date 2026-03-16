'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HospitalInfo } from '@/types/dashboard/hospital';
import { updateHospitalProfile } from '@/services/hospital';

interface EditHospitalModalProps {
    isOpen: boolean;
    onClose: () => void;
    hospitalInfo: HospitalInfo;
    onUpdate: () => void;
}

interface HospitalFormData {
    name: string;
    phone_number: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    latitude: number;
    longitude: number;
    type: string;
    description: string;
    website: string;
    emergency_number: string;
    total_beds: number;
    available_beds: number;
    logo_url: string;
}

export default function EditHospitalModal({ isOpen, onClose, hospitalInfo, onUpdate }: EditHospitalModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError
    } = useForm<HospitalFormData>({
        defaultValues: {
            name: '',
            phone_number: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
            latitude: 0,
            longitude: 0,
            type: '',
            description: '',
            website: '',
            emergency_number: '',
            total_beds: 0,
            available_beds: 0,
            logo_url: ''
        }
    });

    useEffect(() => {
        if (isOpen && hospitalInfo) {
            reset({
                name: hospitalInfo.name,
                phone_number: hospitalInfo.mobileNo,
                email: hospitalInfo.emailId,
                address: hospitalInfo.address,
                city: hospitalInfo.city || '',
                state: hospitalInfo.state || '',
                zip_code: hospitalInfo.zipCode || '',
                country: hospitalInfo.country || '',
                latitude: hospitalInfo.latitude || 0,
                longitude: hospitalInfo.longitude || 0,
                type: hospitalInfo.speciality,
                description: hospitalInfo.description || '',
                website: hospitalInfo.website || '',
                emergency_number: hospitalInfo.emergencyNumber || '',
                total_beds: hospitalInfo.totalBeds || 0,
                available_beds: hospitalInfo.availableBeds || 0,
                logo_url: hospitalInfo.logoUrl || ''
            });
        }
    }, [isOpen, hospitalInfo, reset]);

    const onSubmit = async (data: HospitalFormData) => {
        try {
            await updateHospitalProfile(hospitalInfo.hospitalCode, {
                name: data.name,
                phone_number: data.phone_number,
                email: data.email,
                address: data.address,
                city: data.city,
                state: data.state,
                zip_code: data.zip_code,
                country: data.country,
                latitude: Number(data.latitude),
                longitude: Number(data.longitude),
                type: data.type,
                description: data.description,
                website: data.website,
                emergency_number: data.emergency_number,
                total_beds: Number(data.total_beds),
                available_beds: Number(data.available_beds),
                logo_url: data.logo_url
            });
            onUpdate();
            onClose();
        } catch (err: any) {
            console.error("Failed to update hospital:", err);
            setError("root", {
                type: "manual",
                message: 'Failed to update profile. Please try again.'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#0f766e]">Edit Hospital Profile</h2>
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
                    {/* Basic Info Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('name', { required: 'Hospital name is required' })}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Speciality / Type</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('type')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                                <input
                                    type="url"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('logo_url')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                <input
                                    type="url"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('website')}
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                rows={3}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors resize-none"
                                {...register('description')}
                            />
                        </div>
                    </div>

                    {/* Contact Info Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Contact Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('phone_number', { required: 'Phone number is required' })}
                                />
                                {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Number</label>
                                <input
                                    type="tel"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('emergency_number')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('email', { required: 'Email is required' })}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Address Location Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Location & Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('address', { required: 'Address is required' })}
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('city')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('state')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('zip_code')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('country')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('latitude', { valueAsNumber: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('longitude', { valueAsNumber: true })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Capacity</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Beds</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('total_beds', { valueAsNumber: true })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Available Beds</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f766e] focus:border-transparent outline-none transition-colors"
                                    {...register('available_beds', { valueAsNumber: true })}
                                />
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
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
