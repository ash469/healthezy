'use client';

import { useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import '@/components/shop/Shop.css';
import { products } from '@/data/shop';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ShopPage() {
    const [sortBy, setSortBy] = useState('');
    const [filter, setFilter] = useState('');
    const { itemCount, cartItems } = useCart();

    return (
        <div className="shop-container">
            <div className="shop-header">
                <h1 className="shop-title">Sustain Health</h1>

                <div className="shop-actions-top">
                    <div className="filters-wrapper">
                        <div className="filter-group">
                            <label className="filter-label">Filter</label>
                            <select className="filter-select" onChange={(e) => setFilter(e.target.value)}>
                                <option value=""></option>
                                <option value="price">Price</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label className="filter-label">Sort by</label>
                            <select className="filter-select" onChange={(e) => setSortBy(e.target.value)}>
                                <option value=""></option>
                                <option value="low">Low to High</option>
                                <option value="high">High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div onClick={() => {
                        if (itemCount > 0) {
                            const cartItemsParam = cartItems
                                .map((item) => `${item.id}:${item.qty}`)
                                .join(',');
                            window.location.href = `/shop/payment?items=${cartItemsParam}`;
                        }
                    }} className="cart-icon-wrapper block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0e5c63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            <path d="M12 9l2 2l4 -4"></path>
                        </svg>
                        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                    </div>
                </div>
            </div>

            <div className="shop-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
