'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { adminAuth } from '@/services/adminAuth';

export default function AdministrativeLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const params = useParams();
    const router = useRouter();
    const secret = params.secret as string;

    React.useEffect(() => {
        if (adminAuth.isAuthenticated()) {
            router.push(`/admin/${secret}/dashboard`);
        }
    }, [secret, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Using the specific login details requested by the user
            await adminAuth.login({
                email,
                password,
                role: 'admin'
            });
            router.push(`/admin/${secret}/dashboard`);
        } catch (err: any) {
            setError('Access Denied: Invalid administrative credentials.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[400px]">
                {/* Clean, Professional Header */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 rounded mb-4 shadow-sm">
                       <img src="/logo.png" alt="Healthezy" width={32} height={32} className="w-8 h-8 object-contain" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 uppercase"> Healthezy Admin Console</h1>
                </div>

                <div className="bg-white border border-gray-200 rounded-sm p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-[1px] focus:ring-gray-900 outline-none transition-all text-sm"
                                placeholder="admin@system.local"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Access Key</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-sm focus:border-gray-900 focus:ring-[1px] focus:ring-gray-900 outline-none transition-all text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 bg-gray-900 text-white font-bold text-[11px] uppercase tracking-[0.2em] rounded-sm hover:bg-gray-800 active:bg-black transition-colors disabled:opacity-50 mt-2 shadow-sm"
                        >
                            {isSubmitting ? 'Verifying...' : 'Sign In'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
