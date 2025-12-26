'use client';

import { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import '@/components/doctors/SlotBooking.css';
import { getDoctorById } from '@/data/doctors';
import { getSlotsByDay } from '@/data/appointments';
import { categorizeTimeSlots, convertTo12Hour, getDayName } from '@/utils/timeSlots';

export default function SlotBookingPage() {
    const router = useRouter();
    const params = useParams();
    const doctorIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const doctorId = parseInt(doctorIdStr, 10);
    const doctor = getDoctorById(doctorId);

    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    // Initialize with a specific date or today
    const [currentDate, setCurrentDate] = useState(new Date('2025-11-25'));

    // Get slots for the current selected day
    const dayName = getDayName(currentDate);
    const daySlots = getSlotsByDay(doctorId, dayName);

    // Categorize time slots into morning, afternoon, evening
    const categorizedSlots = useMemo(() => {
        return categorizeTimeSlots(daySlots);
    }, [daySlots]);

    if (!doctor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
                <p className="text-gray-600 mb-4">The doctor you are looking for does not exist.</p>
                <button
                    onClick={() => router.push('/doctors')}
                    className="bg-[#0e8a93] text-white px-6 py-2 rounded-lg hover:bg-[#0b6c73] transition-colors"
                >
                    Back to Doctors
                </button>
            </div>
        );
    }

    const formatDate = (date: Date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayName = days[date.getDay()];
        const day = date.getDate().toString().padStart(2, '0');
        // date.getMonth() returns 0-11
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayName} | ${day} ${month} ${year}`;
    };

    const changeDate = (days: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        setCurrentDate(newDate);
    };

    const handleSlotClick = (slot: string) => {
        setSelectedSlot(slot);
    };

    const handleBook = () => {
        if (selectedSlot) {
            router.push(`/doctors/${params.id}/payment?slot=${selectedSlot}&date=${encodeURIComponent(formatDate(currentDate))}`);
        }
    };

    return (
        <div className="slot-booking-container">
            <div className="doctor-summary-card">
                <div className="doctor-summary-image">
                    <Image
                        src={doctor.photoUrl || '/doctor.png'}
                        alt={doctor.fullName || 'Doctor'}
                        width={130}
                        height={130}
                        className="object-cover"
                    />
                </div>
                <h2 className="doctor-summary-name">{doctor.fullName}</h2>
                <p className="doctor-summary-specialty">{doctor.specialization}</p>
                <p className="doctor-summary-hospital">{doctor.hospitalName}</p>
            </div>

            <div className="slot-picker-section">
                <div className="slot-header-row">
                    <h1 className="slot-picker-header">Pick Your Slot</h1>

                    <div className="date-navigator">
                        <button className="nav-btn" onClick={() => changeDate(-1)}>&lt;</button>
                        <span>{formatDate(currentDate)}</span>
                        <button className="nav-btn" onClick={() => changeDate(1)}>&gt;</button>
                    </div>
                </div>

                <div className="slot-group">
                    <h3 className="slot-group-title">Morning</h3>
                    <div className="slots-grid">
                        {categorizedSlots.morning.length > 0 ? (
                            categorizedSlots.morning.map(slot => (
                                <button
                                    key={slot.time}
                                    className={`time-slot ${selectedSlot === slot.time ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                                    onClick={() => slot.available && handleSlotClick(slot.time)}
                                    disabled={!slot.available}
                                >
                                    {convertTo12Hour(slot.time)}
                                </button>
                            ))
                        ) : (
                            <p className="no-slots">No morning slots available</p>
                        )}
                    </div>
                </div>

                <div className="slot-group">
                    <h3 className="slot-group-title">Afternoon</h3>
                    <div className="slots-grid">
                        {categorizedSlots.afternoon.length > 0 ? (
                            categorizedSlots.afternoon.map(slot => (
                                <button
                                    key={slot.time}
                                    className={`time-slot ${selectedSlot === slot.time ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                                    onClick={() => slot.available && handleSlotClick(slot.time)}
                                    disabled={!slot.available}
                                >
                                    {slot.available ? convertTo12Hour(slot.time) : 'N/A'}
                                </button>
                            ))
                        ) : (
                            <p className="no-slots">No afternoon slots available</p>
                        )}
                    </div>
                </div>

                <div className="slot-group">
                    <h3 className="slot-group-title">Evening</h3>
                    <div className="slots-grid">
                        {categorizedSlots.evening.length > 0 ? (
                            categorizedSlots.evening.map(slot => (
                                <button
                                    key={slot.time}
                                    className={`time-slot ${selectedSlot === slot.time ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                                    onClick={() => slot.available && handleSlotClick(slot.time)}
                                    disabled={!slot.available}
                                >
                                    {convertTo12Hour(slot.time)}
                                </button>
                            ))
                        ) : (
                            <p className="no-slots">No evening slots available</p>
                        )}
                    </div>
                </div>

                <button
                    className="book-appointment-btn"
                    disabled={!selectedSlot}
                    onClick={handleBook}
                >
                    Book Appointment
                </button>

            </div>
        </div>
    );
}
