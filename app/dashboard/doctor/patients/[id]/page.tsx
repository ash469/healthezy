"use client";

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { getPatientAppointmentHistory } from '@/services/doctor';
import type { AppointmentDetailResponse } from '@/types/appointment';

export default function PatientHistoryPage({ params }: { params: Promise<{ id: string }> }) {
    // Unrap params using React.use()
    const { id } = use(params);
    const patientId = parseInt(id);

    const [appointments, setAppointments] = useState<AppointmentDetailResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [patientName, setPatientName] = useState('Patient');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const data = await getPatientAppointmentHistory(patientId);
                setAppointments(data);

                // Extract patient name from the first appointment if available
                if (data.length > 0) {
                    setPatientName(data[0].patient_name || `Patient #${patientId}`);
                }
            } catch (err) {
                console.error("Error fetching history:", err);
            } finally {
                setLoading(false);
            }
        };

        if (patientId) {
            fetchHistory();
        }
    }, [patientId]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeStr: string) => {
        const [hour, minute] = timeStr.split(':');
        const h = parseInt(hour, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minute} ${ampm}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-teal-900">{patientName}</h1>
                        <p className="text-gray-600">Appointment History</p>
                    </div>
                    <Link href="/dashboard/doctor/patients" className="text-teal-700 hover:text-teal-900 font-medium flex items-center gap-2">
                        <span>←</span> Back to Patients
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading history...</p>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="text-4xl mb-4">📋</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No History Found</h3>
                        <p className="text-gray-500">No past appointments found for this patient.</p>
                    </div>
                ) : (
                    <div className="relative border-l-2 border-teal-200 ml-4 space-y-8 pl-8 py-4">
                        {appointments.map((apt) => (
                            <div key={apt.id} className="relative">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[41px] top-4 w-5 h-5 rounded-full bg-teal-600 border-4 border-white shadow-sm"></div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="font-bold text-lg text-gray-900">
                                                    {formatDate(apt.appointment_date)}
                                                </span>
                                                <span className="text-sm font-medium text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
                                                    {formatTime(apt.appointment_time)}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {apt.visit_type} • {apt.booking_type}
                                            </div>
                                        </div>
                                        <div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${apt.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                apt.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                {apt.status}
                                            </span>
                                        </div>
                                    </div>

                                    {apt.reason_for_visit && (
                                        <div className="mb-3">
                                            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Reason for Visit</h4>
                                            <p className="text-gray-700">{apt.reason_for_visit}</p>
                                        </div>
                                    )}

                                    {apt.notes && (
                                        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                                            <h4 className="text-xs font-semibold text-yellow-800 uppercase tracking-wider mb-1">Doctor's Notes</h4>
                                            <p className="text-yellow-900 text-sm italic">"{apt.notes}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
