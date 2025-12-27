# Hospital Service

## Overview

This service handles all hospital-related API calls and data transformations. It imports types from `@/types/hospital` and transforms backend API responses to match the frontend data structure.

## Structure

- **Type Definitions**: Located in `@/types/hospital.ts`
- **API Response Types**: Defined internally in this service (not exported)
- **Transformation Logic**: `transformHospital()` function maps API responses to frontend types

## Available Functions

### `getAllHospitals(page?, size?)`
- **Returns**: `Promise<Hospital[]>`
- **Description**: Fetches paginated list of hospitals
- **Production**: Update API endpoint and transformation logic here

### `getHospitalById(id)`
- **Returns**: `Promise<Hospital | null>`
- **Description**: Fetches a single hospital by ID
- **Production**: Update API endpoint and transformation logic here

## Production Migration

When moving to production:

1. Uncomment the API calls in each function
2. Update the endpoint URLs if needed
3. Modify `transformHospital()` if the API response structure differs
4. Remove the dummy data imports

**Frontend code requires ZERO changes** - it only uses types from `@/types/hospital`.
