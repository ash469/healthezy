'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import { getPharmacyById } from '@/data/pharmacy';
import '@/components/doctors/Payment.css';

export default function PharmacyPaymentPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const id = params?.id as string;
    const itemsParam = searchParams.get('items') || '';
    const pharmacy = getPharmacyById(id);

    // Parse items: "id:qty,id:qty"
    const cartItems = itemsParam.split(',').filter(Boolean).map(item => {
        const [medId, qtyStr] = item.split(':');
        return { medId, qty: parseInt(qtyStr, 10) };
    });

    const [step, setStep] = useState<'summary' | 'method'>('summary');
    const [selectedMethod, setSelectedMethod] = useState('paytm');

    if (!pharmacy) return <div>Pharmacy not found</div>;

    // Resolve medicines
    const selectedMedicines = cartItems.map(item => {
        const med = pharmacy.availableMedicines.find(m => m.id === item.medId);
        if (!med) return null;
        return {
            ...med,
            qty: item.qty,
            totalPrice: med.price * item.qty
        };
    }).filter(m => m !== null) as ({ qty: number; totalPrice: number } & typeof pharmacy.availableMedicines[0])[];

    const subtotal = selectedMedicines.reduce((sum, item) => sum + item.totalPrice, 0);
    const discountAmount = 0.00;
    const totalAmount = subtotal - discountAmount;

    const handleProceed = () => {
        setStep('method');
    };

    const handleConfirm = () => {
        router.push(`/pharmacy/${id}/booking-confirmation?items=${itemsParam}&amount=${totalAmount.toFixed(2)}&date=${new Date().toLocaleDateString()}`);
    };

    return (
        <div className="payment-container">
            {/* Left Section: Pharmacy Card + Payment Options */}
            <div className="payment-left-section">
                {/* Pharmacy Card */}
                <div className="payment-doctor-card">
                    <div className="payment-doctor-image">
                        <Image
                            src={pharmacy.imageUrl}
                            alt={pharmacy.name}
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="payment-doctor-details">
                        <h3>{pharmacy.name}</h3>
                        <p>{pharmacy.address}</p>
                        <p>{pharmacy.location}</p>
                        <div style={{ marginTop: '0.5rem' }}>
                            <span className="rating-tag" style={{ backgroundColor: '#00ccde', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {pharmacy.rating} ★
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payment Options Section - Only shown in step 2 */}
                {step === 'method' && (
                    <div style={{ marginTop: '2rem' }}>
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
                    </div>
                )}
            </div>

            {/* Right Section: Breakdown + Actions */}
            <div className="payment-right-section">
                {/* Detailed Breakdown */}
                <div className="breakdown-section" style={{ marginBottom: '2rem' }}>
                    {/* Header Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', marginBottom: '1rem', color: '#888', fontSize: '0.85rem' }}>
                        <div></div>
                        <div style={{ textAlign: 'center' }}>Qty.</div>
                        <div style={{ textAlign: 'right' }}>Amount</div>
                    </div>

                    {/* Items */}
                    {selectedMedicines.map(item => (
                        <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', marginBottom: '0.75rem', color: '#333', alignItems: 'center', fontSize: '0.95rem' }}>
                            <div style={{ fontWeight: 500 }}>{item.name}</div>
                            <div style={{ textAlign: 'center' }}>{item.qty}</div>
                            <div style={{ textAlign: 'right' }}>{item.totalPrice.toFixed(2)}</div>
                        </div>
                    ))}

                    {/* Discount Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', marginBottom: '1.5rem', color: '#555', alignItems: 'center', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Discount
                            <span style={{ backgroundColor: '#e0fbfd', color: '#00ccde', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px' }}>0%</span>
                        </div>
                        <div style={{ textAlign: 'center' }}></div>
                        <div style={{ textAlign: 'right' }}>{discountAmount.toFixed(2)}</div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1rem 0' }} />

                    {/* Total Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', color: '#333', fontWeight: 'bold', alignItems: 'center' }}>
                        <div style={{ gridColumn: '1 / 3' }}>Total Amount Payable</div>
                        <div style={{ textAlign: 'right', fontSize: '1.1rem' }}>{totalAmount.toFixed(2)}</div>
                    </div>
                </div>

                {/* Action Buttons */}
                {step === 'summary' ? (
                    <div className="payment-actions">
                        <button className="btn-cancel" onClick={() => router.back()}>Cancel Order</button>
                        <button className="btn-proceed" onClick={handleProceed}>Proceed Payment</button>
                    </div>
                ) : (
                    <div className="payment-actions">
                        <button className="btn-proceed" style={{ width: '100%' }} onClick={handleConfirm}>Confirm Payment</button>
                    </div>
                )}
            </div>
        </div>
    );
}
