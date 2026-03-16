import Link from 'next/link';
import { LabTestResponse, LabResponse } from '@/types/lab';

interface TestCardProps {
    test: LabTestResponse;
    lab: LabResponse;
}

export function TestCard({ test, lab }: TestCardProps) {
    return (
        <div className="lab-card" style={{ minHeight: 'auto', padding: '1.25rem' }}>
            <div className="lab-info-section min-w-0 flex-1">
                <div className="lab-details">
                    <div className="flex justify-between items-start">
                        <h3 className="lab-name" style={{ fontSize: '1.5rem' }}>{test.name}</h3>
                    </div>
                    
                    <p className="lab-hospital" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        {test.category} • {test.sample_type} sample
                    </p>
                    
                    {test.description && (
                        <p className="text-sm opacity-80 mb-3 line-clamp-2">
                            {test.description}
                        </p>
                    )}
                    
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1 opacity-90">
                            ⏱️ {test.turnaround_time_hours} hrs TAT
                        </span>
                        {test.normal_range && (
                            <span className="flex items-center gap-1 opacity-90">
                                📊 {test.normal_range} {test.unit_of_measurement}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="pharmacy-card-actions" style={{ position: 'static', alignSelf: 'center' }}>
                <div className="text-right mr-4">
                    <p className="text-[10px] uppercase font-black opacity-60 tracking-[0.2em] mb-0">Starting from</p>
                    <p className="text-2xl font-black">₹{test.test_price}</p>
                </div>
                <Link
                    href={`/labs/${lab.id}/book?test=${test.id}`}
                    className="action-btn"
                >
                    Book Now
                </Link>
            </div>
        </div>
    );
}
