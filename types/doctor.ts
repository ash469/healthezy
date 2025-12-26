export interface Doctor {
    id: number;
    hospitalId?: number; // Foreign key to link doctor to hospital
    fullName?: string;
    firstName?: string;
    lastName?: string;
    specialization?: string;
    qualification?: string;
    experienceYears?: number;
    experience?: string; 
    consultationFee?: number;
    hospitalName?: string;
    photoUrl?: string;
    rating?: number;
    gender?: 'Male' | 'Female' | 'MALE' | 'FEMALE' | 'OTHER';
    status?: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
}
