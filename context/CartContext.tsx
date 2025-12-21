'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    qty: number;
    imageUrl: string;
    type: 'product' | 'medicine';
    pharmacyId?: string; // For medicine context
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQty: (id: string, qty: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Load from local storage on mount (optional but good for reload)
        const saved = localStorage.getItem('Healthezy-cart');
        if (saved) {
            try {
                setCartItems(JSON.parse(saved));
            } catch (e) { console.error('Failed to load cart', e); }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('Healthezy-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, item];
        });
    };

    const updateQty = (id: string, qty: number) => {
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, qty) } : item).filter(i => i.qty > 0));
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart, clearCart, cartTotal, itemCount }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};
