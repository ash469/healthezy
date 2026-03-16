"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { getDoctorSchedules, deleteDoctorSchedule, getCurrentDoctorId } from '@/services/doctor';
import type { DoctorSchedule } from '@/types/doctor';
import ScheduleFormModal from '@/components/dashboard/doctor/ScheduleFormModal';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function DoctorSchedulePage() {
    const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<DoctorSchedule | null>(null);
    const [activeDay, setActiveDay] = useState('Monday');

    const fetchSchedule = async () => {
        try {
            setLoading(true);
            const dId = await getCurrentDoctorId();
            if (dId) {
                const data = await getDoctorSchedules(dId);
                console.log("Fetched schedules:", data);
                setSchedules(data);
            } else {
                setError("Could not identify doctor record.");
            }
        } catch (err) {
            console.error("Error fetching schedule:", err);
            setError("Failed to load schedules.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this time slot?")) return;
        try {
            await deleteDoctorSchedule(id);
            setSchedules(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            console.error("Error deleting schedule:", err);
            alert("Failed to delete schedule.");
        }
    };

    // Filter slots for the active day
    const daySlots = useMemo(() => {
        return schedules.filter(s => {
            // Handle both 'day' (API) and 'day_of_week' (old frontend type)
            const day = s.day || s.day_of_week;
            return day && day.toLowerCase() === activeDay.toLowerCase();
        });
    }, [schedules, activeDay]);

    // Group slots by time of day (Morning: <12, Afternoon: 12-17, Evening: >17)
    const categorizedSlots = useMemo(() => {
        const morning: DoctorSchedule[] = [];
        const afternoon: DoctorSchedule[] = [];
        const evening: DoctorSchedule[] = [];

        daySlots.forEach(slot => {
            if (!slot.start_time) return;
            const hour = parseInt(slot.start_time.split(':')[0]);

            if (hour < 12) morning.push(slot);
            else if (hour < 17) afternoon.push(slot);
            else evening.push(slot);
        });

        // Sort by time
        const sortFn = (a: DoctorSchedule, b: DoctorSchedule) => a.start_time.localeCompare(b.start_time);
        return {
            morning: morning.sort(sortFn),
            afternoon: afternoon.sort(sortFn),
            evening: evening.sort(sortFn)
        };
    }, [daySlots]);

    const formatTime = (time: string) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    if (loading && schedules.length === 0) return <div className="p-8 text-center">Loading schedules...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 relative">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-teal-900">Weekly Schedule</h1>
                        <p className="text-gray-600">Manage your recurring availability</p>
                    </div>
                    <Link href="/dashboard/doctor" className="text-teal-700 hover:text-teal-900 font-medium">
                        Back to Dashboard
                    </Link>
                </div>

                {/* Day Navigation */}
                <div className="flex overflow-x-auto pb-4 gap-2 mb-6 scrollbar-hide">
                    {DAYS.map(day => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={`px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium ${activeDay === day
                                ? 'bg-teal-600 text-white shadow-lg shadow-teal-200'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Schedule Visualization */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[400px] p-6 relative">
                    {daySlots.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400">
                             <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p>No slots configured for {activeDay}.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-4 text-teal-600 hover:underline font-medium"
                            >
                                Add your first slot
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {categorizedSlots.morning.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-4 mb-4">
                                        <h3 className="text-xs font-bold text-teal-800 uppercase tracking-[0.2em]">
                                            Morning Sessions
                                        </h3>
                                        <div className="flex-1 h-px bg-teal-100"></div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                        {categorizedSlots.morning.map((slot, index) => (
                                            <div key={slot.schedule_id || slot.id || index} className="relative group bg-teal-50/50 border border-teal-100 rounded-xl p-3 flex flex-col items-center gap-3 transition-all hover:border-teal-300 hover:bg-white hover:shadow-md">
                                                <div className="text-teal-900 font-bold text-lg">
                                                    {formatTime(slot.start_time)}
                                                </div>
                                                <div className="flex gap-2 w-full justify-center">
                                                    <button
                                                        onClick={() => {
                                                            const id = slot.schedule_id || slot.id;
                                                            if (id) {
                                                                setSelectedSchedule(slot);
                                                                setIsModalOpen(true);
                                                            }
                                                        }}
                                                        className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                                        title="Edit Slot"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const id = slot.schedule_id || slot.id;
                                                            if (id) handleDelete(id);
                                                        }}
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Slot"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
 
                             {/* Afternoon Section */}
                             {categorizedSlots.afternoon.length > 0 && (
                                <section>
                                     <div className="flex items-center gap-4 mb-4">
                                        <h3 className="text-xs font-bold text-amber-800 uppercase tracking-[0.2em]">
                                            Afternoon Sessions
                                        </h3>
                                        <div className="flex-1 h-px bg-amber-100"></div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                        {categorizedSlots.afternoon.map((slot, index) => (
                                            <div key={slot.schedule_id || slot.id || index} className="relative group bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex flex-col items-center gap-3 transition-all hover:border-amber-300 hover:bg-white hover:shadow-md">
                                                <div className="text-amber-900 font-bold text-lg">
                                                    {formatTime(slot.start_time)}
                                                </div>
                                                <div className="flex gap-2 w-full justify-center">
                                                    <button
                                                        onClick={() => {
                                                            const id = slot.schedule_id || slot.id;
                                                            if (id) {
                                                                setSelectedSchedule(slot);
                                                                setIsModalOpen(true);
                                                            }
                                                        }}
                                                        className="p-1.5 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                                                        title="Edit Slot"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const id = slot.schedule_id || slot.id;
                                                            if (id) handleDelete(id);
                                                        }}
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Slot"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
 
                             {/* Evening Section */}
                             {categorizedSlots.evening.length > 0 && (
                                <section>
                                     <div className="flex items-center gap-4 mb-4">
                                        <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-[0.2em]">
                                            Evening Sessions
                                        </h3>
                                        <div className="flex-1 h-px bg-indigo-100"></div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                        {categorizedSlots.evening.map((slot, index) => (
                                            <div key={slot.schedule_id || slot.id || index} className="relative group bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 flex flex-col items-center gap-3 transition-all hover:border-indigo-300 hover:bg-white hover:shadow-md">
                                                <div className="text-indigo-900 font-bold text-lg">
                                                    {formatTime(slot.start_time)}
                                                </div>
                                                <div className="flex gap-2 w-full justify-center">
                                                    <button
                                                        onClick={() => {
                                                            const id = slot.schedule_id || slot.id;
                                                            if (id) {
                                                                setSelectedSchedule(slot);
                                                                setIsModalOpen(true);
                                                            }
                                                        }}
                                                        className="p-1.5 text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors"
                                                        title="Edit Slot"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const id = slot.schedule_id || slot.id;
                                                            if (id) handleDelete(id);
                                                        }}
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Slot"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </div>
 
             {/* Floating Action Button */}
             <button
                onClick={() => {
                    setSelectedSchedule(null); // Clear selection for new add
                    setIsModalOpen(true);
                }}
                className="fixed bottom-8 right-8 bg-teal-600 hover:bg-teal-700 text-white w-14 h-14 rounded-full shadow-lg shadow-teal-600/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-40"
                 title="Add Schedule"
             >
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                 </svg>
             </button>
 
             <ScheduleFormModal
                 isOpen={isModalOpen}
                 onClose={() => setIsModalOpen(false)}
                 onSuccess={(data) => {
                     setSchedules(data);
                     setSelectedSchedule(null);
                 }}
                 initialData={selectedSchedule}
                 defaultDay={activeDay}
             />
         </div >
    );
}
