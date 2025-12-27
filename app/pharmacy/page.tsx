'use client';

import { useState } from 'react';
import PharmacyCard from '@/components/pharmacy/PharmacyCard';
import '@/components/pharmacy/Pharmacy.css';
import '@/components/header-main.css';
import { pharmacies } from '@/data/pharmacy';

export default function PharmacyPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Sort by');

    // Filter Logic
    const filteredPharmacies = pharmacies.filter(pharmacy =>
        pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pharmacy.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sorting Logic
    const sortedPharmacies = [...filteredPharmacies].sort((a, b) => {
        if (sortBy === 'Rating') return b.rating - a.rating;
        // Basic sorting example, can be extended
        if (sortBy === 'Delivery Time') {
            const aTime = parseInt(a.deliveryTime || '0');
            const bTime = parseInt(b.deliveryTime || '0');
            return aTime - bTime;
        }
        return 0;
    });

    return (
        <div className="pharmacy-container">
            <div className="page-header">
                <div className="header-row">
                    <h1 className="page-title">Pharmacy</h1>

                    {/* Search Bar */}
                    <div className="search-container">
                        <div className="search-wrapper">
                            <div className="search-icon">🔍</div>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by name or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="filters-container">
                        <div className="filter-group">
                            <label className="filter-label">Sort by</label>
                            <select
                                className="filter-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option>Sort by</option>
                                <option>Rating</option>
                                <option>Delivery Time</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pharmacy-list">
                {sortedPharmacies.map((pharmacy) => (
                    <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
                ))}
            </div>
        </div>
    );
}
