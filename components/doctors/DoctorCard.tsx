import Image from 'next/image';
import Link from 'next/link';
import './Doctors.css';

interface DoctorCardProps {
    doctor: any;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    const fullName = doctor.full_name || `${doctor.first_name || ''} ${doctor.last_name || ''}`.trim() || 'Doctor';
    const photoUrl = doctor.photo_url || '/doctor.png';
    const specialization = doctor.specialization || 'General';
    const hospitalName = doctor.hospital_name || '';
    const consultationFee = doctor.consultation_fee || 0;
    const qualification = doctor.qualification || '';
    const experienceYears = doctor.experience_years || 0;
    const gender = doctor.gender || '';

    console.log('DoctorCard - Passing to booking:', {
        id: doctor.id,
        fullName,
        photoUrl,
        specialization
    });

    return (
        <div className="doctor-card">
            {/* <Link href={`/doctors/${doctor.id}`} className="block rounded-lg cursor-pointer"> */}
            <div className="doctor-info-section">
                <div className="doctor-image-container">
                    <Image
                        src={photoUrl}
                        alt={fullName}
                        width={100}
                        height={100}
                        className="doctor-image"
                        unoptimized={true}
                    />
                </div>
                <div className="doctor-details">
                    <h3 className="doctor-name">{fullName}</h3>
                    <p className="doctor-specialty">{specialization}</p>
                    {qualification && <p className="doctor-hospital" style={{ fontSize: '0.95rem', opacity: 0.85 }}>{qualification}</p>}
                    <p className="doctor-hospital">
                        {gender && <span>{gender} • </span>}
                        {experienceYears > 0 && <span>{experienceYears} yrs exp</span>}
                        {experienceYears > 0 && ' • '}
                        Fees: ₹{consultationFee}
                    </p>
                    {hospitalName && <p className="doctor-hospital" style={{ fontSize: '0.9rem' }}>{hospitalName}</p>}
                </div>
            </div>
            {/* </Link> */}

            <Link
                href={`/doctors/${doctor.id}/book`}
                className="book-btn"
            >
                Book Appointment
            </Link>
        </div>
    );
}