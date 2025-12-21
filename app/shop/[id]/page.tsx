'use client';

import { useParams } from 'next/navigation';
import { getProductById } from '@/data/shop';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import '@/components/shop/Shop.css';

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const product = getProductById(id);
    const { addToCart, cartItems, updateQty } = useCart();
    if (!product) {
        return <div className="p-10 text-center">Product not found</div>;
    }

    const cartItem = cartItems.find(item => item.id === product.id);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            imageUrl: product.imageUrl,
            type: 'product'
        });
    };

    return (
        <div className="shop-container" style={{ paddingTop: '40px' }}>
            <Link href="/shop" className="text-gray-500 hover:text-[#0e5c63] mb-6 inline-block" style={{ textDecoration: 'none' }}>
                ← Back to Shop
            </Link>

            <div className="product-card" style={{ display: 'flex', flexDirection: 'row', gap: '40px', textAlign: 'left', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="product-img"
                        style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', maxHeight: '400px' }}
                    />
                </div>

                <div style={{ width: '100%' }}>
                    <h1 className="shop-title" style={{ fontSize: '2rem', marginBottom: '10px' }}>{product.name}</h1>
                    <div className="product-price" style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#0e5c63' }}>₹{product.price}</div>

                    <p className="product-desc" style={{ fontSize: '1rem', marginBottom: '30px' }}>
                        {product.description}
                    </p>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        {cartItem ? (
                            <div className="qty-control" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <button
                                    className="qty-btn"
                                    onClick={() => updateQty(product.id, cartItem.qty - 1)}
                                    style={{ padding: '5px 15px', fontSize: '1.2rem', cursor: 'pointer', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px' }}
                                >
                                    -
                                </button>
                                <span className="qty-val" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{cartItem.qty}</span>
                                <button
                                    className="qty-btn"
                                    onClick={() => updateQty(product.id, cartItem.qty + 1)}
                                    style={{ padding: '5px 15px', fontSize: '1.2rem', cursor: 'pointer', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px' }}
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                className="btn-add-cart"
                                style={{ padding: '15px 30px', fontSize: '1.1rem' }}
                            >
                                Add To Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
