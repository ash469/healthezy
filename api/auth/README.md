# Authentication API

## Login
**POST** `/auth/login`

Authenticate user with identifier (email or phone) and password.

**Request Body:**
```json
{
  "identifier": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "userId": 123,
  "email": "user@example.com",
  "phone": "+1234567890",
  "name": "John Doe",
  "firstName": "John",
  "lastName": "Doe",
  "role": "PATIENT",
  "userType": "individual",
  "tenantId": 1,
  "expiresIn": 3600
}
```

**Roles:**
- `SUPER_ADMIN`
- `HOSPITAL_ADMIN`
- `DOCTOR`
- `PHARMACIST`
- `PATIENT`
- `LAB_ADMIN`
- `SELLER`

```
