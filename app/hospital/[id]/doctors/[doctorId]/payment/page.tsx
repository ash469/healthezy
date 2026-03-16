'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import '@/components/doctors/Payment.css';
import { getHospitalById } from '@/services/hospital';
import { getDoctorById } from '@/services/doctor';
import type { Hospital } from '@/types/hospital';
import type { Doctor } from '@/types/doctor';
import LoginPrompt from '@/components/auth/LoginPrompt';
import { useAuth } from '@/contexts/AuthContext';
import { bookAppointment, formatTimeForAPI } from '@/services/appointment';
import type { AppointmentRequest } from '@/types/appointment';
import { useEffect } from 'react';

export default function HospitalPaymentPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const slot = searchParams.get('slot');
    const { isAuthenticated, isLoading, user } = useAuth();

    const hospitalIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const hospitalId = parseInt(hospitalIdStr, 10);
    const doctorIdStr = Array.isArray(params.doctorId) ? params.doctorId[0] : (params.doctorId || '');
    const doctorId = parseInt(doctorIdStr, 10);

    const [hospital, setHospital] = useState<Hospital | null>(null);
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [step, setStep] = useState<'summary' | 'method'>('summary');
    const [selectedMethod, setSelectedMethod] = useState('paytm');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (hospitalId) {
                    const hospData = await getHospitalById(hospitalId);
                    setHospital(hospData);
                }
                if (doctorId) {
                    const docData = await getDoctorById(doctorId);
                    setDoctor(docData);
                }
            } catch (error: any) {
                console.error("Failed to fetch details:", error);
                setError(error.message || "Failed to load details");
            } finally {
                setLoadingData(false);
            }
        };
        fetchData();
    }, [hospitalId, doctorId]);

    const consultationFee = doctor?.consultation_fee ? Number(doctor.consultation_fee) : 700.00;
    const charges = {
        appointment: consultationFee,
        emergency: 0.00,
        other: 0.00,
        total: consultationFee
    };

    if (loadingData) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#009ca6]"></div>
                    <p className="mt-4 text-gray-600">Loading details...</p>
                </div>
            </div>
        );
    }

    if (!hospital) {
        return (
            <div>
                <h3>Hospital not found</h3>
                {error && <p className="text-red-500">Error: {error}</p>}
            </div>
        );
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

    const handleConfirm = async () => {
        setIsBooking(true);
        try {
            const patientIdParam = searchParams.get('patientId');
            const patientId = patientIdParam ? parseInt(patientIdParam) : (user?.id ? user.id : 0); // Fallback needs improvement

            const apiDate = searchParams.get('apiDate') || searchParams.get('date') || new Date().toISOString().split('T')[0];
            const apiTime = searchParams.get('apiTime') || slot || '09:00';

            const appointmentData: AppointmentRequest = {
                patient_id: patientId, // API should validate this
                doctor_id: doctorId,
                hospital_id: hospitalId,
                department_id: 1, // Defaulting 
                appointment_date: apiDate,
                appointment_time: formatTimeForAPI(apiTime),
                duration_minutes: 30,
                visit_type: "Offline",
                booking_type: "CHECKUP",
                reason_for_visit: "Hospital Visit",
                notes: `Booked at ${hospital.name}`
            };

            const response = await bookAppointment(appointmentData);

            router.push(`/hospital/${hospitalId}/doctors/${doctorId}/booking-confirmation?slot=${slot}&date=${searchParams.get('date')}&appointmentNumber=${response.appointment_number}&appointmentId=${response.id}`);
        } catch (error: any) {
            console.error('Booking failed:', error);
            alert(`Payment successful but booking failed: ${error.response?.data?.detail || error.message}`);
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div className="payment-container">
            {/* Left Section: Hospital Card + Payment Options */}
            <div className="payment-left-section">
                {/* Hospital Card */}
                <div className="payment-doctor-card">
                    <div className="payment-doctor-image">
                        <Image
                            src={hospital.logo_url || '/hospital.png'}
                            alt={hospital.name}
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="payment-doctor-details">
                        <h3>{hospital.name}</h3>
                        <p>{hospital.address}</p>
                        <p>{hospital.city}, {hospital.state}</p>
                        {doctor && <p className="text-sm font-semibold text-[#0e8a93] mt-2">Doctor: {doctor.full_name}</p>}
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
                            <td>{charges.appointment?.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Emergency Appointment Fees</td>
                            <td>{charges.emergency.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Other Charges</td>
                            <td>{charges.other?.toFixed(2)}</td>
                        </tr>
                        <tr className="total-row">
                            <td>Total Amount Payable</td>
                            <td>{charges.total?.toFixed(2)}</td>
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
                        <button
                            className="btn-proceed w-full flex items-center justify-center gap-2"
                            onClick={handleConfirm}
                            disabled={isBooking}
                        >
                            {isBooking ? 'Processing...' : 'Confirm Payment'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
