'use client';

import { useState, useEffect } from 'react';
import LabCard from '@/components/labs/LabCard';
import '@/components/labs/Labs.css';
import '@/components/header-main.css';
import { getAllLabs } from '@/services/lab';
import type { LabResponse } from '@/types/lab';

export default function LabsPage() {
    const [labs, setLabs] = useState<LabResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Default');

    useEffect(() => {
        const fetchLabs = async () => {
            try {
                setLoading(true);
                const data = await getAllLabs();
                setLabs(data || []);
            } catch (err: any) {
                console.error('Failed to fetch labs:', err);
                setError('Laboratory synchronization failed. Please check your network connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchLabs();
    }, []);

    // Filter Logic
    const filteredLabs = labs.filter(lab =>
        lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lab.city && lab.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lab.address && lab.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
        lab.lab_code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sorting Logic
    const sortedLabs = [...filteredLabs].sort((a, b) => {
        if (sortBy === 'Rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'Name') return a.name.localeCompare(b.name);
        return 0;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-20">
                <div className="w-10 h-10 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.3em] font-sans">Scanning Network Assets</p>
            </div>
        );
    }

    return (
        <div className="labs-container">
            <div className="page-header">
                <div className="header-row">
                    <h1 className="page-title">Labs</h1>

                    {/* Search Bar */}
                    <div className="search-container">
                        <div className="search-wrapper">
                            <div className="search-icon">🔍</div>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by name, city, or code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="filters-container">
                        <div className="filter-group">
                            <select
                                className="filter-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="Default">Sort by</option>
                                <option value="Rating">Top Rated</option>
                                <option value="Name">A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {error ? (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-16 text-center max-w-xl mx-auto shadow-sm">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-50">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">Sync Error</h3>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed mb-8">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gray-900 text-white px-10 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200"
                    >
                        Reconnect
                    </button>
                </div>
            ) : sortedLabs.length > 0 ? (
                <div className="labs-list">
                    {sortedLabs.map((lab) => (
                        <LabCard key={lab.id} lab={lab} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-8">
                    <p className="text-gray-500 text-lg">
                        No laboratories match your search.
                    </p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className="mt-4 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
