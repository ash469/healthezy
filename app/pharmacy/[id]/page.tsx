'use client';

import { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPharmacyById } from '@/data/pharmacy';
import { Medicine } from '@/types/pharmacy';
import Image from 'next/image';
import '@/components/pharmacy/Pharmacy.css';

export default function PharmacyPurchasePage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const pharmacy = getPharmacyById(id);

    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [showChatModal, setShowChatModal] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'pharmacist', text: string }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!pharmacy) {
        return <div className="p-10 text-center">Pharmacy not found</div>;
    }

    const handleQuantityChange = (medicineId: string, delta: number) => {
        setCart(prev => {
            const currentQty = prev[medicineId] || 0;
            const newQty = Math.max(0, currentQty + delta);
            const newCart = { ...prev, [medicineId]: newQty };
            if (newQty === 0) delete newCart[medicineId];
            return newCart;
        });
    };

    const cartCount = Object.keys(cart).length;

    const handleProceed = () => {
        if (cartCount > 0) {
            // Pass cart items as "id:qty,id:qty" string
            const cartItemsParam = Object.entries(cart)
                .map(([id, qty]) => `${id}:${qty}`)
                .join(',');

            router.push(`/pharmacy/${id}/payment?items=${cartItemsParam}`);
        }
    };

    const filteredMedicines = pharmacy.availableMedicines.filter(med =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (med.description && med.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Handle prescription upload
    const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            // TODO: Send file to backend API
            // const formData = new FormData();
            // formData.append('prescription', file);
            // formData.append('pharmacyId', id);
            // await fetch('/api/pharmacy/upload-prescription', { method: 'POST', body: formData });

            alert(`Prescription uploaded: ${file.name}\n\nThis will be sent to the backend for processing.`);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // Handle chat
    const handleSendMessage = () => {
        if (chatMessage.trim()) {
            setChatMessages(prev => [...prev, { sender: 'user', text: chatMessage }]);

            // TODO: Send message to backend API
            // await fetch('/api/pharmacy/chat', {
            //     method: 'POST',
            //     body: JSON.stringify({ pharmacyId: id, message: chatMessage })
            // });

            // Simulate pharmacist response
            setTimeout(() => {
                setChatMessages(prev => [...prev, {
                    sender: 'pharmacist',
                    text: 'Thank you for your message. Our pharmacist will respond shortly.'
                }]);
            }, 1000);

            setChatMessage('');
        }
    };

    return (
        <div className="pharmacy-booking-container">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handlePrescriptionUpload}
                className="hidden"
            />

            {/* Absolute Cart Icon */}
            <div className="cart-icon-absolute" onClick={handleProceed} title={cartCount === 0 ? "Select medicines first" : "Proceed to Purchase"}>
                <div style={{ position: 'relative' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="cart-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>

                    {/* Plus sign inside cart */}
                    <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '12px', color: '#006064' }}>+</div>

                    {cartCount > 0 && (
                        <span className="cart-badge">
                            {cartCount}
                        </span>
                    )}
                </div>
            </div>

            {/* Header Area */}
            <div className="pharmacy-header-layout">
                {/* Banner */}
                <div className="pharmacy-banner">
                    <Image
                        src={pharmacy.imageUrl}
                        alt={pharmacy.name}
                        width={120}
                        height={120}
                        className="pharmacy-banner-image"
                    />
                    <div className="pharmacy-banner-info">
                        <h1>{pharmacy.name}</h1>
                        <p>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {pharmacy.address}
                        </p>
                        <p>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            9876543210
                        </p>
                    </div>
                </div>

                {/* Upload Prescription Card - Now Functional */}
                <div className="upload-prescription-card" onClick={handleUploadClick}>
                    <div className="upload-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                    </div>
                    <div className="upload-text-sub">Click Here To Browse</div>
                    <div className="upload-text-main">Upload Your Prescription</div>
                    {uploadedFile && (
                        <div className="text-xs mt-2 opacity-80">
                            ✓ {uploadedFile.name}
                        </div>
                    )}
                </div>
            </div>

            {/* Actions: Search & Chat */}
            <div className="actions-row">
                <div className="pharmacy-search-wrapper">
                    <div className="pharmacy-search-icon-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <input
                        type="text"
                        className="pharmacy-search-input"
                        placeholder="Search Your Medicine Here"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button className="chat-btn" onClick={() => setShowChatModal(true)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    Chat With Us
                </button>
            </div>

            {/* Grid */}
            <div className="medicine-grid">
                {filteredMedicines.map(med => {
                    const qty = cart[med.id] || 0;
                    return (
                        <div key={med.id} className="medicine-card">
                            <div>
                                <h3 className="medicine-title">{med.name}</h3>
                                <p className="medicine-subtitle">{med.description || 'Paracetamol 650'}</p>

                                <div className="medicine-price-row">
                                    <div className="medicine-price">{med.price.toFixed(2)}/-</div>

                                    <div className="medicine-actions">
                                        {qty > 0 ? (
                                            <div className="qty-control">
                                                <button className="qty-btn" onClick={() => handleQuantityChange(med.id, -1)}>-</button>
                                                <span className="qty-val">{qty}</span>
                                                <button className="qty-btn" onClick={() => handleQuantityChange(med.id, 1)}>+</button>
                                            </div>
                                        ) : null}

                                        {!qty && (
                                            <button className="add-btn" onClick={() => handleQuantityChange(med.id, 1)}>
                                                Add To Cart
                                            </button>
                                        )}

                                        <span className="know-more">Know More →</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Chat Modal - Glassmorphic Design */}
            {showChatModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowChatModal(false)}>
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>

                        {/* Header with Gradient */}
                        <div className="bg-gradient-to-r from-[#009ca6] to-[#0D5C63] p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                        </svg>
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#009ca6] rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{pharmacy.name}</h3>
                                    <p className="text-xs text-white/80">Online & Ready to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowChatModal(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                            <div className="flex justify-center my-4">
                                <span className="text-xs text-gray-400 bg-gray-200/50 px-3 py-1 rounded-full">Today</span>
                            </div>

                            {chatMessages.length === 0 ? (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] bg-white text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100">
                                        <p className="text-sm leading-relaxed">Hello! I'm here to help you with your medicine queries. How can I assist you today?</p>
                                    </div>
                                </div>
                            ) : (
                                chatMessages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === 'user'
                                                ? 'bg-[#009ca6] text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                            <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                                <input
                                    type="text"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009ca6]/50 focus:border-[#009ca6] transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!chatMessage.trim()}
                                    className="bg-[#009ca6] hover:bg-[#00858e] disabled:opacity-50 text-white p-3 rounded-xl transition-colors shadow-lg shadow-[#009ca6]/20"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 transform -rotate-45 translate-x-1">
                                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}