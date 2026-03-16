'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getHospitalAppointments, getDoctorsInHospital, getMyHospitalAdmin, getCurrentHospitalId } from '@/services/hospital';
import { bookAppointment, updateAppointment, cancelAppointment } from '@/services/appointment';
import type { AppointmentDetailResponse } from '@/types/appointment';
import type { Doctor } from '@/types/doctor';
import type { Hospital } from '@/types/hospital';
import '@/app/dashboard.css';

export default function AppointmentRegistry() {
    const [appointments, setAppointments] = useState<AppointmentDetailResponse[]>([]);
    const [hospital, setHospital] = useState<Hospital | null>(null);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState({ status: '', date: '' });
    const [isCreating, setIsCreating] = useState(false);
    const [editingApt, setEditingApt] = useState<AppointmentDetailResponse | null>(null);
    const [selectedApt, setSelectedApt] = useState<AppointmentDetailResponse | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState('');

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const hospitalId = await getCurrentHospitalId();
            if (hospitalId) {
                const [hData, docData, aptData] = await Promise.all([
                    getMyHospitalAdmin(),
                    getDoctorsInHospital(hospitalId),
                    getHospitalAppointments(hospitalId)
                ]);
                setHospital(hData);
                setDoctors(docData || []);
                setAppointments(aptData || []);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = async (id: number) => {
        if (!confirm('Are you sure you want to cancel this appointment?')) return;
        try {
            await cancelAppointment(id);
            fetchData();
        } catch (err) {
            alert('Failed to cancel appointment.');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError('');
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            if (editingApt) {
                await updateAppointment(editingApt.id, {
                    appointment_date: data.appointment_date as string,
                    appointment_time: data.appointment_time as string,
                    notes: data.notes as string
                });
            } else {
                await bookAppointment({
                    patient_id: Number(data.patient_id),
                    doctor_id: Number(data.doctor_id),
                    hospital_id: hospital?.id || 0,
                    department_id: Number(data.department_id),
                    appointment_date: data.appointment_date as string,
                    appointment_time: data.appointment_time as string,
                    duration_minutes: Number(data.duration_minutes),
                    visit_type: data.visit_type as any,
                    booking_type: data.booking_type as any,
                    reason_for_visit: data.reason_for_visit as string,
                    notes: data.notes as string
                });
            }
            setIsCreating(false);
            setEditingApt(null);
            fetchData();
        } catch (err: any) {
            setFormError(err.response?.data?.detail || 'Failed to save appointment.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    const formatTime = (time: string) => {
        if (!time) return '--:--';
        return time.substring(0, 5);
    };

    if (isLoading && appointments.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    if (!hospital) return <div className="p-8 text-center text-red-600 font-bold uppercase tracking-widest">Unauthorized Access</div>;

    const filteredAppointments = appointments.filter(apt => {
        if (filter.status && apt.status !== filter.status) return false;
        if (filter.date && apt.appointment_date !== filter.date) return false;
        return true;
    });

    return (
        <div className="patient-dashboard bg-gray-50 min-h-screen">
            <header className="dashboard-header mb-8">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard/hospital" className="p-2 bg-white rounded-lg shadow-sm text-teal-600 hover:bg-teal-50 transition-all border border-teal-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f766e] tracking-tight">
                                Appointment Registry
                            </h1>
                            <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-black self-center mt-1">
                                {filteredAppointments.length} RECORD{filteredAppointments.length !== 1 ? 'S' : ''}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium mt-1">Management portal for hospital-wide patient encounters.</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-6 lg:mt-0">
                    <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-2 border-r border-gray-100 pr-4">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</label>
                            <select
                                value={filter.status}
                                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                className="bg-transparent text-sm font-bold text-teal-800 outline-none cursor-pointer focus:text-teal-600 transition-colors"
                            >
                                <option value="">All Streams</option>
                                <option value="SCHEDULED">Scheduled</option>
                                <option value="COMPLETE">Complete</option>
                                <option value="CANCELLED">Cancelled</option>
                                <option value="INVALID">Invalid</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2 pl-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">By Date</label>
                            <input 
                                type="date"
                                value={filter.date}
                                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                                className="bg-transparent text-sm font-bold text-teal-800 outline-none cursor-pointer focus:text-teal-600 transition-colors border-none p-0 w-32"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsCreating(true)}
                        className="bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-teal-600/20 hover:bg-teal-700 hover:shadow-teal-600/30 transition-all flex items-center gap-2 group"
                    >
                        <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>New Appointment</span>
                    </button>
                </div>
            </header>

            <div className="space-y-6">
                {(isCreating || editingApt) && (
                    <div className="fixed inset-0 bg-teal-900/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col scale-100 animate-in fade-in zoom-in duration-200">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-teal-50/50">
                                <div>
                                    <h2 className="text-xl font-black text-teal-900 tracking-tight">{editingApt ? 'Reschedule Appointment' : 'Book New Encounter'}</h2>
                                    <p className="text-[10px] text-teal-600 mt-0.5 uppercase tracking-widest font-black">Admin Access Control</p>
                                </div>
                                <button onClick={() => { setIsCreating(false); setEditingApt(null); }} className="p-2 text-gray-400 hover:text-rose-500 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto">
                                {formError && <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold uppercase rounded-xl border border-red-100 flex items-center gap-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {formError}
                                </div>}

                                {!editingApt && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Patient ID</label>
                                                <input name="patient_id" type="number" required placeholder="Enter ID" className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Practitioner</label>
                                                <select name="doctor_id" required className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none appearance-none cursor-pointer">
                                                    <option value="">Select Doctor</option>
                                                    {doctors.map(d => (
                                                        <option key={d.id} value={d.id}>Dr. {d.full_name || `${d.first_name} ${d.last_name}`} ({d.specialization})</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}

                {selectedApt && (
                    <div className="fixed inset-0 bg-teal-900/40 backdrop-blur-xl flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
                            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-teal-50/30">
                                <div>
                                    <h2 className="text-2xl font-black text-teal-900 leading-none">Appointment Intel</h2>
                                    <p className="text-[10px] text-teal-600 mt-2 uppercase tracking-[0.2em] font-black opacity-70">Confidential Medical Record</p>
                                </div>
                                <button onClick={() => setSelectedApt(null)} className="p-3 bg-white rounded-xl text-gray-400 hover:text-rose-500 shadow-sm transition-all hover:rotate-90">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            
                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Reference ID</p>
                                        <p className="font-mono text-sm font-bold bg-gray-50 p-3 rounded-xl border border-gray-100">{selectedApt.appointment_number}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Daily Token</p>
                                        <p className="text-2xl font-black text-teal-600 bg-teal-50/50 p-2 rounded-xl text-center border border-teal-100">{selectedApt.token_number}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#0f766e] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-teal-600/20">
                                            {selectedApt.patient_name?.[0] || 'P'}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Patient Identity</p>
                                            <p className="text-lg font-black text-gray-900">{selectedApt.patient_name || 'Anonymous'}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pl-16">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400">EMAIL</p>
                                            <p className="text-xs font-medium text-gray-600 truncate">{selectedApt.patient_email || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400">PHONE</p>
                                            <p className="text-xs font-medium text-gray-600">{selectedApt.patient_phone || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Assigned MD</p>
                                            <p className="text-sm font-bold text-gray-800">Dr. {selectedApt.doctor_name || 'TBD'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Stream Mode</p>
                                            <p className="text-sm font-black text-teal-600">{selectedApt.visit_type?.toUpperCase()} Encounter</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Reason for Visit</p>
                                        <p className="text-sm text-gray-600 font-medium leading-relaxed italic border-l-4 border-teal-500 pl-4 py-1">{selectedApt.reason_for_visit || 'No reason provided.'}</p>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-t border-gray-100 pt-4 mt-2">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Session Duration</p>
                                            <p className="text-sm font-bold text-gray-900">{selectedApt.duration_minutes || 0} Standard Minutes</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Timestamp</p>
                                            <p className="text-sm font-bold text-teal-700">{selectedApt.appointment_date} @ {formatTime(selectedApt.appointment_time)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button onClick={() => setSelectedApt(null)} className="bg-gray-900 text-white px-10 py-3.5 rounded-2xl font-bold text-sm shadow-xl hover:bg-black transition-all">
                                        Close Portal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Encounter Date</label>
                                        <input name="appointment_date" type="date" required defaultValue={editingApt?.appointment_date || ''} className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Encounter Time</label>
                                        <input name="appointment_time" type="time" required defaultValue={editingApt?.appointment_time || ''} className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Visit Type</label>
                                        <select name="visit_type" required className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none">
                                            <option value="Offline">In-Person</option>
                                            <option value="Online">Telemedicine</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Booking Nature</label>
                                        <select name="booking_type" required className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none">
                                            <option value="CHECKUP">General Checkup</option>
                                            <option value="Follow-Up">Follow-Up Session</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Duration (Mins)</label>
                                        <input name="duration_minutes" type="number" defaultValue={30} className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Clinical Notes</label>
                                        <input name="notes" placeholder="Optional internal notes" className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-2 mb-8">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Reason for Visit</label>
                                    <textarea name="reason_for_visit" required rows={2} defaultValue={editingApt?.reason_for_visit || ''} className="w-full px-4 py-3 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-teal-500 rounded-xl text-sm transition-all outline-none resize-none" />
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button type="button" onClick={() => { setIsCreating(false); setEditingApt(null); }} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Dismiss</button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-teal-600 text-white px-10 py-3 rounded-xl font-bold shadow-xl shadow-teal-600/20 hover:bg-teal-700 disabled:bg-gray-200 transition-all flex items-center gap-2"
                                    >
                                        {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                        {editingApt ? 'Update Slot' : 'Confirm Booking'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#f0fdfa] border-b border-teal-50">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Appointment ID / Token</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Patient Details</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Medical Staff</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Schedule</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-teal-800 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredAppointments.length > 0 ? filteredAppointments.map((apt) => (
                                    <tr key={apt.id} className="hover:bg-teal-50/20 transition-all group">
                                        <td className="px-6 py-5">
                                            <p className="font-mono text-xs font-bold text-gray-500">{apt.appointment_number}</p>
                                            <div className="mt-1 flex items-center gap-1.5">
                                                <span className="text-[10px] font-bold text-gray-400 tracking-wider">TOKEN</span>
                                                <span className="bg-teal-100 text-teal-700 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black">{apt.token_number}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="font-extrabold text-gray-900 group-hover:text-teal-700 transition-colors flex items-center gap-2">
                                                {apt.patient_name || 'Anonymous Patient'}
                                                {apt.visit_type === 'Online' && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" title="Online Consultation"></span>
                                                )}
                                            </p>
                                            <div className="flex flex-col mt-0.5">
                                                <span className="text-[11px] text-gray-500 font-medium">{apt.patient_email}</span>
                                                <span className="text-[10px] text-gray-400 font-bold tracking-tight">{apt.patient_phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-gray-800 font-bold leading-none">Dr. {apt.doctor_name || 'TBD'}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                                    apt.visit_type === 'Online' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                                                }`}>
                                                    {apt.visit_type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-teal-900 font-black text-[13px] tracking-tight">{apt.appointment_date}</p>
                                            <p className="text-teal-600 text-[11px] font-bold tracking-wider mt-0.5">{formatTime(apt.appointment_time)}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                                                apt.status === 'COMPLETE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                apt.status === 'CANCELLED' ? 'bg-gray-100 text-gray-500 border-gray-200' :
                                                apt.status === 'INVALID' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                <button
                                                    onClick={() => setSelectedApt(apt)}
                                                    className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => setEditingApt(apt)}
                                                    className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                    title="Reschedule"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                </button>
                                                {apt.status !== 'CANCELLED' && apt.status !== 'COMPLETE' && (
                                                    <button
                                                        onClick={() => handleCancel(apt.id)}
                                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <div className="p-4 bg-teal-50 rounded-full">
                                                    <svg className="w-10 h-10 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">No Active Encounters</p>
                                                <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed mx-auto italic font-medium">The encounter history is currently empty for the selected filters.</p>
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
