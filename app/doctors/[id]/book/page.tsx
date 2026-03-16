'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import '@/components/doctors/SlotBooking.css';
import LoginPrompt from '@/components/auth/LoginPrompt';
import { apiClient } from '@/services/config';
import { useAuth } from '@/contexts/AuthContext';
import { getCurrentUser } from '@/services/auth';
import { bookAppointment, formatDateForAPI, formatTimeForAPI } from '@/services/appointment';
import { getMyPatients } from '@/services/patient';
import type { Patient } from '@/types/patient';
import { getDoctorSchedule, getDoctorById } from '@/services/doctor';
import type { Doctor, DoctorSchedule } from '@/types/doctor';
import type { AppointmentRequest } from '@/types/appointment';

export default function SlotBookingPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { isAuthenticated, user: authUser, isLoading: isAuthLoading } = useAuth();
    const doctorIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const doctorId = parseInt(doctorIdStr, 10);

    const [scheduleSlots, setScheduleSlots] = useState<DoctorSchedule[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
    const [isFetchingPatients, setIsFetchingPatients] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [visitType, setVisitType] = useState<"Online" | "Offline">("Offline");
    const [bookingType, setBookingType] = useState<"CHECKUP" | "Follow-Up">("CHECKUP");
    const [reasonForVisit, setReasonForVisit] = useState<string>("Regular checkup");
    const [doctor, setDoctor] = useState<Doctor | null>(null);

    const doctorName = doctor?.full_name || (doctor ? `${doctor.first_name || ''} ${doctor.last_name || ''}`.trim() : 'Doctor');
    const doctorPhoto = doctor?.photo_url || '/doctor.png';
    const doctorSpecialization = doctor?.specialization || 'General';

    // Fetch Doctor Details
    useEffect(() => {
        if (!doctorId) return;

        async function fetchDoctor() {
            try {
                const data = await getDoctorById(doctorId);
                setDoctor(data);
            } catch (error) {
                console.error("Failed to fetch doctor details", error);
            }
        }
        fetchDoctor();
    }, [doctorId]);

    // Fetch Schedule
    useEffect(() => {
        if (!doctorId) return;

        async function fetchSchedule() {
            setLoading(true);
            try {
                const formattedDate = formatDateForAPI(currentDate);
                const data = await getDoctorSchedule(doctorId, formattedDate);
                setScheduleSlots(data);
            } catch (error) {
                console.error("Failed to fetch schedule", error);
                setScheduleSlots([]);
            } finally {
                setLoading(false);
            }
        }
        fetchSchedule();
    }, [doctorId, currentDate]);

    // Fetch Patients
    useEffect(() => {
        async function fetchPatients() {
            if (!isAuthenticated) return;
            setIsFetchingPatients(true);
            try {
                const data = await getMyPatients();
                setPatients(data);
                if (data.length > 0) {
                    const primaryPatient = data.find(p => p.id === (authUser && 'patient_id' in authUser ? (authUser as any).patient_id : null));
                    setSelectedPatientId(primaryPatient?.id || data[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch patients", error);
            } finally {
                setIsFetchingPatients(false);
            }
        }
        fetchPatients();
    }, [isAuthenticated, authUser]);
    const getDayName = (date: Date): string => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[date.getDay()];
    };
    const daySlots = useMemo(() => {
        if (!Array.isArray(scheduleSlots)) return [];
        const dayName = getDayName(currentDate);
        return scheduleSlots.filter(slot => slot?.day && slot.day.toLowerCase() === dayName);
    }, [scheduleSlots, currentDate]);
    const categorizedSlots = useMemo(() => {
        const morning: any[] = [];
        const afternoon: any[] = [];
        const evening: any[] = [];
        daySlots.forEach(slot => {
            const hour = parseInt(slot.start_time.split(':')[0]);
            const slotData = {
                time: slot.start_time.substring(0, 5),
                available: slot.is_available
            };
            if (hour < 12) {
                morning.push(slotData);
            } else if (hour < 17) {
                afternoon.push(slotData);
            } else {
                evening.push(slotData);
            }
        });
        return { morning, afternoon, evening };
    }, [daySlots]);
    const convertTo12Hour = (time24: string): string => {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };
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
        setSelectedSlot(null);
    };
    const handleSlotClick = (slot: string) => {
        setSelectedSlot(slot);
    };
    const handleBook = async () => {
        if (!selectedSlot) return;

        try {
            if (!isAuthenticated || !authUser) {
                const token = typeof window !== 'undefined' ? (localStorage.getItem('access_token') || localStorage.getItem('auth_token')) : null;
                if (!token) {
                    setShowAuthPrompt(true);
                    return;
                }
            }
            setIsModalOpen(true);
        } catch (error: any) {
            console.error('Error opening booking modal:', error);
        }
    };
    const confirmBooking = async () => {
        if (!selectedSlot || !selectedPatientId || !doctor) return;

        setIsBooking(true);
        try {
            const fullSlot = daySlots.find(s => s.start_time.startsWith(selectedSlot));
            const duration = fullSlot?.slot_duration || 30;
            const bookingData: AppointmentRequest = {
                patient_id: selectedPatientId,
                doctor_id: doctorId,
                hospital_id: doctor.hospital_id || 0,
                appointment_date: formatDateForAPI(currentDate),
                appointment_time: formatTimeForAPI(selectedSlot),
                duration_minutes: duration,
                visit_type: visitType,
                booking_type: bookingType,
                reason_for_visit: reasonForVisit,
                department_id: doctor.department_id || undefined
            };

            const appointment = await bookAppointment(bookingData);

            const selectedPatient = patients.find(p => p.id === selectedPatientId);
            const patientName = selectedPatient ? `${selectedPatient.first_name} ${selectedPatient.last_name || ''}`.trim() : '';

            const queryParams = new URLSearchParams({
                slot: selectedSlot,
                date: formatDate(currentDate),
                patientName: patientName,
                appointmentNumber: appointment.appointment_number
            });

            setIsModalOpen(false);
            router.push(`/doctors/${params.id}/booking-confirmation?${queryParams.toString()}`);

        } catch (error) {
            console.error("Booking failed:", error);
            alert("Failed to book appointment. Please try again.");
        } finally {
            setIsBooking(false);
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-teal-600">Loading...</div>
            </div>
        );
    }
    return (
        <div className="slot-booking-container">
            <div className="doctor-summary-card">
                <div className="doctor-summary-image">
                    <Image
                        src={doctorPhoto}
                        alt={doctorName}
                        width={130}
                        height={130}
                        className="object-cover"
                        unoptimized={true}
                    />
                </div>
                <h2 className="doctor-summary-name">{doctorName}</h2>
                <p className="doctor-summary-specialty">{doctorSpecialization}</p>
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
                                    {convertTo12Hour(slot.time)}
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
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Confirm Booking</h2>
                                <p className="text-sm text-gray-500">Who is this appointment for?</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
                            <section>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <span className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs">1</span>
                                    Select Patient
                                </h3>
                                {patients.length > 0 ? (
                                    <div className="grid gap-3">
                                        {patients.map(patient => (
                                            <div
                                                key={patient.id}
                                                onClick={() => setSelectedPatientId(patient.id)}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedPatientId === patient.id
                                                    ? 'border-teal-500 bg-teal-50 shadow-sm'
                                                    : 'border-gray-100 hover:border-teal-200 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${selectedPatientId === patient.id ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-400'
                                                    }`}>
                                                    {patient.full_name.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className={`font-bold ${selectedPatientId === patient.id ? 'text-teal-900' : 'text-gray-900'}`}>{patient.full_name}</div>
                                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{patient.gender} • {patient.age} Years</div>
                                                </div>
                                                {selectedPatientId === patient.id && (
                                                    <div className="text-teal-500 bg-teal-100 p-1 rounded-full">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <div className="text-gray-400 mb-4 text-4xl">👤</div>
                                        <p className="text-gray-600 mb-6">You need to add a patient profile first.</p>
                                        <Link
                                            href="/dashboard/patient"
                                            className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all font-medium"
                                        >
                                            Add Patient Profile
                                        </Link>
                                    </div>
                                )}
                            </section>

                            <hr className="border-gray-100" />
                            <section className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                                    <span className="w-5 h-5 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xs">2</span>
                                    Appointment Details
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Visit Type</label>
                                        <div className="flex bg-gray-100 p-1 rounded-lg">
                                            <button
                                                onClick={() => setVisitType("Offline")}
                                                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${visitType === "Offline" ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                Offline
                                            </button>
                                            <button
                                                onClick={() => setVisitType("Online")}
                                                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${visitType === "Online" ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                Online
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Booking Type</label>
                                        <div className="flex bg-gray-100 p-1 rounded-lg">
                                            <button
                                                onClick={() => setBookingType("CHECKUP")}
                                                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${bookingType === "CHECKUP" ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                Checkup
                                            </button>
                                            <button
                                                onClick={() => setBookingType("Follow-Up")}
                                                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${bookingType === "Follow-Up" ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                Follow-up
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Reason for Visit</label>
                                    <textarea
                                        value={reasonForVisit}
                                        onChange={(e) => setReasonForVisit(e.target.value)}
                                        placeholder="Briefly describe the reason for your visit..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none min-h-[80px]"
                                    />
                                </div>
                            </section>
                        </div>
                        <div className="p-6 bg-gray-50 space-y-4">
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                                <span className="text-xl">⚠️</span>
                                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                                    <strong>Important:</strong> Your appointment will be confirmed immediately.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-white transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmBooking}
                                    disabled={!selectedPatientId || isBooking}
                                    className="flex-2 px-8 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 min-w-[160px]"
                                >
                                    {isBooking ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Booking...
                                        </>
                                    ) : 'Confirm Booking'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showAuthPrompt && (
                <LoginPrompt 
                    message={`Please login to book an appointment with Dr. ${doctorName}`} 
                    onClose={() => setShowAuthPrompt(false)} 
                />
            )}
        </div>
    );
}
