'use client';

import { useState } from 'react';
import DoctorCard from '@/components/doctors/DoctorCard';
import '@/components/doctors/Doctors.css';
import '@/components/header-main.css';
import { doctors } from '@/data/doctors';

export default function DoctorsPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterGender, setFilterGender] = useState<string>('Gender');
    const [sortBy, setSortBy] = useState<string>('Sort by');

    // Filter Logic
    const filteredDoctors = doctors.filter(doctor => {
        // Search filter
        const matchesSearch = searchQuery === '' ||
            (doctor.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.specialization?.toLowerCase().includes(searchQuery.toLowerCase()));

        // Gender filter
        if (filterGender === 'Gender') return matchesSearch;
        return matchesSearch && doctor.gender === filterGender;
    });

    // Sort Logic
    const sortedDoctors = [...filteredDoctors].sort((a, b) => {
        if (sortBy === 'Fees: Low to High') {
            return (a.consultationFee || 0) - (b.consultationFee || 0);
        } else if (sortBy === 'Fees: High to Low') {
            return (b.consultationFee || 0) - (a.consultationFee || 0);
        } else if (sortBy === 'Experience') {
            const expA = a.experienceYears || parseInt(a.experience || '0');
            const expB = b.experienceYears || parseInt(b.experience || '0');
            return expB - expA;
        }
        return 0;
    });

    return (
        <div className="doctors-container">
            <div className="page-header">
                <div className="header-row">
                    <h1 className="page-title">Doctors</h1>

                    {/* Search Bar */}
                    <div className="search-container">
                        <div className="search-wrapper">
                            <div className="search-icon">🔍</div>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by name or specialization..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="filters-container">
                        <div className="filter-group">
                            <label className="filter-label">Filter</label>
                            <select
                                className="filter-select"
                                value={filterGender}
                                onChange={(e) => setFilterGender(e.target.value)}
                            >
                                <option>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label className="filter-label">Sort by</label>
                            <select
                                className="filter-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option>Sort by</option>
                                <option>Fees: Low to High</option>
                                <option>Fees: High to Low</option>
                                <option>Experience</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="doctors-list">
                {sortedDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
}
