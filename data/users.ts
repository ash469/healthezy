// Dummy user credentials for testing
export interface User {
    id: string;
    email: string;
    phone: string;
    password: string;
    userType: 'patient' | 'doctor' | 'lab' | 'hospital' | 'pharmacy' | 'ecommerce';
    name: string;
    avatar?: string;
}

export const dummyUsers: User[] = [
    // Patient Accounts
    {
        id: 'patient-001',
        email: 'patient@healthezy.com',
        phone: '9876543210',
        password: 'patient123',
        userType: 'patient',
        name: 'John Doe',
        avatar: '/avatars/patient.png'
    },
    {
        id: 'patient-002',
        email: 'sarah.patient@healthezy.com',
        phone: '9876543211',
        password: 'patient123',
        userType: 'patient',
        name: 'Sarah Williams',
        avatar: '/avatars/patient2.png'
    },

    // Doctor Accounts
    {
        id: 'doctor-001',
        email: 'doctor@healthezy.com',
        phone: '9876543220',
        password: 'doctor123',
        userType: 'doctor',
        name: 'Dr. Michael Chen',
        avatar: '/avatars/doctor.png'
    },
    {
        id: 'doctor-002',
        email: 'dr.patel@healthezy.com',
        phone: '9876543221',
        password: 'doctor123',
        userType: 'doctor',
        name: 'Dr. Priya Patel',
        avatar: '/avatars/doctor2.png'
    },

    // Lab Accounts
    {
        id: 'lab-001',
        email: 'lab@healthezy.com',
        phone: '9876543230',
        password: 'lab123',
        userType: 'lab',
        name: 'City Diagnostic Center',
        avatar: '/avatars/lab.png'
    },
    {
        id: 'lab-002',
        email: 'pathology@healthezy.com',
        phone: '9876543231',
        password: 'lab123',
        userType: 'lab',
        name: 'HealthPath Laboratories',
        avatar: '/avatars/lab2.png'
    },

    // Hospital Accounts
    {
        id: 'hospital-001',
        email: 'hospital@healthezy.com',
        phone: '9876543240',
        password: 'hospital123',
        userType: 'hospital',
        name: 'City General Hospital',
        avatar: '/avatars/hospital.png'
    },
    {
        id: 'hospital-002',
        email: 'metro.hospital@healthezy.com',
        phone: '9876543241',
        password: 'hospital123',
        userType: 'hospital',
        name: 'Metro Health Center',
        avatar: '/avatars/hospital2.png'
    },

    // Pharmacy Accounts
    {
        id: 'pharmacy-001',
        email: 'pharmacy@healthezy.com',
        phone: '9876543250',
        password: 'pharmacy123',
        userType: 'pharmacy',
        name: 'HealthPlus Pharmacy',
        avatar: '/avatars/pharmacy.png'
    },
    {
        id: 'pharmacy-002',
        email: 'medcare@healthezy.com',
        phone: '9876543251',
        password: 'pharmacy123',
        userType: 'pharmacy',
        name: 'MedCare Drugstore',
        avatar: '/avatars/pharmacy2.png'
    },

    // E-commerce/Store Accounts
    {
        id: 'ecommerce-001',
        email: 'ecommerce@healthezy.com',
        phone: '9876543260',
        password: 'store123',
        userType: 'ecommerce',
        name: 'HealthStore Admin',
        avatar: '/avatars/store.png'
    },
    {
        id: 'ecommerce-002',
        email: 'wellness.store@healthezy.com',
        phone: '9876543261',
        password: 'store123',
        userType: 'ecommerce',
        name: 'Wellness Mart',
        avatar: '/avatars/store2.png'
    }
];

// Helper function to validate user credentials
export const validateUser = (emailOrPhone: string, password: string): User | null => {
    const user = dummyUsers.find(
        (u) => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
    );
    return user || null;
};

// Get user by ID
export const getUserById = (id: string): User | null => {
    return dummyUsers.find((u) => u.id === id) || null;
};

// Get all users by type
export const getUsersByType = (userType: User['userType']): User[] => {
    return dummyUsers.filter((u) => u.userType === userType);
};
