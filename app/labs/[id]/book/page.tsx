'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { getLabById } from '@/data/labs';
import { Test } from '@/types/lab';
import '@/components/labs/LabBooking.css';

export default function LabBookingPage() {
    const router = useRouter();
    const params = useParams();
    const labId = Array.isArray(params.id) ? params.id[0] : (params.id || '');
    const lab = getLabById(labId);

    const [selectedTests, setSelectedTests] = useState<Test[]>([]);

    if (!lab) {
        return <div className="p-10 text-center">Lab Not Found</div>;
    }

    const toggleTest = (test: Test) => {
        if (selectedTests.find(t => t.id === test.id)) {
            setSelectedTests(selectedTests.filter(t => t.id !== test.id));
        } else {
            setSelectedTests([...selectedTests, test]);
        }
    };

    const handleProceedToSlots = () => {
        if (selectedTests.length > 0) {
            const testIds = selectedTests.map(t => t.id).join(',');
            router.push(`/labs/${lab.id}/slots?tests=${testIds}`);
        }
    };

    return (
        <div className="lab-booking-container">
            {/* Header Section */}
            <div className="lab-header-section">
                {/* Lab Banner (Teal Box) */}
                <div className="lab-banner">
                    <Image
                        src={lab.imageUrl}
                        alt={lab.name}
                        width={100}
                        height={100}
                        className="lab-banner-image"
                    />
                    <div className="lab-banner-info">
                        <h1>{lab.name}</h1>
                        <p>Blood Test | Stool Test | Urine Test | KIDNEY PANEL; KFT</p>
                        <p>GLUCOSE, FASTING (F) | VITAMIN D 25 - HYDROXY</p>
                    </div>
                </div>

                {/* Right Sidebar: Cart & Filters */}
                <div className="lab-header-sidebar">
                    {/* Cart Icon - Clicking proceeds to slots */}
                    <div className="cart-icon-container" onClick={handleProceedToSlots} title={selectedTests.length === 0 ? "Select tests first" : "Proceed to Book"}>
                        {/* Using SVG to mimic the cart-plus icon from image */}
                        <div style={{ position: 'relative' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#006064" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {/* Plus sign inside/near cart */}
                            <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', fontSize: '14px', color: '#006064' }}>+</div>

                            {/* Badge for selected count */}
                            {selectedTests.length > 0 && <span className="cart-badge" style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                                {selectedTests.length}
                            </span>}
                        </div>
                    </div>


                </div>
            </div>

            {/* Search Bar */}
            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <div className="search-icon">🔍</div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search Your Medicine Here"
                    />
                </div>
            </div>

            {/* Test Grid */}
            <div className="test-grid">
                {lab.availableTests.map(test => {
                    const isSelected = selectedTests.find(t => t.id === test.id);
                    return (
                        <div key={test.id} className="test-card">
                            <div>
                                <h3 className="test-title">{test.name}</h3>
                                <p className="test-subtitle">
                                    {test.parametersCovered || '20'} Parameter(S) Covered
                                </p>
                                <div className="test-price">₹{test.price}</div>

                                <div className="test-features">
                                    <div className="feature-item">
                                        <div className="dot-icon">✶</div> {/* Star/Dot icon or similar */}
                                        Home Collection
                                    </div>
                                    <div className="feature-item">
                                        <div className="radio-dot"></div> {/* Hollow circle */}
                                        Lab Visit
                                    </div>
                                </div>
                            </div>

                            <div className="test-card-footer">
                                <button
                                    className={`add-btn ${isSelected ? 'added' : ''}`}
                                    onClick={() => toggleTest(test)}
                                >
                                    {isSelected ? 'Added' : 'Add To Cart'}
                                </button>
                                <span className="know-more-link">
                                    Know More →
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
