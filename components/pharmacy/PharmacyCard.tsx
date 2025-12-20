import Image from 'next/image';
import Link from 'next/link';
import { Pharmacy } from '@/types/pharmacy';
import './Pharmacy.css';

interface PharmacyCardProps {
    pharmacy: Pharmacy;
}

export default function PharmacyCard({ pharmacy }: PharmacyCardProps) {
    return (
        <div className="pharmacy-card group relative">
            <div className="pharmacy-info-section flex gap-6 items-start">
                <div className="pharmacy-image-container w-[130px] h-[130px] rounded-lg overflow-hidden bg-gray-200 shrink-0">
                    <Image
                        src={pharmacy.imageUrl}
                        alt={pharmacy.name}
                        width={120}
                        height={120}
                        className="pharmacy-image w-full h-full object-cover"
                    />
                </div>
                <div className="pharmacy-details flex flex-col gap-1">
                    <h3 className="pharmacy-name text-4xl font-bold leading-tight">{pharmacy.name}</h3>
                    <p className="pharmacy-location text-lg opacity-90">{pharmacy.location}</p>

                    <div className="flex gap-4 flex-wrap">
                        <p className="pharmacy-info-text text-lg opacity-80">
                            {pharmacy.deliveryTime} delivery
                        </p>
                        <p className="pharmacy-info-text text-lg opacity-80">
                            Min: {pharmacy.minimumOrder}
                        </p>
                    </div>

                    {pharmacy.activeDiscount && (
                        <p className="text-green-200 font-bold mt-1">
                            {pharmacy.activeDiscount}
                        </p>
                    )}

                    <div className="pharmacy-rating mt-2">
                        <span className="rating-tag bg-[#00ccde] text-white px-3 py-1 rounded-2xl font-bold text-xs inline-flex items-center gap-1">
                            {pharmacy.rating} ★ ({pharmacy.reviews} reviews)
                        </span>
                    </div>
                </div>
            </div>

            <div className="pharmacy-card-actions">
                <a
                    href={`https://www.google.com/maps?q=${pharmacy.latitude},${pharmacy.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn-outline"
                >
                    Get Direction
                </a>
                <Link
                    href={`/pharmacy/${pharmacy.id}`}
                    className="action-btn"
                >
                    Order Medicine
                </Link>
            </div>
        </div>
    );
}
