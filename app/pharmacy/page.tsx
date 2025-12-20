'use client';

import { useState } from 'react';
import PharmacyCard from '@/components/pharmacy/PharmacyCard';
import '@/components/pharmacy/Pharmacy.css';
import { pharmacies } from '@/data/pharmacy';

export default function PharmacyPage() {
    const [sortBy, setSortBy] = useState('Sort by');

    // Sorting Logic
    const sortedPharmacies = [...pharmacies].sort((a, b) => {
        if (sortBy === 'Rating') return b.rating - a.rating;
        // Basic sorting example, can be extended
        if (sortBy === 'Delivery Time') return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        return 0;
    });

    return (
        <div className="pharmacy-container">
            <div className="pharmacy-header">
                <div>
                    <h1 className="pharmacy-title">Pharmacy</h1>
                    {/* Reuse existing header or navbar logic if needed, but per design this is inside the container */}
                </div>

                <div className="pharmacy-filters">
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

            <div className="pharmacy-list">
                {sortedPharmacies.map((pharmacy) => (
                    <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
                ))}
            </div>
        </div>
    );
}
