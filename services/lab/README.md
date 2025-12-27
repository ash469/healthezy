# Lab API

## Endpoints

### Get All Labs
- **Endpoint**: `GET /labs`
- **Returns**: `Lab[]`

### Get Lab Tests
- **Endpoint**: `GET /labs/:id/tests`
- **Returns**: `Test[]`

### Get Test Details
- **Endpoint**: `GET /labs/:id/tests/:testId`
- **Returns**: `Test` (with full description)

## Data Relationship

Tests have `labId` foreign key linking to labs.
Use `getTestsByLabId(labId)` from `@/data/tests` to get lab tests.
