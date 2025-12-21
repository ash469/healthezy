'use client';

import { Product } from '@/data/shop';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
    qty: number;
    onQuantityChange: (newQty: number) => void;
    onView: () => void;
}

export default function ProductCard({ product, qty, onQuantityChange, onView }: ProductCardProps) {

    return (
        <div className="product-card">
            <div className="product-image-area" onClick={onView} style={{ cursor: 'pointer' }}>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="product-img"
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <div className="product-info-row">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">₹{product.price}</span>
            </div>
            <p className="product-desc">{product.description}</p>
            <div className="product-actions">
                {qty > 0 ? (
                    <div className="qty-control" style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: 'center' }}>
                        <button className="qty-btn" onClick={() => onQuantityChange(qty - 1)}>-</button>
                        <span className="qty-val">{qty}</span>
                        <button className="qty-btn" onClick={() => onQuantityChange(qty + 1)}>+</button>
                    </div>
                ) : (
                    <button className="btn-add-cart" onClick={() => onQuantityChange(1)}>
                        Add To Cart
                    </button>
                )}
                <div onClick={onView} className="btn-view" style={{ textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    View Product
                </div>
            </div>
        </div>
    );
}
