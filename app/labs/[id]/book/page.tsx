'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getLabById, getLabTests, bookLabTest } from '@/services/lab';
import { LabResponse, LabTestResponse } from '@/types/lab';
import '@/components/labs/LabBooking.css';
import { useAuth } from '@/contexts/AuthContext';
import LoginPrompt from '@/components/auth/LoginPrompt';
import { getMyPatients } from '@/services/patient';
import type { Patient } from '@/types/patient';
import Link from 'next/link';

export default function LabBookingPage() {
    const params = useParams();
    const router = useRouter();
    const labIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const labId = parseInt(labIdStr, 10);

    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const [lab, setLab] = useState<LabResponse | null>(null);
    const [tests, setTests] = useState<LabTestResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTests, setSelectedTests] = useState<LabTestResponse[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    
    // New states for patient and date selection
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingStatus, setBookingStatus] = useState('');
    const [isFetchingPatients, setIsFetchingPatients] = useState(false);

    useEffect(() => {
        if (!labId) return;

        async function fetchData() {
            setLoading(true);
            try {
                const [labData, testsData] = await Promise.all([
                    getLabById(labId),
                    getLabTests(labId)
                ]);
                setLab(labData);
                setTests(testsData || []);
            } catch (error) {
                console.error("Failed to fetch booking data", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [labId]);

    // Fetch Patients
    useEffect(() => {
        async function fetchPatients() {
            if (!isAuthenticated) return;
            setIsFetchingPatients(true);
            try {
                const data = await getMyPatients();
                setPatients(data);
                if (data.length > 0) {
                    setSelectedPatientId(data[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch patients", error);
            } finally {
                setIsFetchingPatients(false);
            }
        }
        fetchPatients();
    }, [isAuthenticated]);

    const categories = useMemo(() => {
        const cats = new Set(tests.map(t => t.category));
        return ['All', ...Array.from(cats)];
    }, [tests]);

    const filteredTests = useMemo(() => {
        return tests.filter(test => {
            const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                test.test_code.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === 'All' || test.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [tests, searchQuery, categoryFilter]);

    const toggleTest = (test: LabTestResponse) => {
        setSelectedTests(prev => {
            const isSelected = prev.find(t => t.id === test.id);
            if (isSelected) {
                return prev.filter(t => t.id !== test.id);
            } else {
                return [...prev, test];
            }
        });
    };

    const totalPrice = selectedTests.reduce((sum, test) => sum + Number(test.test_price || 0), 0);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-teal-600">Loading Booking Page...</div>
            </div>
        );
    }

    if (!lab) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold mb-4">Laboratory Not Found</h2>
                <button onClick={() => router.push('/labs')} className="action-btn">Back to Labs</button>
            </div>
        );
    }

    return (
        <div className="lab-booking-container">
            {/* Header Section */}
            <div className="lab-header-section">
                <div className="lab-banner">
                    <Image
                        src={lab.logo_url || '/lab.png'}
                        alt={lab.name}
                        width={100}
                        height={100}
                        className="lab-banner-image"
                        unoptimized={true}
                    />
                    <div className="lab-banner-info">
                        <p>{lab.type || 'Diagnostics'}</p>
                        <h1>{lab.name}</h1>
                        <p>{lab.address}, {lab.city}</p>
                    </div>
                </div>

                <div className="lab-header-sidebar">
                    <div className="cart-icon-container">
                        <div className="cart-icon">
                            🛒
                            {selectedTests.length > 0 && (
                                <span className="cart-plus-badge">{selectedTests.length}</span>
                            )}
                        </div>
                    </div>
                    {selectedTests.length > 0 && (
                        <div className="text-right">
                            <p className="text-sm text-gray-500 uppercase font-bold">Total Amount</p>
                            <p className="text-2xl font-black text-teal-800">₹{totalPrice.toFixed(2)}</p>
                            <button 
                                className="action-btn mt-2 w-full"
                                onClick={() => {
                                    if (isAuthenticated) {
                                        setIsModalOpen(true);
                                    } else {
                                        setShowAuthPrompt(true);
                                    }
                                }}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Search and Filters */}
            <div className="search-bar-container">
                {/* <div className="filter-row mb-4">
                    <div className="filter-group">
                        <label className="filter-label">Category</label>
                        <select 
                            className="filter-select"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div> */}
                <div className="search-input-wrapper">
                    <div className="search-icon">🔍</div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for tests (e.g. CBC, Thyroid...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Test Grid */}
            <div className="test-grid">
                {filteredTests.map((test) => {
                    const isSelected = selectedTests.find(t => t.id === test.id);
                    return (
                        <div key={test.id} className="test-card">
                            <div>
                                <h3 className="test-title">{test.name}</h3>
                                <p className="test-subtitle">{test.category}</p>
                                <div className="test-price">₹{test.test_price}</div>
                                <div className="test-features">
                                    <span className="feature-item">
                                        <span className="dot-icon">●</span> {test.sample_type}
                                    </span>
                                    <span className="feature-item">
                                        <span className="dot-icon">●</span> {test.turnaround_time_hours} hrs
                                    </span>
                                </div>
                            </div>
                            <div className="test-card-footer">
                                <button
                                    className={`add-btn ${isSelected ? 'added' : ''}`}
                                    onClick={() => toggleTest(test)}
                                >
                                    {isSelected ? '✓ Added' : '+ Add'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredTests.length === 0 && (
                <div className="text-center py-20 opacity-50">
                    <p className="text-xl">No tests found matching your criteria.</p>
                </div>
            )}

            {showAuthPrompt && (
                <LoginPrompt 
                    message="Please login to complete your laboratory booking" 
                    onClose={() => setShowAuthPrompt(false)} 
                />
            )}

            {/* Booking Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Confirm Booking</h2>
                                <p className="text-xs font-medium text-slate-500">Provide appointment details</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 px-2.5 py-2.5 rounded-lg hover:bg-white transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                {/* Patient Selection */}
                                <section>
                                    <h3 className="text-[11px] font-bold text-teal-600 mb-4 uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-5 h-5 bg-teal-600 text-white rounded flex items-center justify-center text-[9px] font-black">01</span>
                                        Select Patient
                                    </h3>
                                    {patients.length > 0 ? (
                                        <div className="grid gap-2.5">
                                            {patients.map(patient => (
                                                <div
                                                    key={patient.id}
                                                    onClick={() => setSelectedPatientId(patient.id)}
                                                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 group ${selectedPatientId === patient.id
                                                        ? 'border-teal-500 bg-teal-50/50'
                                                        : 'border-slate-100 hover:border-teal-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${selectedPatientId === patient.id ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'
                                                        }`}>
                                                        {patient.full_name.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className={`font-bold text-sm truncate ${selectedPatientId === patient.id ? 'text-teal-900' : 'text-slate-900'}`}>{patient.full_name}</div>
                                                        <div className="text-[10px] text-slate-500 font-semibold uppercase">{patient.gender} • {patient.age}Y</div>
                                                    </div>
                                                    {selectedPatientId === patient.id && (
                                                        <div className="text-teal-600">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                            <p className="text-xs font-semibold text-slate-400 mb-3 px-4 uppercase">No patient profiles found.</p>
                                            <Link
                                                href="/dashboard/patient"
                                                className="text-teal-600 text-xs font-bold hover:underline"
                                            >
                                                + Add Profile
                                            </Link>
                                        </div>
                                    )}
                                </section>

                                {/* Date Selection */}
                                <section className="md:border-l md:pl-8 border-slate-100">
                                    <h3 className="text-[11px] font-bold text-teal-600 mb-4 uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-5 h-5 bg-teal-600 text-white rounded flex items-center justify-center text-[9px] font-black">02</span>
                                        Booking Date
                                    </h3>
                                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 px-1 tracking-tight">Preferred Visit Date</label>
                                        <input 
                                            type="date" 
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 bg-white text-sm font-bold text-slate-700 outline-none transition-all"
                                        />
                                        <div className="mt-4 flex items-start gap-2.5 text-teal-700/70 p-3 bg-white/50 rounded-xl border border-teal-100/30">
                                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <p className="text-[10px] font-medium leading-relaxed">
                                                Samples are collected at the laboratory on your selected date.
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-white transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (!selectedPatientId || !selectedDate) return;
                                    setIsBooking(true);
                                    setBookingStatus('Verifying selection...');
                                    try {
                                        const testIds = selectedTests.map(t => t.id);
                                        const selectedPatient = patients.find(p => p.id === selectedPatientId);
                                        const patientName = selectedPatient ? selectedPatient.full_name : '';

                                        if (typeof bookLabTest !== 'function') {
                                            throw new Error("Critical error: Service not available. Please refresh.");
                                        }

                                        setBookingStatus('Creating booking...');
                                        const res = await bookLabTest({
                                            patient_id: selectedPatientId,
                                            lab_id: labId,
                                            test_ids: testIds,
                                            booking_date: selectedDate
                                        });

                                        setBookingStatus('Preparing confirmation...');
                                        const queryParams = new URLSearchParams({
                                            patientId: selectedPatientId.toString(),
                                            patientName: patientName,
                                            date: selectedDate,
                                            testIds: testIds.join(','),
                                            appointmentNumber: res.booking_number
                                        });
                                        router.push(`/labs/${labId}/booking-confirmation?${queryParams.toString()}`);
                                    } catch (error: any) {
                                        console.error("Booking failed", error);
                                        alert(error.message || "Failed to create booking.");
                                        setIsBooking(false);
                                    }
                                }}
                                disabled={!selectedPatientId || !selectedDate || isBooking}
                                className="flex-[1.5] px-5 py-3 rounded-xl bg-teal-600 text-white text-xs font-bold shadow-lg shadow-teal-600/10 hover:bg-teal-700 disabled:bg-slate-300 disabled:shadow-none transition-all"
                            >
                                {isBooking ? 'Processing...' : 'Confirm Lab Booking'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Loading Overlay */}
            {isBooking && (
                <div className="fixed inset-0 bg-white/90 backdrop-blur-md z-[200] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
                    <div className="relative w-24 h-24 mb-8">
                        {/* Outermost spinning ring */}
                        <div className="absolute inset-0 border-4 border-teal-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
                        
                        {/* Middle bouncing/scaling circle */}
                        <div className="absolute inset-4 bg-teal-500/20 rounded-full animate-pulse"></div>
                        
                        {/* Inner checkmark placeholder/pulsing dot */}
                        <div className="absolute inset-8 bg-teal-600 rounded-full shadow-lg shadow-teal-200 animate-bounce"></div>
                    </div>
                    
                    <h2 className="text-3xl font-black text-teal-800 mb-2 tracking-tight">
                        {bookingStatus || 'Processing...'}
                    </h2>
                    <p className="text-gray-500 font-medium max-w-xs mx-auto leading-relaxed">
                        We're securing your appointment and preparing your digital receipt.
                    </p>
                    
                    {/* Micro-animations: dots */}
                    <div className="flex gap-1.5 mt-6">
                        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
