# Healthezy API Client

Frontend API client for consuming Healthezy backend APIs.

## 📁 Structure

```
api/
├── config.ts                 # API configuration
├── README.md                 # This file
│
├── auth/                     # Authentication endpoints
│   ├── index.ts
│   ├── types.ts
│   └── README.md
│
├── doctor/                   # Doctors & appointments
│   ├── index.ts
│   ├── types.ts
│   └── README.md
│
├── hospital/                 # Hospitals & departments
│   ├── index.ts
│   ├── types.ts
│   └── README.md
│
├── lab/                      # Diagnostic labs & tests
│   ├── index.ts
│   ├── types.ts
│   └── README.md
│
└── pharmacy/                 # Pharmacies & medicines
    ├── index.ts
    ├── types.ts
    └── README.md
```

## 🚀 API Routes

### Hospital Routes
| Route | Purpose | Returns |
|-------|---------|---------|
| `GET /hospitals` | List all hospitals | `Hospital[]` |
| `GET /hospitals/:id` | Get hospital + its doctors | `Hospital` + `Doctor[]` |

### Doctor Routes
| Route | Purpose | Returns |
|-------|---------|---------|
| `GET /doctors` | List all doctors | `Doctor[]` |
| `GET /doctors/:id` | Get doctor appointment schedule | `Doctor` + `AppointmentSchedule` |

### Lab Routes
| Route | Purpose | Returns |
|-------|---------|---------|
| `GET /labs` | List all labs | `Lab[]` |
| `GET /labs/:id/tests` | Get all tests for a lab | `Test[]` |
| `GET /labs/:id/tests/:testId` | Get test details | `Test` (with full description) |

### Pharmacy Routes
| Route | Purpose | Returns |
|-------|---------|---------|
| `GET /pharmacies` | List all pharmacies | `Pharmacy[]` |
| `GET /pharmacies/:id/medicines` | Get all medicines | `Medicine[]` |
| `GET /pharmacies/:id/medicines/:medicineId` | Get medicine details | `Medicine` (with uses, description) |

## 🔗 Data Relationships

### Hospital ↔ Doctor
- Doctors have `hospitalId` foreign key
- Use `getDoctorsByHospitalId(hospitalId)` to get hospital doctors

### Lab ↔ Test
- Tests have `labId` foreign key
- Use `getTestsByLabId(labId)` to get lab tests

### Pharmacy ↔ Medicine
- Medicines have `pharmacyId` foreign key
- Use `getMedicinesByPharmacyId(pharmacyId)` to get pharmacy medicines

