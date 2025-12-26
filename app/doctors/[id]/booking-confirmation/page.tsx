'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf } from '@react-pdf/renderer';
import '@/components/doctors/Confirmation.css';
import { getDoctorById } from '@/data/doctors';

// --- PDF Styles and Document Definition ---
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        alignItems: 'center',
        fontFamily: 'Helvetica',
    },
    watermark: {
        position: 'absolute',
        top: 300,
        left: 50,
        fontSize: 80,
        color: '#0e8a93',
        fontWeight: 'extrabold',
        opacity: 0.1,
        transform: 'rotate(-45deg)',
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: '#0e8a93',
        marginBottom: 20,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doctorName: {
        fontSize: 24,
        color: '#0e5c63',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    doctorSpecialty: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 5,
    },
    doctorId: {
        fontSize: 12,
        color: '#888888',
        marginBottom: 20,
    },
    divider: {
        width: '80%',
        height: 1,
        backgroundColor: '#eeeeee',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#333333',
        marginBottom: 15,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
        color: '#444444',
        marginBottom: 5,
    },
    value: {
        fontSize: 14,
        marginBottom: 15,
    },
    highlightValue: {
        fontSize: 24,
        color: '#0e8a93',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        fontSize: 10,
        color: '#aaaaaa',
    },
});

const AppointmentPDF = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.watermark}>Healthezy</Text>

            <View style={styles.imageContainer}>
                <PDFImage src={data.doctor.imageUrl} />
            </View>

            <Text style={styles.doctorName}>{data.doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{data.doctor.specialty}</Text>
            <Text style={styles.doctorId}>{data.doctor.hospital}</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Appointment Details</Text>

            <Text style={styles.label}>Patient:</Text>
            <Text style={[styles.value, { fontWeight: 'bold' }]}>{data.patient}</Text>

            <Text style={styles.highlightValue}>{data.time}</Text>
            <Text style={styles.value}>{data.date}</Text>

            <Text style={styles.footer}>Booked via Healthezy</Text>
        </Page>
    </Document>
);

export default function BookingConfirmationPage() {
    const [isClient, setIsClient] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const doctorIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const doctorId = parseInt(doctorIdStr, 10);
    const doctor = getDoctorById(doctorId);

    const date = searchParams.get('date') || '25 Nov 2025 | Tuesday';
    const slot = searchParams.get('slot') || '10:00';

    useEffect(() => {
        setIsClient(true);
    }, []);

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

    const bookingDetails = {
        doctor: {
            imageUrl: doctor.photoUrl || '/doctor.png',
            name: doctor.fullName || 'Doctor',
            specialty: doctor.specialization || '',
            hospital: doctor.hospitalName || ''
        },
        patient: 'Mr. Rahul Mishra',
        date: date,
        time: slot,
        slot: 'Confirmed Slot'
    };

    const handleDownload = async () => {
        if (isGenerating) return;
        setIsGenerating(true);
        try {
            const blob = await pdf(<AppointmentPDF data={bookingDetails} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Healthezy-appointment.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <div className="confirmation-doctor-section">
                    <div className="conf-doc-img">
                        <Image
                            src={doctor.photoUrl || '/doctor.png'}
                            alt={doctor.fullName || 'Doctor'}
                            width={130}
                            height={130}
                        />
                    </div>
                    <h3>{doctor.fullName}</h3>
                    <p>{doctor.specialization}</p>
                    <p>{doctor.hospitalName}</p>
                </div>

                <div className="confirmation-details-section">
                    <h2 className="success-title">Appointment Booked For</h2>
                    <h3 className="patient-name">{bookingDetails.patient}</h3>

                    <div className="booking-info">
                        <p>{bookingDetails.date}</p>
                        <p>{bookingDetails.slot}</p>
                        <span className="slot-time-pill">
                            {bookingDetails.time}
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            className="download-btn"
                            onClick={handleDownload}
                            disabled={!isClient || isGenerating}
                            style={{ opacity: isGenerating ? 0.7 : 1, cursor: isGenerating ? 'not-allowed' : 'pointer' }}
                        >
                            {isGenerating ? 'Generating...' : 'Download PDF'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
