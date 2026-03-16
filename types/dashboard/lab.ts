import { Lab, Test } from '../lab';

export interface LabDashboardData {
    labInfo: Lab;
    availableTests: Test[];
}
