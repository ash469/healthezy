'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import '@/components/doctors/SlotBooking.css';
import { getHospitalById } from '@/services/hospital';
import { getDoctorById } from '@/services/doctor';
import { getDoctorSchedule } from '@/services/appointment';
import { Hospital } from '@/types/hospital';
import { Doctor } from '@/types/doctor';
import { DoctorScheduleSlot } from '@/types/appointment';
import { categorizeTimeSlots, convertTo12Hour, getDayName, generateTimeSlots } from '@/utils/timeSlots';
import { useAuth } from '@/contexts/AuthContext';
import LoginPrompt from '@/components/auth/LoginPrompt';

export default function HospitalSlotBookingPage() {
    const router = useRouter();
    const params = useParams();
    const hospitalIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const hospitalIdNum = parseInt(Array.isArray(params.id) ? params.id[0] : (params.id || ''), 10);
    const doctorIdNum = parseInt(Array.isArray(params.doctorId) ? params.doctorId[0] : (params.doctorId || ''), 10);

    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const [hospital, setHospital] = useState<Hospital | null>(null);
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [schedule, setSchedule] = useState<DoctorScheduleSlot[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date()); // Default to today/tomorrow logic can be improved

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (hospitalIdNum) {
                    const hospData = await getHospitalById(hospitalIdNum);
                    setHospital(hospData);
                }
                if (doctorIdNum) {
                    const docData = await getDoctorById(doctorIdNum);
                    setDoctor(docData);
                    const scheduleData = await getDoctorSchedule(doctorIdNum);
                    setSchedule(scheduleData);
                }
            } catch (error) {
                console.error("Failed to fetch details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [hospitalIdNum, doctorIdNum]);

    // Get slots for the current selected day
    const dayName = getDayName(currentDate);
    // Use the schedule data to generate slots
    const daySlots = useMemo(() => {
        if (!schedule.length) return [];
        return generateTimeSlots(schedule, currentDate);
    }, [schedule, currentDate]);


    // Categorize time slots into morning, afternoon, evening
    const categorizedSlots = useMemo(() => {
        return categorizeTimeSlots(daySlots);
    }, [daySlots]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#009ca6]"></div>
                    <p className="mt-4 text-gray-600">Loading details...</p>
                </div>
            </div>
        );
    }

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
        setSelectedSlot(null); // Reset selection on date change
    };

    const handleSlotClick = (slot: string) => {
        setSelectedSlot(slot);
    };

    const handleBook = () => {
        if (!selectedSlot) return;

        if (isAuthenticated) {
            router.push(`/hospital/${hospitalIdNum}/doctors/${doctorIdNum}/payment?slot=${selectedSlot}&date=${encodeURIComponent(formatDate(currentDate))}`);
        } else {
            setShowAuthPrompt(true);
        }
    };

    return (
        <div className="slot-booking-container">
            <div className="doctor-summary-card" style={{ flexDirection: 'row', alignItems: 'flex-start', textAlign: 'left', padding: '24px', gap: '24px' }}>
                <div className="doctor-summary-image" style={{ width: '120px', height: '120px', marginBottom: 0 }}>
                    <Image
                        src={hospital.logo_url || '/hospital.png'}
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
                            {/* Rating removed as it is not in Hospital type */}
                            {/* {hospital.rating} ★ */}
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

            {showAuthPrompt && (
                <LoginPrompt 
                    message="Please login to complete your hospital appointment booking" 
                    onClose={() => setShowAuthPrompt(false)} 
                />
            )}
        </div>
    );
}
