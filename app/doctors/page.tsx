'use client';

import { useState } from 'react';
import DoctorCard from '@/components/doctors/DoctorCard';
import '@/components/doctors/Doctors.css';
import { doctors } from '@/data/doctors';

export default function DoctorsPage() {
    const [filterGender, setFilterGender] = useState<string>('Gender');
    const [sortBy, setSortBy] = useState<string>('Sort by');

    // Filter Logic
    const filteredDoctors = doctors.filter(doctor => {
        if (filterGender === 'Gender') return true;
        return doctor.gender === filterGender;
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
            <div className="doctors-header">
                <h1 className="doctors-title">Doctors</h1>

                <div className="doctors-filters">
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

            <div className="doctors-list">
                {sortedDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
}
