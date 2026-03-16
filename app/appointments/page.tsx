'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getMyAppointments, cancelAppointment } from '@/services/appointment';
import { getDoctorById } from '@/services/doctor';
import { getPatientById } from '@/services/patient';
import type { Patient } from '@/types/patient';
import type { AppointmentResponse } from '@/types/appointment';
import type { Doctor } from '@/types/doctor';

export default function MyAppointmentsPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
    const [doctors, setDoctors] = useState<Record<number, Doctor>>({});
    const [patients, setPatients] = useState<Record<number, Patient>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState<string>('all');

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            fetchAppointments();
        } else if (!authLoading && !isAuthenticated) {
            setLoading(false);
        }
    }, [authLoading, isAuthenticated]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const data = await getMyAppointments();
            // Sort by date and time descending (latest first)
            const sortedData = data.sort((a, b) => {
                const dateA = new Date(`${a.appointment_date}T${a.appointment_time}`);
                const dateB = new Date(`${b.appointment_date}T${b.appointment_time}`);
                return dateB.getTime() - dateA.getTime();
            });
            setAppointments(sortedData);
            await fetchAppointmentDetails(sortedData);
        } catch (err: any) {
            console.error('Error fetching appointments:', err);
            setError(err.response?.data?.detail || 'Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    const fetchAppointmentDetails = async (appointments: AppointmentResponse[]) => {
        const doctorIds = new Set(appointments.map(a => a.doctor_id).filter((id): id is number => !!id));
        const patientIds = new Set(appointments.map(a => a.patient_id).filter((id): id is number => !!id));

        const fetchDoctors = Promise.all(
            Array.from(doctorIds).map(async (id) => {
                const doc = await getDoctorById(id);
                return { id, data: doc };
            })
        );

        const fetchPatients = Promise.all(
            Array.from(patientIds).map(async (id) => {
                try {
                    const patient = await getPatientById(id);
                    return { id, data: patient };
                } catch (e) {
                    console.error(`Failed to fetch patient ${id}`, e);
                    return { id, data: null };
                }
            })
        );

        const [doctorsResults, patientsResults] = await Promise.all([fetchDoctors, fetchPatients]);

        const newDoctors: Record<number, Doctor> = {};
        doctorsResults.forEach(({ id, data }) => {
            if (data) newDoctors[id] = data;
        });

        const newPatients: Record<number, Patient> = {};
        patientsResults.forEach(({ id, data }) => {
            if (data) newPatients[id] = data;
        });

        setDoctors(newDoctors);
        setPatients(newPatients);
    };

    const handleCancel = async (appointmentId: number, patientId: number) => {
        if (!confirm('Are you sure you want to cancel this appointment? This action cannot be undone.')) {
            return;
        }

        try {
            // Optimistically update UI or show loading
            await cancelAppointment(appointmentId, patientId);
            alert('Appointment cancelled successfully');
            // Refresh list
            fetchAppointments();
        } catch (err: any) {
            console.error('Error cancelling appointment:', err);
            alert(err.response?.data?.detail || 'Failed to cancel appointment');
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            'Confirmed': 'bg-green-100 text-green-800',
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Cancelled': 'bg-red-100 text-red-800',
            'Completed': 'bg-blue-100 text-blue-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-teal-600 text-lg">Loading appointments...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
                    <p className="text-gray-600 mb-6">You need to be logged in to view your appointments</p>
                    <a href="/login" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700">
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }


    // ... (existing code)

    const uniquePatients = Array.from(new Set(appointments.map(a => a.patient_id)))
        .map(id => patients[id])
        .filter(Boolean);

    const filteredAppointments = selectedPatientId === 'all'
        ? appointments
        : appointments.filter(a => a.patient_id.toString() === selectedPatientId);

    // ... (existing code)

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
                        <p className="text-gray-600 text-sm">View and manage your upcoming appointments</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={selectedPatientId}
                            onChange={(e) => setSelectedPatientId(e.target.value)}
                            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5"
                        >
                            <option value="all">All Patients</option>
                            {uniquePatients.map(patient => (
                                <option key={patient.id} value={patient.id.toString()}>
                                    {patient.full_name}
                                </option>
                            ))}
                        </select>
                        <a href="/dashboard/patient" className="text-teal-600 hover:text-teal-800 font-medium text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </a>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {filteredAppointments.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No Appointments Found</h3>
                        <p className="text-gray-500 mb-4 text-sm">
                            {selectedPatientId === 'all'
                                ? "You haven't booked any appointments yet"
                                : "No appointments found for the selected patient"}
                        </p>
                        {selectedPatientId === 'all' && (
                            <a href="/doctors" className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-700 inline-block text-sm">
                                Find a Doctor
                            </a>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredAppointments.map((appointment) => (
                            <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {appointment.doctor_id && doctors[appointment.doctor_id]
                                                ? `Dr. ${doctors[appointment.doctor_id].full_name}`
                                                : `Doctor ID: ${appointment.doctor_id || 'N/A'}`}
                                        </h3>
                                        <div className="text-sm text-gray-600">
                                            Patient: {patients[appointment.patient_id]
                                                ? patients[appointment.patient_id].full_name
                                                : `ID: ${appointment.patient_id}`}
                                        </div>
                                    </div>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                                        {appointment.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                                    <div className="flex items-center">
                                        <svg className="h-4 w-4 mr-1.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-medium">{formatDate(appointment.appointment_date)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="h-4 w-4 mr-1.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-medium">{formatTime(appointment.appointment_time)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-1">Duration:</span>
                                        <span>{appointment.duration_minutes}m</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-1">Type:</span>
                                        <span>{appointment.visit_type}</span>
                                    </div>
                                </div>

                                {(appointment.reason_for_visit) && (
                                    <div className="mb-3 text-sm">
                                        <span className="text-gray-500 mr-1">Reason:</span>
                                        <span className="text-gray-800">{appointment.reason_for_visit}</span>
                                    </div>
                                )}

                                <div className="flex justify-end pt-2 border-t border-gray-100">
                                    <button
                                        onClick={() => handleCancel(appointment.id, appointment.patient_id)}
                                        className="text-red-600 hover:text-red-800 text-xs font-medium hover:underline"
                                    >
                                        Cancel Appointment
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
