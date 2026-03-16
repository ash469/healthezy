import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createDoctorSchedule, updateDoctorSchedule, getCurrentDoctorId, getDoctorSchedules } from '@/services/doctor';
import type { DoctorSchedule } from '@/types/doctor';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface ScheduleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (schedules: DoctorSchedule[]) => void;
    initialData?: DoctorSchedule | null;
    defaultDay?: string;
}

interface ScheduleFormData {
    day_of_week: string;
    start_time: string;
    slot_duration: number;
    max_patients_per_slot: number;
    buffer_time_minutes: number;
    is_available: boolean;
}

export default function ScheduleFormModal({ isOpen, onClose, onSuccess, initialData, defaultDay }: ScheduleFormModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ScheduleFormData>({
        defaultValues: {
            day_of_week: 'Monday',
            start_time: '09:00',
            slot_duration: 30,
            max_patients_per_slot: 1,
            buffer_time_minutes: 0,
            is_available: true
        }
    });

    useEffect(() => {
        if (isOpen && initialData) {
            reset({
                day_of_week: initialData.day || initialData.day_of_week || 'Monday',
                start_time: initialData.start_time ? initialData.start_time.substring(0, 5) : '09:00',
                slot_duration: initialData.slot_duration || 30,
                max_patients_per_slot: initialData.max_patients || initialData.max_patients_per_slot || 1,
                buffer_time_minutes: initialData.buffer_time_minutes || 0,
                is_available: initialData.is_available !== undefined ? initialData.is_available : true
            });
        } else if (isOpen) {
            // Reset to defaults when opening for "Add New"
            reset({
                day_of_week: defaultDay || 'Monday',
                start_time: '09:00',
                slot_duration: 30,
                max_patients_per_slot: 1,
                buffer_time_minutes: 0,
                is_available: true
            });
        }
    }, [isOpen, initialData, defaultDay, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data: ScheduleFormData) => {
        try {
            const doctorId = await getCurrentDoctorId();
            if (!doctorId) {
                alert("Could not identify doctor profile.");
                return;
            }

            // Common payload fields
            const payloadData = {
                day: data.day_of_week.toLowerCase(),
                start_time: data.start_time.length === 5 ? `${data.start_time}:00` : data.start_time,
                slot_duration: data.slot_duration,
                max_patients: data.max_patients_per_slot,
                buffer_time_minutes: data.buffer_time_minutes,
                is_available: data.is_available
            };

            if (initialData && (initialData.schedule_id || initialData.id)) {
                // Update existing
                const idToUpdate = initialData.schedule_id || initialData.id;
                if (idToUpdate) await updateDoctorSchedule(idToUpdate, payloadData);
            } else {
                // Create new
                await createDoctorSchedule([payloadData]);
            }

            // Refresh to get updated list
            const updatedSchedules = await getDoctorSchedules(doctorId);
            onSuccess(updatedSchedules);
            onClose();
        } catch (err) {
            console.error("Error saving schedule:", err);
            alert("Failed to save schedule. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col transform animate-in slide-in-from-bottom-8 duration-500 ease-out">
                <div className="bg-[#0f766e] p-6 text-white">
                    <h2 className="text-xl font-bold">{initialData ? 'Edit Working Hours' : 'Add Working Hours'}</h2>
                    <p className="text-teal-100 text-sm">Set your recurring weekly schedule</p>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Day of Week</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                {...register('day_of_week', { required: true })}
                            >
                                {DAYS.map(day => <option key={day} value={day}>{day}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                            <input
                                type="time"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                {...register('start_time', { required: true })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-xs">Slot Duration (min)</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    {...register('slot_duration', { required: true, min: 5, valueAsNumber: true })}
                                />
                                {errors.slot_duration && <span className="text-red-500 text-xs">Min 5 mins</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-xs">Patients / Slot</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    {...register('max_patients_per_slot', { required: true, min: 1, valueAsNumber: true })}
                                />
                                {errors.max_patients_per_slot && <span className="text-red-500 text-xs">Min 1 patient</span>}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (initialData ? 'Update Schedule' : 'Add Schedule')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
