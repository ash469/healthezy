'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { validateUser } from '@/data/users';

const LoginPage = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [userType, setUserType] = useState<'user' | 'provider'>('user');
    const [providerRole, setProviderRole] = useState<'doctor' | 'hospital_admin' | 'lab_admin' | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Determine backend role string
            let backendRole = 'user';
            if (userType === 'provider') {
                if (providerRole === 'doctor') backendRole = 'doctor';
                else if (providerRole === 'hospital_admin') backendRole = 'hospital-admin';
                else if (providerRole === 'lab_admin') backendRole = 'lab-admin';
            }

            // Login using the auth service
            await login({
                email: formData.emailOrPhone,
                password: formData.password,
                role: backendRole as any
            });

            // Get user profile to determine redirect
            const { getCurrentUser } = await import('@/services/auth');
            const user = await getCurrentUser();

            // Redirect based on role using centralized resolver
            const { resolveDashboardPath } = await import('@/services/auth');
            const redirectPath = resolveDashboardPath(user.role || '');
            router.replace(redirectPath);
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.detail || 'Invalid email or password');
            setIsLoading(false);
        }
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
                            Login as a {userType === 'user' ? 'User' : 'Provider'}
                        </h2>
                        {/* Success Message from Signup */}
                        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('signup_success') === 'true' && (
                            <p className="text-emerald-400 font-bold mb-2">
                                Registration successful! Please login.
                            </p>
                        )}
                        <p className="text-sm md:text-base opacity-90">
                            Welcome back! Please enter your details to login.
                        </p>
                        {/* Toggle Icon Placeholder/Avatar */}
                        <div className="mt-4 flex justify-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                {userType === 'user' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Toggle Switch (Tabs) */}
                    <div className="flex justify-center mb-6 bg-white/10 p-1 rounded-full w-max mx-auto">
                        <button
                            onClick={() => {
                                setUserType('user');
                                setProviderRole(null);
                            }}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${userType === 'user' ? 'bg-white text-[#0D5C63] shadow-md' : 'text-white hover:bg-white/10'
                                }`}
                        >
                            User
                        </button>
                        <button
                            onClick={() => {
                                setUserType('provider');
                                setProviderRole('doctor'); // Default to Doctor
                            }}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${userType === 'provider' ? 'bg-white text-[#0D5C63] shadow-md' : 'text-white hover:bg-white/10'
                                }`}
                        >
                            Provider
                        </button>
                    </div>

                    {userType === 'provider' && (
                        <div className="flex justify-center gap-4 mb-8">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="providerRole"
                                    checked={providerRole === 'doctor'}
                                    onChange={() => setProviderRole('doctor')}
                                    className="hidden"
                                />
                                <div className={`px-8 py-3 rounded-full text-xs font-semibold border transition-all ${providerRole === 'doctor'
                                    ? 'bg-white text-[#0D5C63] border-white'
                                    : 'border-white/30 text-white/70 hover:border-white/50 hover:text-white'
                                    }`}>
                                    Doctor
                                </div>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="providerRole"
                                    checked={providerRole === 'hospital_admin'}
                                    onChange={() => setProviderRole('hospital_admin')}
                                    className="hidden"
                                />
                                <div className={`px-4 sm:px-8 py-3 rounded-full text-[10px] sm:text-xs font-semibold border transition-all ${providerRole === 'hospital_admin'
                                    ? 'bg-white text-[#0D5C63] border-white'
                                    : 'border-white/30 text-white/70 hover:border-white/50 hover:text-white'
                                    }`}>
                                    Hospital Admin
                                </div>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="providerRole"
                                    checked={providerRole === 'lab_admin'}
                                    onChange={() => setProviderRole('lab_admin')}
                                    className="hidden"
                                />
                                <div className={`px-4 sm:px-8 py-3 rounded-full text-[10px] sm:text-xs font-semibold border transition-all ${providerRole === 'lab_admin'
                                    ? 'bg-white text-[#0D5C63] border-white'
                                    : 'border-white/30 text-white/70 hover:border-white/50 hover:text-white'
                                    }`}>
                                    Lab Admin
                                </div>
                            </label>
                        </div>
                    )}

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

                        {/* <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-xs text-white hover:underline opacity-80">
                                Forgot Password?
                            </Link>
                        </div> */}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="pt-2 flex flex-col items-center space-y-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#084248] hover:bg-[#063338] text-white py-3 px-12 rounded-lg font-bold shadow-lg transition-transform hover:scale-105 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
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
