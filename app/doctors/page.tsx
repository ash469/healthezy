import DoctorCard from '@/components/doctors/DoctorCard';
import '@/components/doctors/Doctors.css';
import { Doctor } from '@/types/doctor';

// Mock data - replace with API call later
const doctors: Doctor[] = [
    {
        id: '1',
        name: 'Dr. Mehra',
        specialty: 'General Physician',
        hospital: 'AIIMS | New Delhi',
        price: 700,
        imageUrl: '/doctor.png', 
        rating: 4.5,
    },
    {
        id: '2',
        name: 'Dr. Sharma',
        specialty: 'Cardiologist',
        hospital: 'Fortis | Mumbai',
        price: 1200,
        imageUrl: '/doctor.png',
        rating: 4.8,
    },
    {
        id: '3',
        name: 'Dr. Gupta',
        specialty: 'Dermatologist',
        hospital: 'Apollo | Bangalore',
        price: 800,
        imageUrl: '/doctor.png',
        rating: 4.6,
    },
    {
        id: '4',
        name: 'Dr. Kapoor',
        specialty: 'Pediatrician',
        hospital: 'Max | Delhi',
        price: 600,
        imageUrl: '/doctor.png',
        rating: 4.7,
    }
];

export default function DoctorsPage() {
    return (
        <div className="doctors-container">
            <div className="doctors-header">
                <h1 className="doctors-title">Doctors</h1>

                <div className="doctors-filters">
                    <div className="filter-group">
                        <label className="filter-label">Filter</label>
                        <select className="filter-select">
                            <option>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label">Sort by</label>
                        <select className="filter-select">
                            <option>Fees: Low to High</option>
                            <option>Fees: High to Low</option>
                            <option>Experience</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="doctors-list">
                {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
}
