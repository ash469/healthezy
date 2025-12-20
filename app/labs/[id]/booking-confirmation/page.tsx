'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf } from '@react-pdf/renderer';
import '@/components/doctors/Confirmation.css';
import { getLabById } from '@/data/labs';

// --- PDF Styles (Reused/Adapted) ---
const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#ffffff', padding: 40, alignItems: 'center', fontFamily: 'Helvetica' },
    watermark: { position: 'absolute', top: 300, left: 50, fontSize: 80, color: '#0e8a93', fontWeight: 'extrabold', opacity: 0.1, transform: 'rotate(-45deg)' },
    headerBox: { marginBottom: 20, alignItems: 'center' },
    labName: { fontSize: 24, color: '#0e5c63', marginBottom: 5, fontWeight: 'bold' },
    labAddress: { fontSize: 12, color: '#555' },
    divider: { width: '80%', height: 1, backgroundColor: '#eeeeee', marginVertical: 20 },
    sectionTitle: { fontSize: 18, color: '#333', marginBottom: 10, fontWeight: 'bold' },
    row: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 5 },
    label: { fontSize: 12, color: '#444' },
    value: { fontSize: 12, fontWeight: 'bold' },
    total: { marginTop: 10, fontSize: 16, fontWeight: 'bold', color: '#0e8a93' },
    footer: { position: 'absolute', bottom: 30, fontSize: 10, color: '#aaaaaa' },
});

const LabPDF = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.watermark}>HEALTHEZY</Text>
            <View style={styles.headerBox}>
                <PDFImage src={data.lab.imageUrl} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }} />
                <Text style={styles.labName}>{data.lab.name}</Text>
                <Text style={styles.labAddress}>{data.lab.address}</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Tests Booked</Text>
            {data.tests.map((t: any) => (
                <View key={t.id} style={styles.row}>
                    <Text style={styles.label}>{t.name}</Text>
                    <Text style={styles.value}>Rs. {t.price}</Text>
                </View>
            ))}

            <Text style={styles.total}>Total: Rs. {data.total}</Text>

            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Appointment Details</Text>
            <View style={styles.row}><Text style={styles.label}>Patient:</Text><Text style={styles.value}>{data.patient}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Date:</Text><Text style={styles.value}>{data.date}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Slot:</Text><Text style={styles.value}>{data.time}</Text></View>

            <Text style={styles.footer}>Booked via Healthezy</Text>
        </Page>
    </Document>
);

export default function LabConfirmationPage() {
    const [isClient, setIsClient] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const labId = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const lab = getLabById(labId);

    const date = searchParams.get('date') || 'N/A';
    const slot = searchParams.get('slot') || 'N/A';
    const testIds = searchParams.get('tests')?.split(',') || [];
    const selectedTests = lab?.availableTests.filter(t => testIds.includes(t.id)) || [];

    useEffect(() => { setIsClient(true); }, []);

    if (!lab) return <div>Lab not found</div>;

    const bookingDetails = {
        lab: lab,
        tests: selectedTests,
        total: selectedTests.reduce((sum, t) => sum + t.price, 0),
        patient: 'Mr. Rahul Mishra',
        date: date,
        time: slot
    };

    const handleDownload = async () => {
        if (isGenerating) return;
        setIsGenerating(true);
        try {
            const blob = await pdf(<LabPDF data={bookingDetails} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'healthezy-lab-appointment.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <div className="confirmation-doctor-section">
                    <div className="conf-doc-img">
                        <Image src={lab.imageUrl} alt={lab.name} width={130} height={130} />
                    </div>
                    <h3>{lab.name}</h3>
                    <p>{lab.address}</p>
                </div>

                <div className="confirmation-details-section">
                    <h2 className="success-title">Lab Test Booked For</h2>
                    <h3 className="patient-name">{bookingDetails.patient}</h3>

                    <div className="booking-info">
                        <p>{bookingDetails.date}</p>
                        <span className="slot-time-pill">{bookingDetails.time}</span>
                    </div>

                    <div style={{ margin: '1rem 0', textAlign: 'left', width: '100%' }}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Tests:</h4>
                        {selectedTests.map(t => (
                            <div key={t.id} style={{ fontSize: '0.9rem', color: '#555' }}>• {t.name}</div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            className="download-btn"
                            onClick={handleDownload}
                            disabled={!isClient || isGenerating}
                            style={{ opacity: isGenerating ? 0.7 : 1 }}
                        >
                            {isGenerating ? 'Generating...' : 'Download PDF'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
