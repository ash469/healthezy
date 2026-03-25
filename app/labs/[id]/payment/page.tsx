'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import '@/components/doctors/Payment.css';
import { getLabById, getLabTests } from '@/services/lab';
import { LabResponse, LabTestResponse } from '@/types/lab';
import LoginPrompt from '@/components/auth/LoginPrompt';
import { useAuth } from '@/contexts/AuthContext';

export default function LabPaymentPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const labIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const labId = parseInt(labIdStr, 10);

    const [lab, setLab] = useState<LabResponse | null>(null);
    const [selectedTests, setSelectedTests] = useState<LabTestResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const slot = searchParams.get('slot');
    const date = searchParams.get('date');
    const testIdsQuery = searchParams.get('tests');

    useEffect(() => {
        if (!labId) return;

        async function fetchData() {
            setLoading(true);
            try {
                const [labData, testsData] = await Promise.all([
                    getLabById(labId),
                    getLabTests(labId)
                ]);

                if (!labData) {
                    setError('Laboratory not found');
                    return;
                }

                setLab(labData);

                if (testIdsQuery) {
                    const testIds = testIdsQuery.split(',').map(id => parseInt(id));
                    const filtered = (testsData || []).filter(t => testIds.includes(t.id));
                    setSelectedTests(filtered);
                }
            } catch (err) {
                console.error("Failed to fetch payment data", err);
                setError('Failed to load payment details');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [labId, testIdsQuery]);

    const [step, setStep] = useState<'summary' | 'method'>('summary');
    const [selectedMethod, setSelectedMethod] = useState('paytm');

    const subtotal = selectedTests.reduce((sum, t) => sum + Number(t.test_price || 0), 0);
    const charges = {
        subtotal: subtotal,
        other: 0.00,
        total: subtotal
    };

    // Show loading state while checking authentication or fetching data
    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#009ca6]"></div>
                    <p className="mt-4 text-gray-600">Loading Payment Details...</p>
                </div>
            </div>
        );
    }

    if (error || !lab) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{error || 'Lab not found'}</h2>
                <button
                    onClick={() => router.back()}
                    className="bg-[#009ca6] text-white px-6 py-2 rounded-lg hover:bg-[#007c85] transition-colors"
                >
                    Go Back
                </button>
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
        const testIds = selectedTests.map(t => t.id).join(',');
        router.push(`/labs/${lab.id}/booking-confirmation?slot=${slot}&date=${date}&tests=${testIds}`);
    };

    return (
        <div className="payment-container">
            {/* Left Section: Lab Card + Selected Tests + Payment Options */}
            <div className="payment-left-section">
                {/* Lab Card */}
                <div className="payment-doctor-card">
                    <div className="payment-doctor-image">
                        <Image
                            src={lab.logo_url || lab.imageUrl || '/lab.png'}
                            alt={lab.name}
                            width={120}
                            height={120}
                            className="object-contain"
                            unoptimized={true}
                        />
                    </div>
                    <div className="payment-doctor-details">
                        <h3>{lab.name}</h3>
                        <p>{lab.address}</p>
                        <p>{lab.city && lab.state ? `${lab.city}, ${lab.state}` : (lab.city || lab.state || '')}</p>
                    </div>
                </div>

                {/* List Selected Tests */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                    <h4 className="font-bold mb-2 text-gray-800">Selected Tests</h4>
                    <ul className="list-none p-0">
                        {selectedTests.map(test => (
                            <li key={test.id} className="flex justify-between mb-2 text-gray-600">
                                <span>{test.name}</span>
                                <span className="font-bold">₹{test.test_price}</span>
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

