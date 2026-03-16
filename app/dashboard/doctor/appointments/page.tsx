"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDoctorSpecificAppointments, getCurrentDoctorId, completeAppointment, invalidateAppointment, cancelAppointment } from '@/services/doctor';
import type { AppointmentDetailResponse } from '@/types/appointment';

export default function DoctorAppointmentsPage() {
    const [appointments, setAppointments] = useState<AppointmentDetailResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const doctorId = await getCurrentDoctorId();
            if (doctorId) {
                const data = await getDoctorSpecificAppointments(doctorId);
                setAppointments(data);
            } else {
                setError("Could not identify your doctor profile.");
            }
        } catch (err) {
            console.error("Error fetching appointments:", err);
            setError("Failed to load appointments.");
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (id: number) => {
        try {
            setUpdatingId(id);
            await completeAppointment(id);
            await fetchAppointments();
        } catch (err) {
            console.error("Error completing appointment:", err);
            alert("Failed to mark as completed.");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleInvalidate = async (id: number) => {
        if (!confirm("Invalidate this appointment?")) return;
        try {
            setUpdatingId(id);
            await invalidateAppointment(id);
            await fetchAppointments();
        } catch (err) {
            console.error("Error invalidating appointment:", err);
            alert("Failed to invalidate.");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleCancel = async (id: number) => {
        if (!confirm("Cancel this appointment?")) return;
        try {
            setUpdatingId(id);
            await cancelAppointment(id);
            await fetchAppointments();
        } catch (err) {
            console.error("Error cancelling appointment:", err);
            alert("Failed to cancel.");
        } finally {
            setUpdatingId(null);
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeStr: string) => {
        if (!timeStr) return 'N/A';
        const [hour, minute] = timeStr.split(':');
        const h = parseInt(hour, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minute} ${ampm}`;
    };

    if (loading && appointments.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-teal-900">Manage Appointments</h1>
                        <p className="text-gray-600">View and update status for your patients</p>
                    </div>
                    <Link href="/dashboard/doctor" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 font-medium transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow-sm">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 text-red-500">⚠️</div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-teal-50 border-b border-teal-100">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Patient</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Date & Time</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Type</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-teal-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {appointments.length > 0 ? (
                                    appointments.map((apt) => (
                                        <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900">
                                                    {apt.patient_name || `Patient #${apt.patient_id}`}
                                                </div>
                                                <div className="text-xs text-gray-500">ID: {apt.patient_id}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{formatDate(apt.appointment_date)}</div>
                                                <div className="text-sm font-semibold text-teal-700">{formatTime(apt.appointment_time)}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${apt.visit_type === 'Online' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {apt.visit_type}
                                                </span>
                                                <div className="text-xs text-gray-400 mt-1 capitalize">{apt.booking_type?.toLowerCase()}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                                                    apt.status === 'SCHEDULED' ? 'bg-amber-100 text-amber-800' :
                                                    apt.status === 'COMPLETE' ? 'bg-emerald-100 text-emerald-800' :
                                                    apt.status === 'INVALID' ? 'bg-rose-100 text-rose-800' :
                                                    apt.status === 'CANCELLED' ? 'bg-gray-100 text-gray-800' :
                                                    'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {apt.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {apt.status === 'SCHEDULED' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleComplete(apt.id)}
                                                                disabled={updatingId === apt.id}
                                                                className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                                Complete
                                                            </button>
                                                            <button
                                                                onClick={() => handleInvalidate(apt.id)}
                                                                disabled={updatingId === apt.id}
                                                                className="text-xs bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                                Invalidate
                                                            </button>
                                                            <button
                                                                onClick={() => handleCancel(apt.id)}
                                                                disabled={updatingId === apt.id}
                                                                className="text-xs bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-all active:scale-95 disabled:opacity-50"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
                                                    {updatingId === apt.id && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-3 h-3 border-2 border-teal-600/30 border-t-teal-600 rounded-full animate-spin"></div>
                                                            <span className="text-xs text-teal-700 font-medium">Updating...</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-lg font-medium">No appointments found</span>
                                                <p className="text-sm">You're all caught up! New appointments will appear here.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
