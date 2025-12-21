'use client';

import { useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import '@/components/shop/Shop.css';
import { products } from '@/data/shop';
import Link from 'next/link';

export default function ShopPage() {
    const [sortBy, setSortBy] = useState('');
    const [filter, setFilter] = useState('');
    // Local cart state: { [productId]: quantity }
    const [cart, setCart] = useState<{ [key: string]: number }>({});

    // State for the product currently being viewed in the modal
    const [viewProduct, setViewProduct] = useState<string | null>(null);

    const handleQuantityChange = (productId: string, newQty: number) => {
        setCart(prev => {
            const updated = { ...prev };
            if (newQty <= 0) {
                delete updated[productId];
            } else {
                updated[productId] = newQty;
            }
            return updated;
        });
    };

    const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

    const selectedProduct = viewProduct ? products.find(p => p.id === viewProduct) : null;

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
                            const cartItemsParam = Object.entries(cart)
                                .map(([id, qty]) => `${id}:${qty}`)
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
                    <ProductCard
                        key={product.id}
                        product={product}
                        qty={cart[product.id] || 0}
                        onQuantityChange={(newQty) => handleQuantityChange(product.id, newQty)}
                        onView={() => setViewProduct(product.id)}
                    />
                ))}
            </div>

            {/* Glassmorphic Modal for Product Details */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setViewProduct(null)}>
                    <div
                        className="bg-white/90 backdrop-blur-md w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 relative"
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxHeight: '90vh', overflowY: 'auto' }}
                    >
                        <button
                            onClick={() => setViewProduct(null)}
                            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={selectedProduct.imageUrl}
                                alt={selectedProduct.name}
                                className="max-w-full max-h-[300px] object-contain drop-shadow-lg"
                            />
                        </div>

                        <div className="w-full md:w-1/2 p-8 flex flex-col">
                            <h2 className="text-2xl font-bold text-[#0e5c63] mb-2">{selectedProduct.name}</h2>
                            <p className="text-3xl font-bold text-gray-800 mb-6">₹{selectedProduct.price}</p>

                            <div className="prose text-gray-600 mb-8 flex-1">
                                <p>{selectedProduct.description}</p>
                                <p className="mt-4 text-sm text-gray-400">Trusted Quality • Fast Delivery</p>
                            </div>

                            <div className="mt-auto">
                                {cart[selectedProduct.id] ? (
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                            <button
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-xl"
                                                onClick={() => handleQuantityChange(selectedProduct.id, cart[selectedProduct.id] - 1)}
                                            >-</button>
                                            <span className="px-6 py-2 font-bold text-lg min-w-[3rem] text-center">{cart[selectedProduct.id]}</span>
                                            <button
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-xl"
                                                onClick={() => handleQuantityChange(selectedProduct.id, cart[selectedProduct.id] + 1)}
                                            >+</button>
                                        </div>
                                        <span className="text-green-600 font-medium">Added to Cart</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleQuantityChange(selectedProduct.id, 1)}
                                        className="w-full py-4 bg-[#0e5c63] hover:bg-[#0b4a50] text-white font-bold rounded-xl shadow-lg shadow-[#0e5c63]/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
