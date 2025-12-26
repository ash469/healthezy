'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { getHospitalById } from '@/data/hospitals';
import { getDoctorsByHospitalId } from '@/data/doctors';
import '@/components/doctors/Doctors.css'; // Reusing exact CSS
import Link from 'next/link';

export default function HospitalDoctorsPage() {
    const params = useParams();
    const router = useRouter();
    const hospitalIdStr = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const hospitalId = parseInt(hospitalIdStr, 10);
    const hospital = getHospitalById(hospitalId);

    const [filterGender, setFilterGender] = useState<string>('Gender');
    const [sortBy, setSortBy] = useState<string>('Sort by');

    if (!hospital) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Hospital Not Found</h2>
                <button
                    onClick={() => router.push('/hospital')}
                    className="bg-[#0e8a93] text-white px-6 py-2 rounded-lg hover:bg-[#0b6c73] transition-colors"
                >
                    Back to Hospitals
                </button>
            </div>
        );
    }

    // Fetch doctors for this hospital using the helper function
    const doctors = getDoctorsByHospitalId(hospitalId);

    // Filter Logic
    const filteredDoctors = doctors.filter((doctor) => {
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
                <h1 className="doctors-title">Doctors at {hospital.name}</h1>

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
                {sortedDoctors.length > 0 ? (
                    sortedDoctors.map((doctor) => (

                        <div key={doctor.id} className="doctor-card">
                            <div className="doctor-info-section">
                                <div className="doctor-image-container">
                                    <img
                                        src={doctor.photoUrl || '/doctor.png'}
                                        alt={doctor.fullName || 'Doctor'}
                                        className="doctor-image"
                                    />
                                </div>
                                <div className="doctor-details">
                                    <h3 className="doctor-name">{doctor.fullName}</h3>
                                    <p className="doctor-specialty">{doctor.specialization}</p>
                                    <p className="doctor-hospital">{hospital.name} | Fees - ₹{doctor.consultationFee}/-</p>
                                    <div className="doctor-rating">
                                        <span className="rating-tag">{doctor.rating} ★</span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={`/hospital/${hospital.id}/doctors/${doctor.id}/book`}
                                className="book-btn"
                            >
                                Book Appointment
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No doctors found at this hospital.
                    </div>
                )}
            </div>
        </div>
    );
}
