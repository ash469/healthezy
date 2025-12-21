'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Document, Page, Text, View, StyleSheet, Image as PDFImage, pdf } from '@react-pdf/renderer';
import { getProductById } from '@/data/shop';
import '@/components/shop/Shop.css';

// PDF Styles
const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica' },
    header: { fontSize: 20, marginBottom: 20, textAlign: 'center', color: '#0e5c63', fontWeight: 'bold' },
    productSection: { flexDirection: 'row', marginBottom: 20 },
    productImage: { width: 100, height: 100, marginRight: 20 },
    details: { flex: 1 },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    price: { fontSize: 14, color: '#444' },
    divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
    total: { fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'right' }
});

const InvoicePDF = ({ product }: { product: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>Healthezy - Order Invoice</Text>
            <View style={styles.productSection}>
                {/* <PDFImage src={product.imageUrl} style={styles.productImage} /> Potential issue with relative paths in PDF, skipping image for stability */}
                <View style={styles.details}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>Qty: 1</Text>
                    <Text style={styles.price}>Price: {product.price}</Text>
                </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.total}>Total Paid: {product.price}</Text>
        </Page>
    </Document>
);

export default function ShopConfirmationPage() {
    const router = useRouter();
    const params = useParams();
    const productId = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const product = getProductById(productId);

    const [isClient, setIsClient] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => { setIsClient(true); }, []);

    if (!product) return <div>Product Not Found</div>;

    const handleDownload = async () => {
        if (isGenerating) return;
        setIsGenerating(true);
        try {
            const blob = await pdf(<InvoicePDF product={product} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice-${product.name}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="shop-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="product-card" style={{ width: '100%', maxWidth: '600px', padding: '40px' }}>
                <div style={{ background: '#0e8a93', padding: '20px', borderRadius: '12px', color: 'white', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
                        <Image src={product.imageUrl} alt={product.name} width={80} height={80} objectFit="contain" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Order Confirmed!</h2>
                        <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Thank you for your purchase.</p>
                    </div>
                </div>

                <div className="order-details" style={{ textAlign: 'left', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}>Product</span>
                        <span>{product.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Amount Paid</span>
                        <span style={{ fontWeight: 'bold', color: '#0e5c63' }}>₹{product.price}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <button
                        className="btn-view"
                        style={{ padding: '12px', fontSize: '1rem', background: '#0e5c63' }}
                        onClick={handleDownload}
                        disabled={!isClient || isGenerating}
                    >
                        {isGenerating ? 'Generating...' : 'Download Invoice'}
                    </button>
                    <button
                        className="btn-view"
                        style={{ padding: '12px', fontSize: '1rem', background: '#eee', color: '#333' }}
                        onClick={() => router.push('/shop')}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}
