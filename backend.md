# Healthezy Backend API Specification

This document outlines the API requirements for the Healthezy platform. All endpoints return raw data as specified in the schemas below. The frontend is responsible for transforming this data into its internal structures.

## Base URL
`http://localhost:5000/api/v1`

---

## 🏥 Hospital API

### 1. List all hospitals
**Endpoint:** `GET /hospitals`
**Query Parameters:**
- `page`: (int) Page number (default: 0)
- `size`: (int) Results per page (default: 10)
- `city`: (string) Filter by city
- `type`: (string) Filter by hospital type

**Response Structure:** `HospitalPageResponse`

**Example Response:**
```json
{
  "content": [
    {
      "id": 1,
      "hospitalCode": "HOSP001",
      "name": "SVM Hospital",
      "type": "Multi-specialty",
      "description": "Premium healthcare facility...",
      "address": "Sector 15, Rohini",
      "city": "Delhi NCR",
      "state": "Delhi",
      "zipCode": "110085",
      "country": "India",
      "fullAddress": "Sector 15, Rohini, Delhi NCR, India",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "phoneNumber": "+91-11-23456789",
      "email": "info@svm.com",
      "website": "https://svm-hospital.com",
      "licenseNumber": "LIC-2023-001",
      "openingTime": "00:00",
      "closingTime": "23:59",
      "is24x7": true,
      "facilities": "ICU, Emergency, Pharmacy, Diagnostic Lab",
      "specializations": "Cardiology, Pediatrics, General Medicine",
      "logoUrl": "/hospital.png",
      "totalBeds": 250,
      "availableBeds": 45,
      "rating": 4.5,
      "reviewCount": 120,
      "doctorCount": 15
    }
  ],
  "totalPages": 5,
  "totalElements": 50,
  "number": 0
}
```

### 2. Get hospital details
**Endpoint:** `GET /hospitals/:id`

**Response Structure:** `HospitalApiResponse`

**Example Response:**
```json
{
  "id": 1,
  "hospitalCode": "HOSP001",
  "name": "SVM Hospital",
  "type": "Multi-specialty",
  "description": "Premium healthcare facility...",
  "fullAddress": "Sector 15, Rohini, Delhi NCR, India",
  "latitude": 28.7041,
  "longitude": 77.1025,
  "phoneNumber": "+91-11-23456789",
  "email": "info@svm.com",
  "logoUrl": "/hospital.png",
  "is24x7": true,
  "specializations": "Cardiology, Pediatrics, General Medicine",
  "totalBeds": 250,
  "availableBeds": 45,
  "rating": 4.5
}
```

### 3. Get doctors of a hospital
**Endpoint:** `GET /hospitals/:id/doctors`

**Response Structure:** `DoctorApiResponse[]`

**Example Response:**
```json
[
  {
    "id": 1,
    "hospitalId": 1,
    "fullName": "Dr. Mehra",
    "specialization": "General Physician",
    "hospitalName": "SVM Hospital | New Delhi",
    "consultationFee": 700,
    "photoUrl": "/doctor.png",
    "rating": 4.5,
    "experienceYears": 10,
    "gender": "FEMALE",
    "status": "ACTIVE"
  }
]
```

---

## 👨‍⚕️ Doctor API

### 1. List all doctors
**Endpoint:** `GET /doctors`
**Query Parameters:**
- `page`: (int) Page number
- `size`: (int) Results per page
- `hospitalId`: (int) Filter by specific hospital
- `specialization`: (string) Filter by specialty
- `gender`: (string) MALE/FEMALE
- `sortBy`: (string) fees_asc, fees_desc, experience

**Response Structure:** `DoctorPageResponse`

**Example Response:**
```json
{
  "content": [
    {
      "id": 1,
      "hospitalId": 1,
      "fullName": "Dr. Mehra",
      "firstName": "Anita",
      "lastName": "Mehra",
      "specialization": "General Physician",
      "qualification": "MBBS, MD",
      "experienceYears": 10,
      "consultationFee": 700,
      "hospitalName": "SVM Hospital | New Delhi",
      "photoUrl": "/doctor.png",
      "rating": 4.5,
      "gender": "FEMALE",
      "status": "ACTIVE"
    }
  ],
  "totalPages": 2,
  "totalElements": 20,
  "number": 0
}
```

### 2. Get doctor details & schedule
**Endpoint:** `GET /doctors/:id`

**Response Structure:**
```json
{
  "doctor": DoctorApiResponse,
  "schedule": AppointmentSchedule
}
```

**Example Response:**
```json
{
  "doctor": {
    "id": 1,
    "fullName": "Dr. Mehra",
    "specialization": "General Physician",
    "qualification": "MBBS, MD",
    "consultationFee": 700,
    "photoUrl": "/doctor.png",
    "rating": 4.5,
    "gender": "FEMALE",
    "status": "ACTIVE"
  },
  "schedule": {
    "doctorId": 1,
    "weekSchedule": [
      {
        "day": "Monday",
        "timeSlots": [
          { "time": "09:00", "available": true },
          { "time": "10:00", "available": false }
        ]
      }
    ],
    "consultationDuration": 15
  }
}
```

---

## 🧪 Lab API

### 1. List all labs
**Endpoint:** `GET /labs`

**Response Structure:** `LabApiResponse[]`

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Path Labs",
    "location": "Delhi",
    "address": "Sector 62, Noida, Delhi NCR",
    "price": 330,
    "latitude": 28.5355,
    "longitude": 77.2249,
    "imageUrl": "/lab.png",
    "rating": 4.5,
    "availableTests": [
      { "id": 1, "name": "CBC", "price": 330 }
    ]
  }
]
```

### 2. Get lab tests
**Endpoint:** `GET /labs/:id/tests`

**Response Structure:** `TestApiResponse[]`

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "COMPLETE BLOOD COUNT; CBC",
    "price": 330,
    "description": "Standard blood test...",
    "parametersCovered": 20,
    "homeCollection": true,
    "labVisit": true
  }
]
```

### 3. Get full test details
**Endpoint:** `GET /labs/:id/tests/:testId`

**Response Structure:** `TestApiResponse`

**Example Response:**
```json
{
  "id": 1,
  "name": "COMPLETE BLOOD COUNT; CBC",
  "price": 330,
  "description": "Standard blood test...",
  "parametersCovered": 20,
  "homeCollection": true,
  "labVisit": true,
  "preparation": "Fasting not required",
  "resultTime": "24 hours",
  "sampleType": "Blood"
}
```

---

## 💊 Pharmacy API

### 1. List all pharmacies
**Endpoint:** `GET /pharmacies`

**Response Structure:** `PharmacyApiResponse[]`

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Sai Medicals",
    "location": "Sector 62, Noida",
    "address": "Shop No. 4, LSC, Sector 62",
    "rating": 4.5,
    "latitude": 28.5355,
    "longitude": 77.2249,
    "medicines": [
      { "id": 1, "name": "Hyplori-20", "price": 29.80 }
    ]
  }
]
```

### 2. Get pharmacy medicines
**Endpoint:** `GET /pharmacies/:id/medicines`

**Response Structure:** `MedicineApiResponse[]`

**Example Response:**
```json
[
  {
    "id": 1,
    "pharmacyId": 1,
    "name": "Hyplori-20",
    "price": 29.80,
    "description": "Gastro medication",
    "inStock": true,
    "category": "Gastroenterology"
  }
]
```

### 3. Get medicine details
**Endpoint:** `GET /pharmacies/:id/medicines/:medicineId`

**Response Structure:** `MedicineApiResponse`

**Example Response:**
```json
{
  "id": 1,
  "pharmacyId": 1,
  "name": "Hyplori-20",
  "price": 29.80,
  "description": "Gastro medication",
  "uses": "Acidity, Ulcers",
  "dosage": "Once daily",
  "manufacturer": "HealthPharma",
  "inStock": true,
  "prescriptionRequired": false
}
```

---

## 🔐 Schemas (Backend Models)

### HospitalApiResponse
```typescript
{
  "id": number,
  "hospitalCode": string,
  "name": string,
  "type": string,
  "description": string,
  "address": string,
  "city": string,
  "state": string,
  "zipCode": string,
  "country": string,
  "fullAddress": string,
  "latitude": number,
  "longitude": number,
  "phoneNumber": string,
  "email": string,
  "website": string,
  "licenseNumber": string,
  "openingTime": string,
  "closingTime": string,
  "is24x7": boolean,
  "facilities": string,
  "specializations": string,
  "logoUrl": string,
  "totalBeds": number,
  "availableBeds": number,
  "rating": number,
  "reviewCount": number,
  "doctorCount": number
}
```

### DoctorApiResponse
```typescript
{
  "id": number,
  "hospitalId": number,
  "fullName": string,
  "firstName": string,
  "lastName": string,
  "specialization": string,
  "qualification": string,
  "experienceYears": number,
  "consultationFee": number,
  "hospitalName": string,
  "photoUrl": string,
  "rating": number,
  "gender": "MALE" | "FEMALE" | "OTHER",
  "status": "ACTIVE" | "INACTIVE" | "ON_LEAVE"
}
```

### LabApiResponse
```typescript
{
  "id": number,
  "name": string,
  "location": string,
  "address": string,
  "price": number,
  "latitude": number,
  "longitude": number,
  "imageUrl": string,
  "rating": number,
  "availableTests": TestApiResponse[],
  "slots": { [key: string]: string[] }
}
```

### TestApiResponse
```typescript
{
  "id": number,
  "name": string,
  "price": number,
  "description": string,
  "parametersCovered": number | string,
  "homeCollection": boolean,
  "labVisit": boolean,
  "preparation": string,
  "resultTime": string,
  "sampleType": string
}
```

### PharmacyApiResponse
```typescript
{
  "id": number,
  "name": string,
  "location": string,
  "address": string,
  "rating": number,
  "latitude": number,
  "longitude": number,
  "medicines": MedicineApiResponse[]
}
```

### MedicineApiResponse
```typescript
{
  "id": number,
  "pharmacyId": number,
  "name": string,
  "description": string,
  "uses": string,
  "dosage": string,
  "sideEffects": string,
  "price": number,
  "manufacturer": string,
  "inStock": boolean,
  "category": string,
  "prescriptionRequired": boolean
}
```

### AppointmentSchedule
```typescript
{
  "doctorId": number,
  "weekSchedule": {
    "day": string,
    "timeSlots": {
      "time": string,
      "available": boolean
    }[]
  }[],
  "consultationDuration": number
}
```
