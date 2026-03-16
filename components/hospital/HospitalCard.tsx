'use client';

import Image from 'next/image';
import Link from 'next/link';
import './Hospital.css';

interface HospitalCardProps {
    hospital: any;
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
    // Map API fields
    const logoUrl = hospital.logo_url || hospital.logoUrl || '/hospital.png';
    const hospitalName = hospital.name || "Unknown Hospital";
    const address = hospital.address || "";
    const type = hospital.type || "";
    const description = hospital.description || "";
    const lat = hospital.latitude || 0;
    const lng = hospital.longitude || 0;

    return (
        <div className="hospital-card">
            <Link href={`/hospital/${hospital.id}`} className="hospital-info-section flex-1 cursor-pointer min-w-0">
                <div className="hospital-image-container">
                    <Image
                        src={logoUrl}
                        alt={hospitalName}
                        width={120}
                        height={120}
                        className="hospital-image"
                        unoptimized={true}
                    />
                </div>
                <div className="hospital-details">
                    <h3 className="hospital-name">{hospitalName}</h3>

                    {description && (
                        <p className="hospital-hospital" style={{ fontSize: '0.85rem', color: '#343333ff' }}>
                            {description.length > 80 ? description.substring(0, 80) + '...' : description}
                        </p>
                    )}

                    {address && <p className="hospital-specialty">{address}</p>}

                    {type && <p className="hospital-specialty" style={{ color: '#a1fbb6ff', fontWeight: 'bold' }}>{type}</p>}
                </div>
            </Link>

            <div className="hospital-card-actions">
                <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn-outline"
                >
                    Get Direction
                </a>

                <Link
                    href={`/hospital/${hospital.id}/doctors`}
                    className="action-btn"
                >
                    Book Appointment
                </Link>
            </div>
        </div>
    );
}
