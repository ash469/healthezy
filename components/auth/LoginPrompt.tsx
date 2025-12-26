'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginPromptProps {
    message?: string;
    onClose?: () => void;
}

export default function LoginPrompt({
    message = "Please login to continue with your payment",
    onClose
}: LoginPromptProps) {
    const router = useRouter();

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            router.back();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 156, 166, 0.15) 0%, rgba(0, 0, 0, 0.7) 100%)',
                backdropFilter: 'blur(8px)'
            }}
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute w-96 h-96 rounded-full opacity-20 animate-pulse"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 156, 166, 0.4) 0%, transparent 70%)',
                        top: '10%',
                        left: '10%'
                    }}
                />
                <div
                    className="absolute w-80 h-80 rounded-full opacity-20 animate-pulse"
                    style={{
                        background: 'radial-gradient(circle, rgba(13, 92, 99, 0.4) 0%, transparent 70%)',
                        bottom: '10%',
                        right: '10%',
                        animationDelay: '1s'
                    }}
                />
            </div>

            {/* Main Card */}
            <div className="relative w-full max-w-md">
                {/* Glassmorphic Card */}
                <div
                    className="rounded-3xl overflow-hidden shadow-2xl"
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px 0 rgba(0, 156, 166, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                    }}
                >
                    {/* Header with Gradient */}
                    <div className="relative p-8 overflow-hidden" style={{
                        background: 'linear-gradient(135deg, #009ca6 0%, #0D5C63 100%)'
                    }}>
                        {/* Floating decorative elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90 group"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6 group-hover:scale-110 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Logo and Title */}
                        <div className="relative z-10 flex flex-col items-center text-white">
                            {/* Animated Logo Container */}
                            <div className="relative mb-5">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
                                <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md border-2 border-white/40 shadow-2xl">
                                    <Image
                                        src="/logo.png"
                                        alt="Healthezy"
                                        width={56}
                                        height={56}
                                        className="w-14 h-14 object-contain"
                                    />
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mb-2 tracking-tight">Authentication Required</h2>
                            <p className="text-white/90 text-sm font-medium">Secure your appointment with us</p>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 bg-gradient-to-b from-white/50 to-white">
                        {/* Icon and Message */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#009ca6]/20 to-[#0D5C63]/20 rounded-2xl mb-5 relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#009ca6] to-[#0D5C63] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#009ca6" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <p className="text-gray-800 text-lg font-semibold leading-relaxed mb-2">
                                {message}
                            </p>
                            <p className="text-gray-600 text-sm">
                                Sign in to access payment and complete your booking
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/login"
                                className="group relative w-full h-14 bg-gradient-to-r from-[#009ca6] to-[#0D5C63] text-white flex items-center justify-center rounded-2xl font-bold text-base shadow-lg shadow-[#009ca6]/30 hover:shadow-2xl hover:shadow-[#009ca6]/50 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                <span className="relative z-10">Log In to Continue</span>
                            </Link>

                            <Link
                                href="/signup"
                                className="group relative w-full h-14 bg-white border-2 border-[#009ca6] text-[#009ca6] flex items-center justify-center rounded-2xl font-bold text-base hover:bg-gradient-to-r hover:from-[#009ca6]/5 hover:to-[#0D5C63]/5 transition-all duration-300 overflow-hidden"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                </svg>
                                <span className="relative z-10">Create New Account</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}