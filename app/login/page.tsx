'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LoginPage = () => {
    const [userType, setUserType] = useState<'patient' | 'provider'>('patient');

    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Logging in as ${userType}:`, formData);
        // TODO: Add API call here
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="hidden md:flex justify-center items-center">
                    <div className="relative w-full max-w-md aspect-square">
                        <div className="rounded-2xl w-full h-full flex items-center justify-center text-gray-400">
                            <Image src="/signup/login.png" alt="Login Illustration" fill className="object-contain" />
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="bg-[#0D5C63] rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            Login as a {userType === 'patient' ? 'Patient' : 'Provider'}
                        </h2>
                        <p className="text-sm md:text-base opacity-90">
                            Welcome back! Please enter your details to login.
                        </p>
                        {/* Toggle Icon Placeholder/Avatar */}
                        <div className="mt-4 flex justify-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Toggle Switch (Tabs) */}
                    <div className="flex justify-center mb-8 bg-white/10 p-1 rounded-full w-max mx-auto">
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-xs font-medium ml-1">Email or Mobile Number</label>
                            <input
                                type="text"
                                name="emailOrPhone"
                                value={formData.emailOrPhone}
                                onChange={handleChange}
                                placeholder="Enter your email or mobile number"
                                className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium ml-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#00A3B1]"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-xs text-white hover:underline opacity-80">
                                Forgot Password?
                            </Link>
                        </div>


                        <div className="pt-2 flex flex-col items-center space-y-4">
                            <button
                                type="submit"
                                className="bg-[#084248] hover:bg-[#063338] text-white py-3 px-12 rounded-lg font-bold shadow-lg transition-transform hover:scale-105 w-full md:w-auto"
                            >
                                Login
                            </button>
                            <p className="text-sm">
                                Don't have an account?{' '}
                                <Link href="/signup" className="font-bold underline text-white hover:text-gray-200">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
