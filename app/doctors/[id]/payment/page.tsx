'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import '@/components/doctors/Payment.css';

// Mock doctor data
const DOCTOR_DATA = {
    id: '1',
    name: 'Dr. Kailash',
    specialty: 'Urologist | Apollo Hospital',
    hospital: 'MBBS, MBBS',
    imageUrl: '/doctor.png',
    price: 700,
};

export default function PaymentPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const slot = searchParams.get('slot');
    const [step, setStep] = useState<'summary' | 'method'>('summary');
    const [selectedMethod, setSelectedMethod] = useState('paytm');

    const charges = {
        appointment: 700.00,
        emergency: 0.00,
        other: 0.00,
        total: 700.00
    };

    const handleProceed = () => {
        setStep('method');
    };

    const handleConfirm = () => {
        router.push(`/doctors/${DOCTOR_DATA.id}/booking-confirmation`);
    };

    return (
        <div className="payment-container">
            <div className="payment-left-section">
                <div className="payment-doctor-card">
                    <div className="payment-doctor-image">
                        <Image
                            src={DOCTOR_DATA.imageUrl}
                            alt={DOCTOR_DATA.name}
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="payment-doctor-details">
                        <h3>{DOCTOR_DATA.name}</h3>
                        <p>{DOCTOR_DATA.specialty}</p>
                        <p>{DOCTOR_DATA.hospital}</p>
                    </div>
                </div>
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

                {step === 'summary' ? (
                    <div className="payment-actions">
                        <button className="btn-cancel" onClick={() => router.back()}>Cancel Order</button>
                        <button className="btn-proceed" onClick={handleProceed}>Proceed Payment</button>
                    </div>
                ) : (
                    <div className="payment-methods-section">
                        <h3 className="payment-methods-header">Payment Option</h3>

                        <div className="payment-options-grid">
                            <div
                                className={`payment-option ${selectedMethod === 'paytm' ? 'selected' : ''}`}
                                onClick={() => setSelectedMethod('paytm')}
                            >
                                <span>Paytm</span>
                            </div>
                            <div
                                className={`payment-option ${selectedMethod === 'upi' ? 'selected' : ''}`}
                                onClick={() => setSelectedMethod('upi')}
                            >
                                <span>UPI</span>
                            </div>
                            <div
                                className={`payment-option ${selectedMethod === 'phonepe' ? 'selected' : ''}`}
                                onClick={() => setSelectedMethod('phonepe')}
                            >
                                <span>PhonePe</span>
                            </div>
                            <div
                                className={`payment-option ${selectedMethod === 'card' ? 'selected' : ''}`}
                                onClick={() => setSelectedMethod('card')}
                            >
                                <span>Card</span>
                            </div>
                        </div>

                        <div className="qr-section">
                            {/* Mock QR Code */}
                            <div className="qr-code flex items-center justify-center border text-xs text-gray-400">
                                QR Code
                            </div>
                        </div>

                        <div className="payment-actions">
                            <button className="btn-cancel" onClick={() => setStep('summary')}>Back</button>
                            <button className="btn-proceed" onClick={handleConfirm}>Confirm Payment</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
