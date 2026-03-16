'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import '@/components/doctors/Payment.css';
import { getDoctorById } from '@/services/doctor';
import type { Doctor } from '@/types/doctor';
import LoginPrompt from '@/components/auth/LoginPrompt';
import { useAuth } from '@/contexts/AuthContext';
import { bookAppointment, formatTimeForAPI } from '@/services/appointment';
import type { AppointmentRequest } from '@/types/appointment';

export default function PaymentPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { isAuthenticated, isLoading, user } = useAuth();

    // Get booking details from URL
    const slot = searchParams.get('slot');
    const apiDate = searchParams.get('apiDate');
    const apiTime = searchParams.get('apiTime');
    const patientId = searchParams.get('patientId');
    const visitType = searchParams.get('visitType') as "Online" | "Offline" || "Offline";
    const bookingType = searchParams.get('bookingType') as "CHECKUP" | "Follow-Up" || "CHECKUP";
    const reason = searchParams.get('reason') || "Regular checkup";
    const patientName = searchParams.get('patientName');
    const doctorNameParam = searchParams.get('doctorName');
    const doctorSpecializationParam = searchParams.get('doctorSpecialization');

    // Fetch doctor data
    const doctorIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const doctorId = parseInt(doctorIdStr, 10);

    // State for doctor data
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [isLoadingDoctor, setIsLoadingDoctor] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [step, setStep] = useState<'summary' | 'method'>('summary');
    const [selectedMethod, setSelectedMethod] = useState('paytm');
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        const fetchDoctor = async () => {
            if (doctorId) {
                try {
                    const data = await getDoctorById(doctorId);
                    if (data) {
                        setDoctor(data);
                    } else {
                        // Fallback if API returns null but no error thrown
                        throw new Error("Doctor not found in API");
                    }
                } catch (error: any) {
                    console.error("Failed to fetch doctor:", error);
                    setError(error.message || "Failed to load doctor details");

                    // Fallback to URL params if available
                    if (doctorNameParam) {
                        setDoctor({
                            id: doctorId,
                            full_name: doctorNameParam,
                            specialization: doctorSpecializationParam || 'Specialist',
                            consultation_fee: 700, // Default fee
                            photo_url: '/doctor.png',
                            experience_years: 0,
                            hospital_name: 'Healthezy Hospital'
                        } as any);
                    }
                } finally {
                    setIsLoadingDoctor(false);
                }
            } else {
                setIsLoadingDoctor(false);
            }
        };

        fetchDoctor();
    }, [doctorId, doctorNameParam, doctorSpecializationParam]);

    const consultationFee = doctor?.consultation_fee ? Number(doctor.consultation_fee) : 700.00;
    const charges = {
        appointment: consultationFee,
        emergency: 0.00,
        other: 0.00,
        total: consultationFee
    };

    if (isLoadingDoctor) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#009ca6]"></div>
                    <p className="mt-4 text-gray-600">Loading doctor details...</p>
                </div>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
                {error && <p className="text-red-500 mb-4">Error: {error}</p>}
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

    const handleConfirm = async () => {
        if (!patientId || !apiDate || !apiTime) {
            alert('Missing booking details. Please try again.');
            return;
        }

        setIsBooking(true);
        try {
            const appointmentData: AppointmentRequest = {
                patient_id: parseInt(patientId),
                doctor_id: doctorId,
                hospital_id: 1, // Defaulting as per previous logic
                department_id: 1, // Defaulting as per previous logic
                appointment_date: apiDate,
                appointment_time: formatTimeForAPI(apiTime),
                duration_minutes: 30,
                visit_type: visitType,
                booking_type: bookingType,
                reason_for_visit: reason,
                notes: `Appointment booked for ${doctor.full_name || doctor.first_name + ' ' + doctor.last_name} - ${doctor.specialization}`
            };

            const response = await bookAppointment(appointmentData);

            // Redirect to confirmation with appointment data
            const queryParams = new URLSearchParams({
                slot: slot || apiTime,
                date: searchParams.get('date') || apiDate || '',
                appointmentId: response.id.toString(),
                appointmentNumber: response.appointment_number,
                patientName: patientName || ''
            });

            router.push(`/doctors/${doctor.id}/booking-confirmation?${queryParams.toString()}`);
        } catch (error: any) {
            console.error('Booking failed:', error);
            alert(`Payment successful but booking failed: ${error.response?.data?.detail || error.message}`);
        } finally {
            setIsBooking(false);
        }
    };

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
        return (
            <LoginPrompt
                message="Please login to continue with your payment"
                onClose={() => router.back()}
            />
        );
    }

    return (
        <div className="payment-container">
            <div className="payment-left-section">
                <div className="payment-doctor-card">
                    <div className="payment-doctor-image">
                        <Image
                            src={doctor.photo_url || '/doctor.png'}
                            alt={doctor.full_name || 'Doctor'}
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="payment-doctor-details">
                        <h3>{doctor.full_name || `${doctor.first_name || ''} ${doctor.last_name || ''}`.trim()}</h3>
                        <p>{doctor.specialization}</p>
                        <p>{doctor.hospital_name}</p>
                    </div>
                </div>

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
                        <button
                            className="btn-proceed w-full flex items-center justify-center gap-2"
                            onClick={handleConfirm}
                            disabled={isBooking}
                        >
                            {isBooking ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : 'Confirm Payment'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
