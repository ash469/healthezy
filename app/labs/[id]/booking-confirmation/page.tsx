'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf } from '@react-pdf/renderer';
import '@/components/doctors/Confirmation.css'; // Reusing doctor confirmation styles
import { getLabById, getLabTests } from '@/services/lab';
import { LabResponse, LabTestResponse } from '@/types/lab';

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
    labName: {
        fontSize: 24,
        color: '#0e5c63',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    labType: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 5,
    },
    labAddress: {
        fontSize: 12,
        color: '#888888',
        marginBottom: 20,
        textAlign: 'center',
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
        marginBottom: 10,
    },
    highlightValue: {
        fontSize: 20,
        color: '#0e8a93',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    testItem: {
        fontSize: 12,
        color: '#333333',
        marginBottom: 4,
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#0e5c63',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        fontSize: 10,
        color: '#aaaaaa',
    },
});

const LabBookingPDF = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.watermark}>Healthezy</Text>

            <View style={styles.imageContainer}>
                <PDFImage src={data.lab.imageUrl || '/lab.png'} />
            </View>

            <Text style={styles.labName}>{data.lab.name}</Text>
            <Text style={styles.labType}>{data.lab.type}</Text>
            <Text style={styles.labAddress}>{data.lab.address}, {data.lab.city}</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Lab Booking Summary</Text>

            <Text style={styles.label}>Patient Name:</Text>
            <Text style={[styles.value, { fontWeight: 'bold' }]}>{data.patient}</Text>

            <Text style={styles.label}>Booking Date:</Text>
            <Text style={styles.highlightValue}>{data.date}</Text>

            <View style={{ marginTop: 10, alignItems: 'flex-start', width: '100%' }}>
                <Text style={[styles.label, { fontWeight: 'bold' }]}>Selected Tests:</Text>
                {data.tests.map((test: any, index: number) => (
                    <Text key={index} style={styles.testItem}>
                        • {test.name} - ₹{test.test_price}
                    </Text>
                ))}
            </View>

            {data.appointmentNumber && (
                <>
                    <Text style={styles.label}>Booking ID:</Text>
                    <Text style={[styles.value, { fontWeight: 'bold' }]}>{data.appointmentNumber}</Text>
                </>
            )}

            <Text style={styles.totalAmount}>Total Amount: ₹{Number(data.totalPrice || 0).toFixed(2)}</Text>

            <Text style={styles.footer}>Booked via Healthezy</Text>
        </Page>
    </Document>
);

export default function LabBookingConfirmationPage() {
    const [isClient, setIsClient] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const labIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const labId = parseInt(labIdStr, 10);

    const [lab, setLab] = useState<LabResponse | null>(null);
    const [allTests, setAllTests] = useState<LabTestResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const patientName = searchParams.get('patientName') || 'Guest Patient';
    const dateStr = searchParams.get('date') || '';
    const testIdsStr = searchParams.get('testIds') || '';
    const appointmentNumber = searchParams.get('appointmentNumber') || '';

    useEffect(() => {
        setIsClient(true);
        const fetchData = async () => {
            if (labId) {
                try {
                    const [labData, testsData] = await Promise.all([
                        getLabById(labId),
                        getLabTests(labId)
                    ]);
                    setLab(labData);
                    setAllTests(testsData || []);
                } catch (error) {
                    console.error("Failed to fetch lab details:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchData();
    }, [labId]);

    const selectedTests = useMemo(() => {
        if (!testIdsStr) return [];
        const ids = testIdsStr.split(',').map(id => parseInt(id, 10));
        return allTests.filter(test => ids.includes(test.id));
    }, [allTests, testIdsStr]);

    const totalPrice = useMemo(() => {
        return selectedTests.reduce((sum, test) => sum + test.test_price, 0);
    }, [selectedTests]);

    const formattedDate = useMemo(() => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'long' });
    }, [dateStr]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] bg-white animate-in fade-in duration-700">
                <div className="relative w-20 h-20 mb-8">
                    <div className="absolute inset-0 border-4 border-teal-50 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-3 bg-teal-500/10 rounded-full animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-black text-teal-900 mb-2">Almost there...</h2>
                <p className="text-gray-500 font-medium">Finalising your digital confirmation and receipt</p>
                
                <div className="mt-8 flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce"></div>
                </div>
            </div>
        );
    }

    if (!lab) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Laboratory Not Found</h2>
                <button
                    onClick={() => router.push('/labs')}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg mt-4"
                >
                    Back to Labs
                </button>
            </div>
        );
    }

    const bookingDetails = {
        lab: {
            imageUrl: lab.logo_url || '/lab.png',
            name: lab.name,
            type: lab.type || 'Diagnostics',
            address: lab.address,
            city: lab.city
        },
        patient: patientName,
        date: formattedDate,
        tests: selectedTests,
        totalPrice: totalPrice,
        appointmentNumber: appointmentNumber
    };

    const handleDownload = async () => {
        if (isGenerating) return;
        setIsGenerating(true);
        try {
            const blob = await pdf(<LabBookingPDF data={bookingDetails} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Healthezy-Lab-Booking-${lab.name.replace(/\s+/g, '-')}.pdf`;
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
                            src={lab.logo_url || '/lab.png'}
                            alt={lab.name}
                            width={130}
                            height={130}
                            unoptimized={true}
                        />
                    </div>
                    <h3>{lab.name}</h3>
                    <p>{lab.type || 'Diagnostics'}</p>
                    <p>{lab.address}, {lab.city}</p>
                </div>

                <div className="confirmation-details-section">
                    <h2 className="success-title">Lab Booking Confirmed For</h2>
                    <h3 className="patient-name">{bookingDetails.patient}</h3>

                    {appointmentNumber && (
                        <p className="appointment-number" style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#009ca6', marginBottom: '10px' }}>
                            ID: {appointmentNumber}
                        </p>
                    )}

                    <div className="booking-info">
                        <p className="font-bold text-teal-800">{formattedDate}</p>
                        <div className="mt-4 text-left">
                            <p className="text-sm font-semibold text-gray-500 uppercase mb-2">Selected Tests:</p>
                            <ul className="space-y-1">
                                {selectedTests.map(test => (
                                    <li key={test.id} className="text-sm flex justify-between">
                                        <span>{test.name}</span>
                                        <span className="font-bold">₹{test.test_price}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-base font-bold">Total Amount</span>
                                <span className="text-xl font-black text-teal-600">₹{Number(totalPrice || 0).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-6">
                        <button
                            className="download-btn w-full"
                            onClick={handleDownload}
                            disabled={!isClient || isGenerating}
                        >
                            {isGenerating ? 'Generating...' : 'Download PDF Summary'}
                        </button>
                        <Link href="/dashboard/patient" className="text-center text-teal-600 font-bold hover:underline">
                            Go to My Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
