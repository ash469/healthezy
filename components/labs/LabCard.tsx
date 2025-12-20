import Image from 'next/image';
import Link from 'next/link';
import { Lab } from '@/types/lab';
import './Labs.css';

interface LabCardProps {
    lab: Lab;
}

export default function LabCard({ lab }: LabCardProps) {
    // Show top 2 tests as preview in the "hospital" slot or a new slot
    const testPreview = lab.availableTests.slice(0, 2).map(t => t.name).join(', ') + (lab.availableTests.length > 2 ? '...' : '');

    return (
        <div className="lab-card">
            <div className="lab-info-section">
                <div className="lab-image-container">
                    <Image
                        src={lab.imageUrl}
                        alt={lab.name}
                        width={120}
                        height={120}
                        className="lab-image"
                    />
                </div>
                <div className="lab-details">
                    <h3 className="lab-name">{lab.name}</h3>
                    <p className="lab-specialty">{lab.address}</p>
                    {/* Showing Location/Address as specialty equivalent */}

                    <p className="lab-hospital">
                        Tests: {testPreview || 'General Tests'}
                    </p>

                    {/* Price can be a "Starting from" */}
                    <p className="lab-hospital" style={{ marginTop: '4px', fontWeight: 'bold' }}>
                        Starts from ₹{lab.price}/-
                    </p>

                    <div className="lab-rating">
                        <span className="rating-tag">{lab.rating} ★</span>
                    </div>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', flexDirection: 'row', gap: '0.75rem', alignItems: 'center' }}>
                <a
                    href={`https://www.google.com/maps?q=${lab.latitude},${lab.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="book-btn"
                    style={{
                        backgroundColor: 'white',
                        color: '#00ccde',
                        border: '1px solid #00ccde',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'static',
                        margin: 0
                    }}
                >
                    Get Direction
                </a>
                <Link
                    href={`/labs/${lab.id}/book`}
                    className="book-btn"
                    style={{ position: 'static', margin: 0 }}
                >
                    Book Test
                </Link>
            </div>
        </div>
    );
}
