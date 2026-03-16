'use client';

import React from 'react';
import { AppointmentDetailResponse } from '@/types/appointment';

interface AppointmentDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: AppointmentDetailResponse | null;
}

export default function AppointmentDetailsModal({ isOpen, onClose, appointment }: AppointmentDetailsModalProps) {
    if (!isOpen || !appointment) return null;

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeStr: string) => {
        if (!timeStr) return 'N/A';
        // Handle "HH:MM:SS" or "HH:MM"
        const parts = timeStr.split(':');
        const hour = parseInt(parts[0], 10);
        const minute = parts[1];
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute} ${ampm}`;
    };

    const getStatusColor = (status: string) => {
        const s = status?.toUpperCase();
        if (s === 'CONFIRMED' || s === 'SCHEDULED') return 'bg-green-100 text-green-800';
        if (s === 'PENDING') return 'bg-yellow-100 text-yellow-800';
        if (s === 'CANCELLED') return 'bg-red-100 text-red-800';
        if (s === 'COMPLETED') return 'bg-blue-100 text-blue-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-[#0f766e]">Appointment Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 bg-teal-50 p-4 rounded-lg border border-teal-100">
                        <div>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Appointment ID</p>
                            <p className="text-lg font-bold text-gray-800">#{appointment.appointment_number}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Token Number</p>
                            <p className="text-lg font-bold text-teal-700">#{appointment.token_number}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                            </span>
                        </div>
                    </div>

                    {/* Patient & Doctor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-500">Patient Name</label>
                            <div className="text-lg font-semibold text-gray-800">{appointment.patient_name || `Patient #${appointment.patient_id}`}</div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-500">Doctor Name</label>
                            <div className="text-lg font-semibold text-gray-800">{appointment.doctor_name || `Doctor #${appointment.doctor_id}`}</div>
                        </div>
                    </div>

                    {/* Checkup Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-500">Date & Time</label>
                            <div className="text-gray-800 font-medium flex items-center gap-2">
                                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(appointment.appointment_date)} at {formatTime(appointment.appointment_time)}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-500">Checkup Type</label>
                            <div className="text-gray-800 font-medium">
                                <span className="bg-gray-100 px-2 py-1 rounded text-sm mr-2">{appointment.visit_type}</span>
                                <span className="bg-gray-100 px-2 py-1 rounded text-sm">{appointment.booking_type}</span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500 block mb-1">Reason for Visit</label>
                            <p className="text-gray-800 italic">{appointment.reason_for_visit || 'No reason provided.'}</p>
                        </div>

                        {appointment.notes && (
                            <div>
                                <label className="text-sm font-medium text-gray-500 block mb-1">Notes</label>
                                <p className="text-gray-800">{appointment.notes}</p>
                            </div>
                        )}

                        <div className="text-xs text-gray-400 pt-2 border-t border-gray-200 flex justify-between">
                            <span>Created: {new Date(appointment.created_at).toLocaleString()}</span>
                            <span>Duration: {appointment.duration_minutes} mins</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
