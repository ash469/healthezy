import Image from 'next/image';
import Link from 'next/link';
import { LabResponse } from '@/types/lab';
import './Labs.css';

interface LabCardProps {
    lab: LabResponse;
}

export default function LabCard({ lab }: LabCardProps) {
    // Show top 2 tests as preview if available
    const tests = lab.availableTests || [];
    const testPreview = tests.length > 0
        ? tests.slice(0, 2).map(t => t.name).join(', ') + (tests.length > 2 ? '...' : '')
        : 'General Diagnostic Center';

    return (
        <div className="lab-card">
            <Link href={`/labs/${lab.id}`} className="lab-info-section flex-1 cursor-pointer min-w-0">
                <div className="lab-image-container relative">
                    <Image
                        src={lab.logo_url || lab.imageUrl || '/lab.png'}
                        alt={lab.name}
                        width={120}
                        height={120}
                        className="lab-image object-cover"
                        unoptimized={true}
                    />
                    {lab.is24x7 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm" title="24/7 Open">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    )}
                </div>
                <div className="lab-details">
                    <h3 className="lab-name">{lab.name}</h3>

                    {lab.description && (
                        <p className="lab-hospital" style={{ fontSize: '0.85rem', color: '#343333ff' }}>
                            {lab.description.length > 80 ? lab.description.substring(0, 80) + '...' : lab.description}
                        </p>
                    )}

                    {lab.city && <p className="lab-specialty">{lab.city}</p>}

                    {lab.type && <p className="lab-specialty" style={{ color: '#a1fbb6ff', fontWeight: 'bold' }}>{lab.type}</p>}
                </div>
            </Link>

            <div className="pharmacy-card-actions">
                <a
                    href={`https://www.google.com/maps?q=${lab.latitude},${lab.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn-outline"
                >
                    Get Direction
                </a>
                <Link
                    href={`/labs/${lab.id}/book`}
                    className="action-btn"
                >
                    Book Appointment
                </Link>
            </div>
        </div>
    );
}
