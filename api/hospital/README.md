# Hospital API

## Endpoints

### Get All Hospitals
- **Endpoint**: `GET /hospitals`
- **Returns**: `Hospital[]`

### Get Hospital with Doctors
- **Endpoint**: `GET /hospitals/:id`
- **Returns**: `Hospital` + `Doctor[]`
- **Description**: Returns hospital details with all associated doctors

## Data Relationship

Use `getDoctorsByHospitalId(hospitalId)` from `@/data/doctors` to get hospital doctors.
