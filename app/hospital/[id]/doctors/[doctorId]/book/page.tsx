'use client';

import { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import '@/components/doctors/SlotBooking.css';
import { getHospitalById } from '@/data/hospitals';
import { getDoctorById } from '@/data/doctors';
import { getSlotsByDay } from '@/data/appointments';
import { categorizeTimeSlots, convertTo12Hour, getDayName } from '@/utils/timeSlots';

export default function HospitalSlotBookingPage() {
    const router = useRouter();
    const params = useParams();
    const hospitalIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const hospitalId = parseInt(hospitalIdStr, 10);
    const doctorIdStr = Array.isArray(params.doctorId) ? params.doctorId[0] : (params.doctorId || '');
    const doctorId = parseInt(doctorIdStr, 10);

    const hospital = getHospitalById(hospitalId);
    const doctor = getDoctorById(doctorId);

    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date('2025-11-25'));

    // Get slots for the current selected day
    const dayName = getDayName(currentDate);
    const daySlots = getSlotsByDay(doctorId, dayName);

    // Categorize time slots into morning, afternoon, evening
    const categorizedSlots = useMemo(() => {
        return categorizeTimeSlots(daySlots);
    }, [daySlots]);

    if (!hospital) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Hospital Not Found</h2>
                <button
                    onClick={() => router.push('/hospital')}
                    className="bg-[#0e8a93] text-white px-6 py-2 rounded-lg hover:bg-[#0b6c73] transition-colors"
                >
                    Back to Hospitals
                </button>
            </div>
        );
    }

    const formatDate = (date: Date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayName = days[date.getDay()];
        const day = date.getDate().toString().padStart(2, '0');
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
            router.push(`/hospital/${hospitalId}/doctors/${doctorId}/payment?slot=${selectedSlot}&date=${encodeURIComponent(formatDate(currentDate))}`);
        }
    };

    return (
        <div className="slot-booking-container">
            <div className="doctor-summary-card" style={{ flexDirection: 'row', alignItems: 'flex-start', textAlign: 'left', padding: '24px', gap: '24px' }}>
                <div className="doctor-summary-image" style={{ width: '120px', height: '120px', marginBottom: 0 }}>
                    <Image
                        src={hospital.logoUrl || '/hospital.png'}
                        alt={hospital.name}
                        width={120}
                        height={120}
                        className="object-cover"
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <h2 className="doctor-summary-name" style={{ fontSize: '2rem', marginBottom: '8px' }}>{hospital.name}</h2>
                    <p className="doctor-summary-specialty" style={{ fontSize: '1rem', color: '#666', marginBottom: '8px' }}>
                        {hospital.address}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                            backgroundColor: '#00bcd4',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                        }}>
                            {hospital.rating} ★
                        </span>
                    </div>
                </div>
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
