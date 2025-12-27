'use client';

import { useState } from 'react';
import LabCard from '@/components/labs/LabCard';
import '@/components/labs/Labs.css';
import '@/components/header-main.css';
import { labs } from '@/data/labs';

export default function LabsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Sort by');

    // Filter Logic
    const filteredLabs = labs.filter(lab =>
        lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lab.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sorting Logic
    const sortedLabs = [...filteredLabs].sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Rating') return b.rating - a.rating;
        return 0;
    });

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
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Rating</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="labs-list">
                {sortedLabs.map((lab) => (
                    <LabCard key={lab.id} lab={lab} />
                ))}
            </div>
        </div>
    );
}
