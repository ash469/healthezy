'use client';

import { Product } from '@/data/shop';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, cartItems, updateQty } = useCart();
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
        <div className="product-card">
            <div className="product-image-area">
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
                {cartItem ? (
                    <div className="qty-control" style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: 'center' }}>
                        <button className="qty-btn" onClick={() => updateQty(product.id, cartItem.qty - 1)}>-</button>
                        <span className="qty-val">{cartItem.qty}</span>
                        <button className="qty-btn" onClick={() => updateQty(product.id, cartItem.qty + 1)}>+</button>
                    </div>
                ) : (
                    <button className="btn-add-cart" onClick={handleAddToCart}>
                        Add To Cart
                    </button>
                )}
                <Link href={`/shop/${product.id}`} className="btn-view" style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    View Product
                </Link>
            </div>
        </div>
    );
}
