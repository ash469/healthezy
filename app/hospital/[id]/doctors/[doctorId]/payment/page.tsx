'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import '@/components/doctors/Payment.css';
import { getHospitalById } from '@/data/hospitals';
import LoginPrompt from '@/components/auth/LoginPrompt';
import { useAuth } from '@/contexts/AuthContext';

export default function HospitalPaymentPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const slot = searchParams.get('slot');
    const { isAuthenticated, isLoading } = useAuth();

    const hospitalIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const hospitalId = parseInt(hospitalIdStr, 10);
    const doctorIdStr = Array.isArray(params.doctorId) ? params.doctorId[0] : (params.doctorId || '');
    const doctorId = parseInt(doctorIdStr, 10);

    const hospital = getHospitalById(hospitalId);

    const [step, setStep] = useState<'summary' | 'method'>('summary');
    const [selectedMethod, setSelectedMethod] = useState('paytm');

    const charges = {
        appointment: 700.00,
        emergency: 0.00,
        other: 0.00,
        total: 700.00
    };

    if (!hospital) {
        return <div>Hospital not found</div>;
    }

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#009ca6]"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Show login prompt if not authenticated
    if (!isAuthenticated) {
        return <LoginPrompt message="Please login to continue with your payment" onClose={() => router.back()} />;
    }

    const handleProceed = () => {
        setStep('method');
    };

    const handleConfirm = () => {
        router.push(`/hospital/${hospitalId}/doctors/${doctorId}/booking-confirmation?slot=${slot}&date=${searchParams.get('date')}`);
    };

    return (
        <div className="payment-container">
            {/* Left Section: Hospital Card + Payment Options */}
            <div className="payment-left-section">
                {/* Hospital Card */}
                <div className="payment-doctor-card">
                    <div className="payment-doctor-image">
                        <Image
                            src={hospital.logoUrl || '/hospital.png'}
                            alt={hospital.name}
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="payment-doctor-details">
                        <h3>{hospital.name}</h3>
                        <p>{hospital.address}</p>
                        <p>{hospital.location}</p>
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
