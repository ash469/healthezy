'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetDoctorPassword } from '@/services/doctor';

interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ResetPasswordFormData {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

export default function ResetPasswordModal({ isOpen, onClose }: ResetPasswordModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
        setError
    } = useForm<ResetPasswordFormData>({
        defaultValues: {
            old_password: '',
            new_password: '',
            confirm_password: ''
        }
    });

    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            await resetDoctorPassword({
                old_password: data.old_password,
                new_password: data.new_password
            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                reset();
                onClose();
            }, 2000);
        } catch (err: any) {
            console.error("Password reset error:", err);
            setError("root", {
                type: "manual",
                message: err.response?.data?.message || "Failed to reset password. Please check your old password."
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col transform animate-in slide-in-from-bottom-8 duration-500 ease-out">
                {/* Header */}
                <div className="bg-[#0f766e] p-6 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Reset Password</h2>
                        <p className="text-teal-100 text-xs">Security update for your account</p>
                    </div>
                    {!success && (
                        <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Form Body */}
                <div className="p-8">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Password Updated!</h3>
                            <p className="text-gray-600 italic">Closing modal...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {errors.root && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-sm flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                                    <span>⚠️</span>
                                    {errors.root.message}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${errors.old_password ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register('old_password', { required: 'Current password is required' })}
                                />
                                {errors.old_password && <p className="text-red-500 text-xs mt-1">{errors.old_password.message}</p>}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${errors.new_password ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Min 8 characters"
                                        {...register('new_password', {
                                            required: 'New password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'New password must be at least 8 characters long'
                                            }
                                        })}
                                    />
                                    {errors.new_password && <p className="text-red-500 text-xs mt-1">{errors.new_password.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${errors.confirm_password ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('confirm_password', {
                                            required: 'Please confirm your new password',
                                            validate: (val) => {
                                                if (watch('new_password') != val) {
                                                    return "New passwords do not match";
                                                }
                                            }
                                        })}
                                    />
                                    {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-[#0f766e] hover:bg-[#115e59] text-white rounded-xl font-bold shadow-lg shadow-teal-900/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                                >
                                    {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                    {isSubmitting ? 'Processing...' : 'Reset Password'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full py-3 text-gray-500 hover:text-gray-700 font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
