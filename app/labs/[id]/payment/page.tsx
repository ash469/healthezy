'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import '@/components/doctors/Payment.css';
import { getLabById } from '@/data/labs';
import LoginPrompt from '@/components/auth/LoginPrompt';
import { useAuth } from '@/contexts/AuthContext';

export default function LabPaymentPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { isAuthenticated, isLoading } = useAuth();

    const labId = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const lab = getLabById(parseInt(labId));

    const slot = searchParams.get('slot');
    const date = searchParams.get('date');
    const testIds = searchParams.get('tests')?.split(',').map(id => parseInt(id)) || [];

    const selectedTests = lab?.availableTests.filter(t => testIds.includes(t.id)) || [];

    const [step, setStep] = useState<'summary' | 'method'>('summary');
    const [selectedMethod, setSelectedMethod] = useState('paytm');

    const subtotal = selectedTests.reduce((sum, t) => sum + t.price, 0);
    const charges = {
        subtotal: subtotal,
        other: 0.00,
        total: subtotal
    };

    if (!lab) return <div>Lab not found</div>;

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
        router.push(`/labs/${lab.id}/booking-confirmation?slot=${slot}&date=${date}&tests=${testIds.join(',')}`);
    };

    return (
        <div className="payment-container">
            {/* Left Section: Lab Card + Selected Tests + Payment Options */}
            <div className="payment-left-section">
                {/* Lab Card */}
                <div className="payment-doctor-card">
                    <div className="payment-doctor-image">
                        <Image
                            src={lab.imageUrl}
                            alt={lab.name}
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="payment-doctor-details">
                        <h3>{lab.name}</h3>
                        <p>{lab.address}</p>
                        <p>{lab.location}</p>
                    </div>
                </div>

                {/* List Selected Tests */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                    <h4 className="font-bold mb-2 text-gray-800">Selected Tests</h4>
                    <ul className="list-none p-0">
                        {selectedTests.map(test => (
                            <li key={test.id} className="flex justify-between mb-2 text-gray-600">
                                <span>{test.name}</span>
                                <span className="font-bold">₹{test.price}</span>
                            </li>
                        ))}
                    </ul>
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
                            <td>Tests Total</td>
                            <td>{Number(charges.subtotal || 0).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Other Charges</td>
                            <td>{Number(charges.other || 0).toFixed(2)}</td>
                        </tr>
                        <tr className="total-row">
                            <td>Total Amount Payable</td>
                            <td>{Number(charges.total || 0).toFixed(2)}</td>
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
