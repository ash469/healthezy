'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const SignupContent = () => {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get('type');
    const [userType, setUserType] = useState<'user' | 'provider'>(
        typeParam === 'provider' ? 'provider' : 'user'
    );

    // User Form State
    const [userFormData, setUserFormData] = useState({
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
        providerType: 'hospital', // 'hospital' or 'lab'
        firstName: '',
        lastName: '',
        email: '',
        contactNo: '',
        password: '',
        confirmPassword: '',
    });

    const { signup } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    };

    const handleProviderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProviderFormData({ ...providerFormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (userType === 'user') {
                if (userFormData.password !== userFormData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                await signup({
                    email: userFormData.email,
                    phone_number: userFormData.mobileNumber,
                    first_name: userFormData.firstName,
                    last_name: userFormData.lastName,
                    password: userFormData.password,
                    role: 'user'
                });
                window.location.href = '/login?signup_success=true';
            } else {
                if (providerFormData.password !== providerFormData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }

                const role = providerFormData.providerType === 'hospital' ? 'hospital-admin' : 'lab-admin';

                await signup({
                    email: providerFormData.email,
                    phone_number: providerFormData.contactNo,
                    first_name: providerFormData.firstName,
                    last_name: providerFormData.lastName,
                    password: providerFormData.password,
                    role: role
                });

                // Step 1 Complete: Just go to login as per simplified instructions
                window.location.href = '/login?signup_success=true';
            }
        } catch (err: any) {
            console.error('Signup error:', err);
            setError(err.response?.data?.detail || err.message || 'Registration failed');
            setIsLoading(false);
        }
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
                            Sign Up as a {userType === 'user' ? 'User' : 'Provider'}
                        </h2>
                        <p className="text-sm md:text-base opacity-90">
                            {userType === 'user'
                                ? 'Join Healthezy to connect with hospitals, clinics, labs, and pharmacies near you.'
                                : 'Create your admin account to register your facility.'}
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
                            onClick={() => setUserType('user')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${userType === 'user' ? 'bg-white text-[#0D5C63] shadow-md' : 'text-white hover:bg-white/10'
                                }`}
                        >
                            User
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
                        {userType === 'user' ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium ml-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={userFormData.firstName}
                                            onChange={handleUserChange}
                                            className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={userFormData.lastName}
                                            onChange={handleUserChange}
                                            className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobileNumber"
                                        value={userFormData.mobileNumber}
                                        onChange={handleUserChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">E-Mail ID</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userFormData.email}
                                        onChange={handleUserChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">City/ Location</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={userFormData.city}
                                        onChange={handleUserChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={userFormData.password}
                                        onChange={handleUserChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={userFormData.confirmPassword}
                                        onChange={handleUserChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                        required
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Provider Category</label>
                                    <select
                                        name="providerType"
                                        value={providerFormData.providerType}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                    >
                                        <option value="hospital">Hospital / Clinic</option>
                                        <option value="lab">Laboratory</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium ml-1">Admin First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={providerFormData.firstName}
                                            onChange={handleProviderChange}
                                            className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium ml-1">Admin Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={providerFormData.lastName}
                                            onChange={handleProviderChange}
                                            className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Admin E-Mail</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={providerFormData.email}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Admin Contact No.</label>
                                    <input
                                        type="tel"
                                        name="contactNo"
                                        value={providerFormData.contactNo}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium ml-1">Set Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={providerFormData.password}
                                        onChange={handleProviderChange}
                                        className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                                        required
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
                                        required
                                    />
                                </div>
                                <div className="bg-white/10 p-3 rounded-lg mt-2">
                                    <p className="text-[10px] italic opacity-80 leading-tight">
                                        * Note: This creates your administrative account. You will register your facility details in the next step.
                                    </p>
                                </div>
                            </>
                        )}
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="pt-4 flex flex-col items-center space-y-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#084248] hover:bg-[#063338] text-white py-3 px-10 rounded-lg font-bold shadow-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Processing...' : (userType === 'user' ? 'Sign Up' : 'Continue to Application')}
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
