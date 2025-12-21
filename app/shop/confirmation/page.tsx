'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf } from '@react-pdf/renderer';
import { getProductById } from '@/data/shop';
import '@/components/doctors/Confirmation.css';

// PDF Styles - Identical to Pharmacy PDF Styles
const styles = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#ffffff', padding: 40, alignItems: 'center', fontFamily: 'Helvetica' },
    watermark: { position: 'absolute', top: 300, left: 50, fontSize: 80, color: '#0e8a93', fontWeight: 'extrabold', opacity: 0.1, transform: 'rotate(-45deg)' },
    headerBox: { marginBottom: 20, alignItems: 'center' },
    storeName: { fontSize: 24, color: '#0e5c63', marginBottom: 5, fontWeight: 'bold' },
    storeAddress: { fontSize: 12, color: '#555' },
    divider: { width: '80%', height: 1, backgroundColor: '#eeeeee', marginVertical: 20 },
    sectionTitle: { fontSize: 18, color: '#333', marginBottom: 10, fontWeight: 'bold' },
    row: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 5 },
    label: { fontSize: 12, color: '#444' },
    value: { fontSize: 12, fontWeight: 'bold' },
    total: { marginTop: 10, fontSize: 16, fontWeight: 'bold', color: '#0e8a93' },
    footer: { position: 'absolute', bottom: 30, fontSize: 10, color: '#aaaaaa' },
});

const ShopPDF = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.watermark}>Healthezy</Text>
            <View style={styles.headerBox}>
                <Text style={styles.storeName}>Healthezy Shop</Text>
                <Text style={styles.storeAddress}>Sustainable Healthcare Products</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Order For:</Text>
                <Text style={styles.value}>Healthcare Products</Text>
            </View>
            <Text style={styles.total}>Total Paid: Rs. {data.amount}</Text>

            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Customer Details</Text>
            <View style={styles.row}><Text style={styles.label}>Customer:</Text><Text style={styles.value}>{data.patient}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Date:</Text><Text style={styles.value}>{data.date}</Text></View>

            <Text style={styles.footer}>Ordered via Healthezy</Text>
        </Page>
    </Document>
);

function ShopConfirmationContent() {
    const [isClient, setIsClient] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const itemsParam = searchParams.get('items') || '';
    const amount = searchParams.get('amount') || '0';
    const date = searchParams.get('date') || new Date().toLocaleDateString();

    // Parse items for breakdown
    const cartItems = itemsParam.split(',').filter(Boolean).map(item => {
        const [prodId, qtyStr] = item.split(':');
        return { prodId, qty: parseInt(qtyStr, 10) };
    });

    const selectedProducts = cartItems.map(item => {
        const prod = getProductById(item.prodId);
        if (!prod) return null;
        return {
            ...prod,
            qty: item.qty,
            totalPrice: prod.price * item.qty
        };
    }).filter(p => p !== null) as any[];

    useEffect(() => { setIsClient(true); }, []);

    const bookingDetails = {
        amount: amount,
        patient: 'Mr. User Name', // Placeholder
        date: date,
    };

    const handleDownload = async () => {
        if (isGenerating) return;
        setIsGenerating(true);
        try {
            const blob = await pdf(<ShopPDF data={bookingDetails} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Healthezy-shop-order.pdf';
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
                        <Image
                            src={selectedProducts[0]?.imageUrl || '/product.png'}
                            alt="Shop"
                            width={130}
                            height={130}
                        />
                    </div>
                    <h3>Healthezy Shop</h3>
                    <p>Sustainable Healthcare</p>
                    <p>India</p>
                </div>

                <div className="confirmation-details-section">
                    <h2 className="success-title">Order Confirmed For</h2>
                    <h3 className="patient-name">{bookingDetails.patient}</h3>

                    <div className="booking-info">
                        <p>{bookingDetails.date}</p>
                        <p>Products Ordered</p>
                    </div>

                    <div className="mt-4 mb-6 w-full">
                        <h4 className="font-bold mb-2 text-gray-700">Items:</h4>
                        {selectedProducts.map((item: any) => (
                            <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>• {item.name} (x{item.qty})</span>
                                <span className="font-semibold">₹{item.totalPrice.toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-gray-800">
                            <span>Total Paid:</span>
                            <span className="text-teal-600">₹{parseFloat(amount).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            className="download-btn"
                            onClick={handleDownload}
                            disabled={!isClient || isGenerating}
                        >
                            {isGenerating ? 'Generating...' : 'Download PDF'}
                        </button>
                        <button
                            className="download-btn"
                            onClick={() => router.push('/shop')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ShopConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopConfirmationContent />
        </Suspense>
    );
}
