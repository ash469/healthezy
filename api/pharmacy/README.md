# Pharmacy API

## Endpoints

### Get All Pharmacies
- **Endpoint**: `GET /pharmacies`
- **Returns**: `Pharmacy[]`

### Get Pharmacy Medicines
- **Endpoint**: `GET /pharmacies/:id/medicines`
- **Returns**: `Medicine[]`

### Get Medicine Details
- **Endpoint**: `GET /pharmacies/:id/medicines/:medicineId`
- **Returns**: `Medicine` (with uses, dosage, side effects)

## Data Relationship

Medicines have `pharmacyId` foreign key linking to pharmacies.
Use `getMedicinesByPharmacyId(pharmacyId)` from `@/data/medicines` to get pharmacy medicines.
