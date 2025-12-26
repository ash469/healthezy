# Doctor API

## Endpoints

### Get All Doctors
- **Endpoint**: `GET /doctors`
- **Returns**: `Doctor[]`

### Get Doctor Appointment Schedule
- **Endpoint**: `GET /doctors/:id`
- **Returns**: `Doctor` + `AppointmentSchedule`
- **Description**: Returns doctor details with day-specific appointment schedule

## Appointment Schedule Structure

The appointment schedule uses a **day-specific** structure where each day can have different time slots:

```typescript
{
  doctorId: 1,
  weekSchedule: [
    { day: "Monday", timeSlots: [{ time: "09:00", available: true }, ...] },
    { day: "Tuesday", timeSlots: [{ time: "10:00", available: true }, ...] },
    // ... other days
  ],
  consultationDuration: 15
}
```

**Key Features:**
- Each day has its own set of time slots
- Some days may have 2-3 slots, others may have 5-7 slots
- Times are in 24-hour format from backend
- Frontend categorizes into morning/afternoon/evening

## Data Relationships

- Doctors have `hospitalId` foreign key linking to hospitals
- Use `getDoctorsByHospitalId(hospitalId)` from `@/data/doctors`
- Use `getSlotsByDay(doctorId, dayName)` from `@/data/appointments` for day-specific slots
