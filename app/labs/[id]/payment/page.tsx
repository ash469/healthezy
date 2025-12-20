'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import '@/components/doctors/Payment.css'; 
import { getLabById } from '@/data/labs';

export default function LabPaymentPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const labId = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const lab = getLabById(labId);

    const slot = searchParams.get('slot');
    const date = searchParams.get('date');
    const testIds = searchParams.get('tests')?.split(',') || [];

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

    const handleProceed = () => {
        setStep('method');
    };

    const handleConfirm = () => {
        router.push(`/labs/${lab.id}/booking-confirmation?slot=${slot}&date=${date}&tests=${testIds.join(',')}`);
    };

    return (
        <div className="payment-container">
            <div className="payment-left-section">
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
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>Selected Tests</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {selectedTests.map(test => (
                            <li key={test.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#555' }}>
                                <span>{test.name}</span>
                                <span style={{ fontWeight: 'bold' }}>₹{test.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Side: Payment/Bill */}
            <div className="payment-right-section">
                <table className="bill-table">
                    <tbody>
                        <tr>
                            <td>Tests Total</td>
                            <td>{charges.subtotal.toFixed(2)}</td>
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
                            {['paytm', 'upi', 'phonepe', 'card'].map(method => (
                                <div
                                    key={method}
                                    className={`payment-option ${selectedMethod === method ? 'selected' : ''}`}
                                    onClick={() => setSelectedMethod(method)}
                                >
                                    <span style={{ textTransform: 'capitalize' }}>{method}</span>
                                </div>
                            ))}
                        </div>

                        <div className="qr-section">
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
