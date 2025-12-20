'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import '@/components/doctors/Payment.css';
import { getDoctorById } from '@/data/doctors';

export default function PaymentPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const slot = searchParams.get('slot');

    // Fetch doctor data
    const doctorId = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const doctor = getDoctorById(doctorId);

    const [step, setStep] = useState<'summary' | 'method'>('summary');
    const [selectedMethod, setSelectedMethod] = useState('paytm');

    const charges = {
        appointment: doctor?.price || 700.00,
        emergency: 0.00,
        other: 0.00,
        total: doctor?.price || 700.00
    };

    if (!doctor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
                <button
                    onClick={() => router.push('/doctors')}
                    className="bg-[#0e8a93] text-white px-6 py-2 rounded-lg mt-4"
                >
                    Back to Doctors
                </button>
            </div>
        );
    }

    const handleProceed = () => {
        setStep('method');
    };

    const handleConfirm = () => {
        router.push(`/doctors/${doctor.id}/booking-confirmation?slot=${slot}&date=${searchParams.get('date')}`);
    };

    return (
        <div className="payment-container">
            {/* Left Section: Doctor Card + Payment Options */}
            <div className="payment-left-section">
                {/* Doctor Card */}
                <div className="payment-doctor-card">
                    <div className="payment-doctor-image">
                        <Image
                            src={doctor.imageUrl}
                            alt={doctor.name}
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="payment-doctor-details">
                        <h3>{doctor.name}</h3>
                        <p>{doctor.specialty}</p>
                        <p>{doctor.hospital}</p>
                    </div>
                </div>

                {/* Payment Options Section - Only shown in step 2 */}
                {step === 'method' && (
                    <div className="mt-8">
                        <h3 className="payment-methods-header">Payment Option</h3>

                        <div className="payment-options-grid">
                            {['paytm', 'upi', 'phonepe', 'card'].map(method => (
                                <div
                                    key={method}
                                    className={`payment-option ${selectedMethod === method ? 'selected' : ''}`}
                                    onClick={() => setSelectedMethod(method)}
                                >
                                    <span className="capitalize">{method}</span>
                                </div>
                            ))}
                        </div>

                        <div className="qr-section">
                            <div className="qr-code flex items-center justify-center border text-xs text-gray-400">
                                QR Code
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Side: Payment/Bill */}
            <div className="payment-right-section">
                <table className="bill-table">
                    <tbody>
                        <tr>
                            <td>Appointment Fees</td>
                            <td>{charges.appointment.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Emergency Appointment Fees</td>
                            <td>{charges.emergency.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Other Charges</td>
                            <td>{charges.other.toFixed(2)}</td>
                        </tr>
                        <tr className="total-row">
                            <td>Total Amount Payable</td>
                            <td>{charges.total.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Action Buttons */}
                {step === 'summary' ? (
                    <div className="payment-actions">
                        <button className="btn-cancel" onClick={() => router.back()}>Cancel Order</button>
                        <button className="btn-proceed" onClick={handleProceed}>Proceed Payment</button>
                    </div>
                ) : (
                    <div className="payment-actions">
                        <button className="btn-proceed w-full" onClick={handleConfirm}>Confirm Payment</button>
                    </div>
                )}
            </div>
        </div>
    );
}
