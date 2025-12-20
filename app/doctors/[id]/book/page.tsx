'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import '@/components/doctors/SlotBooking.css';

const DOCTOR_DATA = {
    id: '1',
    name: 'Dr. Kailash',
    specialty: 'Urologist | Apollo Hospital',
    hospital: 'MBBS, MBBS',
    imageUrl: '/doctor.png',
    price: 700,
};

const SLOTS = {
    morning: ['09:00', '10:00', '10:45', '12:00'],
    afternoon: ['12:30', '1:00', '2:00', '03:15'],
    evening: ['05:00', '06:00', '07:00'],
};

export default function SlotBookingPage() {
    const router = useRouter();
    const params = useParams();
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    // Initialize with a specific date or today
    const [currentDate, setCurrentDate] = useState(new Date('2025-11-25'));

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
                        src={DOCTOR_DATA.imageUrl}
                        alt={DOCTOR_DATA.name}
                        width={130}
                        height={130}
                        className="object-cover"
                    />
                </div>
                <h2 className="doctor-summary-name">{DOCTOR_DATA.name}</h2>
                <p className="doctor-summary-specialty">{DOCTOR_DATA.specialty}</p>
                <p className="doctor-summary-hospital">{DOCTOR_DATA.hospital}</p>
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
                        {SLOTS.morning.map(slot => (
                            <button
                                key={slot}
                                className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                                onClick={() => handleSlotClick(slot)}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="slot-group">
                    <h3 className="slot-group-title">Afternoon</h3>
                    <div className="slots-grid">
                        {SLOTS.afternoon.map((slot, index) => (
                            <button
                                key={slot}
                                // Mocking a disabled slot (N/A) from design just to show capability
                                className={`time-slot ${index === 3 ? 'disabled' : ''} ${selectedSlot === slot ? 'selected' : ''}`}
                                onClick={() => index !== 3 && handleSlotClick(slot)}
                                disabled={index === 3}
                            >
                                {index === 3 ? 'N/A' : slot}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="slot-group">
                    <h3 className="slot-group-title">Evening</h3>
                    <div className="slots-grid">
                        {SLOTS.evening.map(slot => (
                            <button
                                key={slot}
                                className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                                onClick={() => handleSlotClick(slot)}
                            >
                                {slot}
                            </button>
                        ))}
                        <button className="time-slot disabled">N/A</button>
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
