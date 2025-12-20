'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf } from '@react-pdf/renderer';
import '@/components/doctors/Confirmation.css';

// Mock data
const BOOKING_DETAILS = {
    doctor: {
        name: 'Dr. Kailash',
        specialty: 'Urologist | Apollo Hospital',
        id: 'MBA, MBBS',
        imageUrl: '/doctor.png',
    },
    patient: 'Mr. Rahul Mishra',
    date: '25 Nov 2025 | Tuesday',
    time: '10:00 AM',
    slot: 'Morning'
};

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

const AppointmentPDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.watermark}>HEALTHEZY</Text>

            <View style={styles.imageContainer}>
                <PDFImage src={BOOKING_DETAILS.doctor.imageUrl} />
            </View>

            <Text style={styles.doctorName}>{BOOKING_DETAILS.doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{BOOKING_DETAILS.doctor.specialty}</Text>
            <Text style={styles.doctorId}>{BOOKING_DETAILS.doctor.id}</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Appointment Details</Text>

            <Text style={styles.label}>Patient:</Text>
            <Text style={[styles.value, { fontWeight: 'bold' }]}>{BOOKING_DETAILS.patient}</Text>

            <Text style={styles.highlightValue}>{BOOKING_DETAILS.time}</Text>
            <Text style={styles.value}>{BOOKING_DETAILS.date}</Text>

            <Text style={styles.footer}>Booked via Healthezy</Text>
        </Page>
    </Document>
);

export default function BookingConfirmationPage() {
    const [isClient, setIsClient] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleDownload = async () => {
        if (isGenerating) return;
        setIsGenerating(true);
        try {
            const blob = await pdf(<AppointmentPDF />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'healthezy-appointment.pdf';
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
                            src={BOOKING_DETAILS.doctor.imageUrl}
                            alt={BOOKING_DETAILS.doctor.name}
                            width={130}
                            height={130}
                        />
                    </div>
                    <h3>{BOOKING_DETAILS.doctor.name}</h3>
                    <p>{BOOKING_DETAILS.doctor.specialty}</p>
                    <p>{BOOKING_DETAILS.doctor.id}</p>
                </div>

                <div className="confirmation-details-section">
                    <h2 className="success-title">Appointment Booked For</h2>
                    <h3 className="patient-name">{BOOKING_DETAILS.patient}</h3>

                    <div className="booking-info">
                        <p>{BOOKING_DETAILS.date}</p>
                        <p>{BOOKING_DETAILS.slot}</p>
                        <span className="slot-time-pill">
                            {BOOKING_DETAILS.time}
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
