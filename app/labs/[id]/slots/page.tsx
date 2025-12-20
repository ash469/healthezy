'use client';

import { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { getLabById } from '@/data/labs';
import '@/components/labs/LabSlots.css';

export default function LabSlotsPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const labId = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const lab = getLabById(labId);

    // Get test IDs from URL
    const testIds = searchParams.get('tests')?.split(',') || [];
    const selectedTests = lab?.availableTests.filter(t => testIds.includes(t.id)) || [];

    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date('2025-11-25'));

    if (!lab) return <div className="p-10 text-center">Lab not found</div>;

    const availableSlots = lab.slots || {
        morning: ['09:00', '10:00', '11:00'],
        afternoon: ['12:00', '01:00', '02:00']
    };

    const formatDate = (date: Date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()} | ${days[date.getDay()]}`;
    };

    const changeDate = (days: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        setCurrentDate(newDate);
    };

    const handleProceedPayment = () => {
        if (selectedSlot) {
            router.push(`/labs/${lab.id}/payment?slot=${selectedSlot}&date=${encodeURIComponent(formatDate(currentDate))}&tests=${testIds.join(',')}`);
        }
    };

    const subtotal = selectedTests.reduce((sum, t) => sum + t.price, 0);
    const otherCharges = 0.00;
    const totalPayable = subtotal + otherCharges;

    return (
        <div className="slot-booking-container">
            {/* Top Section: Lab Banner & Bill */}
            <div className="slot-top-section">
                {/* Left: Lab Banner (Teal Box) */}
                <div className="lab-slot-banner">
                    <Image
                        src={lab.imageUrl}
                        alt={lab.name}
                        width={100}
                        height={100}
                        className="lab-banner-img"
                    />
                    <div className="lab-banner-details">
                        <h2>{lab.name}</h2>
                        <p>Blood Test | Stool Test | Urine Test <br /> KIDNEY PANEL; KFT</p>
                        <p>GLUCOSE, FASTING (F) | VITAMIN D <br /> 25 - HYDROXY</p>
                    </div>
                </div>

                {/* Right: Bill Summary */}
                <div className="bill-summary">
                    {selectedTests.map(t => (
                        <div key={t.id} className="bill-row">
                            <span>{t.name}</span>
                            <span>{t.price.toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="bill-row">
                        <span>Other Charges</span>
                        <span>{otherCharges.toFixed(2)}</span>
                    </div>

                    <div className="bill-row total">
                        <span>Total Amount Payable</span>
                        <span>{totalPayable.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Slot Picker & Actions */}
            <div className="slot-picker-container">
                <div className="slot-left-pane">
                    <div className="slot-header">
                        <h3>Pick Your Slot</h3>
                        <div className="date-nav">
                            <button className="nav-arrow" onClick={() => changeDate(-1)}>&lt;</button>
                            <span>{formatDate(currentDate)}</span>
                            <button className="nav-arrow" onClick={() => changeDate(1)}>&gt;</button>
                        </div>
                    </div>

                    {Object.entries(availableSlots).map(([period, slots]) => (
                        <div key={period}>
                            <div className="slot-group-title" style={{ textTransform: 'capitalize' }}>{period}</div>
                            <div className="slots-grid">
                                {slots.map(slot => (
                                    <button
                                        key={slot}
                                        className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                                        onClick={() => setSelectedSlot(slot)}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions aligned to bottom right */}
                <div className="slot-actions">
                    <button className="btn-cancel" onClick={() => router.back()}>Cancel Order</button>
                    <button
                        className="btn-proceed"
                        disabled={!selectedSlot}
                        onClick={handleProceedPayment}
                    >
                        Proceed Payment
                    </button>
                </div>
            </div>
        </div>
    );
}
