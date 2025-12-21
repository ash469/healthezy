'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/data/shop';
import '@/components/doctors/Payment.css';

function ShopPaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const itemsParam = searchParams.get('items') || '';

    // Parse items: "id:qty,id:qty"
    const cartItemsList = itemsParam.split(',').filter(Boolean).map(item => {
        const [prodId, qtyStr] = item.split(':');
        return { prodId, qty: parseInt(qtyStr, 10) };
    });

    const [step, setStep] = useState<'summary' | 'method'>('summary');
    const [selectedMethod, setSelectedMethod] = useState('paytm');

    // Resolve products
    const selectedProducts = cartItemsList.map(item => {
        const prod = getProductById(item.prodId);
        if (!prod) return null;
        return {
            ...prod,
            qty: item.qty,
            totalPrice: prod.price * item.qty
        };
    }).filter(p => p !== null) as ({ qty: number; totalPrice: number; id: string; name: string; price: number; imageUrl: string }[]);

    const subtotal = selectedProducts.reduce((sum, item) => sum + item.totalPrice, 0);
    const discountAmount = 0.00;
    const totalAmount = subtotal - discountAmount;

    const handleProceed = () => {
        setStep('method');
    };

    const handleConfirm = () => {
        // No global cart to clear as we are using local state/url params
        // Pass necessary data to confirmation page
        router.push(`/shop/confirmation?items=${itemsParam}&amount=${totalAmount.toFixed(2)}&date=${new Date().toLocaleDateString()}`);
    };

    return (
        <div className="payment-container">
            {/* Left Section: Information or Payment Method */}
            <div className="payment-left-section">

                {/* General Shop Card - Styled like Pharmacy Card */}
                <div className="payment-doctor-card">
                    <div className="payment-doctor-image">
                        {/* Using a generic shop image or the first product image if available, or a placeholder */}
                        <Image
                            src={selectedProducts[0]?.imageUrl || '/product.png'}
                            alt="Shop"
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="payment-doctor-details">
                        <h3>Healthezy Shop</h3>
                        <p>Sustainable Healthcare Products</p>
                        <p>Fast Delivery</p>
                        <div style={{ marginTop: '0.5rem' }}>
                            <span className="rating-tag" style={{ backgroundColor: '#00ccde', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                4.8 ★
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
                    {selectedProducts.map(item => (
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

export default function ShopPaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopPaymentContent />
        </Suspense>
    );
}
