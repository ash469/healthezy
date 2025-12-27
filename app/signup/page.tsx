'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const SignupContent = () => {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get('type');
    const [userType, setUserType] = useState<'patient' | 'provider'>(
        typeParam === 'provider' ? 'provider' : 'patient'
    );

    // Patient Form State
    const [patientFormData, setPatientFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        city: '',
        password: '',
        confirmPassword: '',
    });

    // Provider Form State
    const [providerFormData, setProviderFormData] = useState({
        providerType: '',
        businessName: '',
        officialEmail: '',
        contactNo: '',
        licenseNo: '',
        password: '',
        confirmPassword: '',
    });

    const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPatientFormData({ ...patientFormData, [e.target.name]: e.target.value });
    };

    const handleProviderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProviderFormData({ ...providerFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting as:', userType);
        if (userType === 'patient') {
            console.log('Patient Data:', patientFormData);
        } else {
            console.log('Provider Data:', providerFormData);
        }
        // Add API call here
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Illustration */}
                <div className="hidden md:flex justify-center items-center">
                    <div className="relative w-full max-w-md aspect-square">
                        <div className="rounded-2xl w-full h-full flex items-center justify-center text-gray-400">
                            <Image src="/signup/signup.png" alt="Sign Up Illustration" fill className="object-contain" />
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="bg-[#0D5C63] rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            Sign Up as a {userType === 'patient' ? 'Patient' : 'Provider'}
                        </h2>
                        <p className="text-sm md:text-base opacity-90">
                            {userType === 'patient'
                                ? 'Join Healthezy to connect with doctors, labs, and pharmacies near you.'
                                : 'Register your clinic, lab, pharmacy, or e-commerce brand with Healthezy.'}
                        </p>

                        {/* Toggle Icon Placeholder/Avatar */}
                        <div className="mt-4 flex justify-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Toggle Switch (Tabs) */}
                    <div className="flex justify-center mb-6 bg-white/10 p-1 rounded-full w-max mx-auto">
                        <button
                            onClick={() => setUserType('patient')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${userType === 'patient' ? 'bg-white text-[#0D5C63] shadow-md' : 'text-white hover:bg-white/10'
                                }`}
                        >
                            Patient
                        </button>
                        <button
                            onClick={() => setUserType('provider')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${userType === 'provider' ? 'bg-white text-[#0D5C63] shadow-md' : 'text-white hover:bg-white/10'
                                }`}
                        >
                            Provider
                        </button>
                    </div>


                    <form onSubmit={handleSubmit} className="space-y-4">
                        {userType === 'patient' ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium ml-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={patientFormData.firstName}
                                            onChange={handlePatientChange}
                                            className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={patientFormData.lastName}
                                            onChange={handlePatientChange}
                                            className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={patientFormData.mobileNumber}
                                        onChange={handlePatientChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">E-Mail ID</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={patientFormData.email}
                                        onChange={handlePatientChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">City/ Location</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={patientFormData.city}
                                        onChange={handlePatientChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={patientFormData.password}
                                        onChange={handlePatientChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={patientFormData.confirmPassword}
                                        onChange={handlePatientChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Provider Type</label>
                                    <select
                                        name="providerType"
                                        value={providerFormData.providerType}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    >
                                        <option value="">Select Your Profession</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Lab">Lab</option>
                                        <option value="Pharmacy Store">Pharmacy Store</option>
                                        <option value="Hospital / Clinic">Hospital / Clinic</option>
                                        <option value="E-Commerce Brand">E-Commerce Brand</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Business / Clinic Name</label>
                                    <input
                                        type="text"
                                        name="businessName"
                                        value={providerFormData.businessName}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Official E-Mail</label>
                                    <input
                                        type="email"
                                        name="officialEmail"
                                        value={providerFormData.officialEmail}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Contact No.</label>
                                    <input
                                        type="tel"
                                        name="contactNo"
                                        value={providerFormData.contactNo}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Certifications/License No.</label>
                                    <input
                                        type="text"
                                        name="licenseNo"
                                        value={providerFormData.licenseNo}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={providerFormData.password}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={providerFormData.confirmPassword}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                            </>
                        )}
                        <div className="pt-4 flex flex-col items-center space-y-3">
                            <button
                                type="submit"
                                className="bg-[#084248] hover:bg-[#063338] text-white py-3 px-10 rounded-lg font-bold shadow-lg transition-transform hover:scale-105"
                            >
                                {userType === 'patient' ? 'Signup' : 'Register User'}
                            </button>
                            <p className="text-sm">
                                Already Have an Account ?{' '}
                                <Link href="/login" className="font-bold underline text-white hover:text-gray-200">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const SignupPoint = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupContent />
        </Suspense>
    );
};

export default SignupPoint;
