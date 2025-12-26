import Image from 'next/image';
import Link from 'next/link';
import { Doctor } from '@/types/doctor';
import './Doctors.css';

interface DoctorCardProps {
    doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    return (
        <div className="doctor-card">
            <div className="doctor-info-section">
                <div className="doctor-image-container">
                    <Image
                        src={doctor.photoUrl || '/doctor.png'}
                        alt={doctor.fullName || 'Doctor'}
                        width={100}
                        height={100}
                        className="doctor-image"
                    />
                </div>
                <div className="doctor-details">
                    <h3 className="doctor-name">{doctor.fullName}</h3>
                    <p className="doctor-specialty">{doctor.specialization}</p>
                    <p className="doctor-hospital">{doctor.hospitalName} | Fees - {doctor.consultationFee}/-</p>
                    <div className="doctor-rating">
                        <span className="rating-tag">{doctor.rating} ★</span>
                    </div>
                </div>
            </div>

            <Link href={`/doctors/${doctor.id}/book`} className="book-btn">
                Book Appointment
            </Link>
        </div>
    );
}
