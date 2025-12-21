import Image from 'next/image';
import Link from 'next/link';
import { Hospital } from '@/types/hospital';
import './Hospital.css';

interface HospitalCardProps {
    hospital: Hospital;
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
    // Show top 2 doctors as preview or just count
    const doctorPreview = hospital.doctors.slice(0, 2).map(d => d.name).join(', ') + (hospital.doctors.length > 2 ? '...' : '');

    return (
        <div className="hospital-card">
            <div className="hospital-info-section">
                <div className="hospital-image-container">
                    <Image
                        src={hospital.imageUrl}
                        alt={hospital.name}
                        width={120}
                        height={120}
                        className="hospital-image"
                    />
                </div>
                <div className="hospital-details">
                    <h3 className="hospital-name">{hospital.name}</h3>
                    <p className="hospital-specialty">{hospital.address}</p>

                    <p className="hospital-hospital">
                        Doctors: {doctorPreview || 'Specialists Available'}
                    </p>

                    <div className="hospital-rating">
                        <span className="rating-tag">{hospital.rating} ★</span>
                    </div>
                </div>
            </div>

            <div className="hospital-card-actions">
                <a
                    href={`https://www.google.com/maps?q=${hospital.latitude},${hospital.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn-outline"
                >
                    Get Direction
                </a>
                <Link
                    href={`/hospital/${hospital.id}`}
                    className="action-btn"
                >
                    Book Appointment
                </Link>
            </div>
        </div>
    );
}
