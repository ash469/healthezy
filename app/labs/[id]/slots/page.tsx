'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { getLabById, getLabTests } from '@/services/lab';
import type { LabResponse, LabTestResponse } from '@/types/lab';
import '@/components/labs/LabSlots.css';

export default function LabSlotsPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const labIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const labId = parseInt(labIdStr, 10);

    const [lab, setLab] = useState<LabResponse | null>(null);
    const [allTests, setAllTests] = useState<LabTestResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            if (labId) {
                try {
                    const [labData, testsData] = await Promise.all([
                        getLabById(labId),
                        getLabTests(labId)
                    ]);
                    setLab(labData);
                    setAllTests(testsData || []);
                } catch (error) {
                    console.error("Failed to fetch slots data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [labId]);

    const testIds = searchParams.get('tests')?.split(',').map(id => parseInt(id, 10)) || [];
    const selectedTests = allTests.filter(t => testIds.includes(t.id));

    if (loading) return <div className="p-20 text-center text-teal-600 font-bold">Loading lab details...</div>;
    if (!lab) return <div className="p-10 text-center text-rose-500 font-bold">Lab not found</div>;

    // Slots would ideally come from an API, using placeholders if not available in LabResponse
    const availableSlots: Record<string, string[]> = {
        morning: ['09:00', '10:00', '11:00'],
        afternoon: ['12:00', '01:00', '02:00']
    };

    const formatDate = (date: Date) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()} | ${days[date.getDay()]}`;
    };

    const changeDate = (daysCount: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + daysCount);
        setCurrentDate(newDate);
    };

    const handleProceedPayment = () => {
        if (selectedSlot) {
            router.push(`/labs/${lab.id}/payment?slot=${selectedSlot}&date=${encodeURIComponent(currentDate.toISOString().split('T')[0])}&tests=${testIds.join(',')}`);
        }
    };

    const subtotal = selectedTests.reduce((sum: number, t: LabTestResponse) => sum + Number(t.test_price || 0), 0);
    const otherCharges = 0.00;
    const totalPayable = subtotal + otherCharges;

    return (
        <div className="slot-booking-container">
            <div className="slot-top-section">
                <div className="lab-slot-banner">
                    <Image
                        src={lab.logo_url || '/lab.png'}
                        alt={lab.name}
                        width={100}
                        height={100}
                        className="lab-banner-img"
                        unoptimized={true}
                    />
                    <div className="lab-banner-details">
                        <h2>{lab.name}</h2>
                        <p className="text-sm opacity-90">{lab.address}</p>
                        <p className="text-sm opacity-90">{lab.city}, {lab.state}</p>
                        <div className="mt-2">
                            <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                                {lab.rating || 4.5} ★
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bill-summary">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">Bill Summary</div>
                    {selectedTests.map(t => (
                        <div key={t.id} className="bill-row">
                            <span className="text-slate-600 font-medium">{t.name}</span>
                            <span className="font-bold text-slate-900">₹{Number(t.test_price).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="bill-row">
                        <span className="text-slate-400">Other Charges</span>
                        <span className="text-slate-400">₹{otherCharges.toFixed(2)}</span>
                    </div>

                    <div className="bill-row total mt-4 pt-4 border-t border-slate-100">
                        <span className="font-black text-slate-800 uppercase tracking-tighter">Total Payable</span>
                        <span className="text-xl font-black text-teal-600">₹{Number(totalPayable || 0).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="slot-picker-container">
                <div className="slot-left-pane">
                    <div className="slot-header">
                        <h3>Pick Your Slot</h3>
                        <div className="date-nav">
                            <button className="nav-arrow" onClick={() => changeDate(-1)}>&lt;</button>
                            <span className="font-bold text-slate-700">{formatDate(currentDate)}</span>
                            <button className="nav-arrow" onClick={() => changeDate(1)}>&gt;</button>
                        </div>
                    </div>

                    {Object.entries(availableSlots).map(([period, slots]) => (
                        <div key={period}>
                            <div className="slot-group-title" style={{ textTransform: 'capitalize' }}>{period}</div>
                            <div className="slots-grid">
                                {(slots as string[]).map(slot => (
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
