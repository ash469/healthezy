import { AppointmentSchedule, TimeSlot, DaySchedule } from '@/types/doctor';

// Helper to create time slots in 24-hour format
const createTimeSlots = (times: string[], available: boolean = true): TimeSlot[] => {
    return times.map(time => ({ time, available }));
};

export const appointmentSchedules: AppointmentSchedule[] = [
    // Doctor 1 - Dr. Mehra (Full week, varying slots per day)
    {
        doctorId: 1,
        weekSchedule: [
            { day: 'Monday', timeSlots: createTimeSlots(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']) },
            { day: 'Tuesday', timeSlots: createTimeSlots(['09:00', '10:00', '14:00', '15:00']) },
            { day: 'Wednesday', timeSlots: createTimeSlots(['09:00', '11:00', '14:00', '16:00', '17:00', '18:00']) },
            { day: 'Thursday', timeSlots: createTimeSlots(['10:00', '11:00', '15:00']) },
            { day: 'Friday', timeSlots: createTimeSlots(['09:00', '10:00', '11:00', '14:00', '15:00']) }
        ],
        consultationDuration: 15
    },
    // Doctor 2 - Dr. Sharma (Partial week, fewer slots)
    {
        doctorId: 2,
        weekSchedule: [
            { day: 'Monday', timeSlots: createTimeSlots(['10:00', '11:00', '18:00', '19:00']) },
            { day: 'Wednesday', timeSlots: createTimeSlots(['10:00', '14:30', '15:30']) },
            { day: 'Friday', timeSlots: createTimeSlots(['10:00', '11:00', '14:30', '18:00', '19:00']) },
            { day: 'Saturday', timeSlots: createTimeSlots(['09:00', '10:00']) }
        ],
        consultationDuration: 20
    },
    // Doctor 3 - Dr. Gupta (Alternate days)
    {
        doctorId: 3,
        weekSchedule: [
            { day: 'Tuesday', timeSlots: createTimeSlots(['09:30', '10:30', '11:30', '13:00', '14:00']) },
            { day: 'Thursday', timeSlots: createTimeSlots(['09:30', '13:00', '17:30']) },
            { day: 'Saturday', timeSlots: createTimeSlots(['09:30', '10:30', '11:30', '13:00', '14:00', '15:00']) }
        ],
        consultationDuration: 15
    },
    // Doctor 4 - Dr. Kapoor (Most days, many slots)
    {
        doctorId: 4,
        weekSchedule: [
            { day: 'Monday', timeSlots: createTimeSlots(['09:00', '10:00', '11:00', '12:30', '13:30', '16:00', '17:00']) },
            { day: 'Tuesday', timeSlots: createTimeSlots(['09:00', '10:00', '12:30', '16:00']) },
            { day: 'Wednesday', timeSlots: createTimeSlots(['09:00', '11:00', '12:30', '13:30', '14:30', '17:00']) },
            { day: 'Thursday', timeSlots: createTimeSlots(['10:00', '11:00', '13:30', '16:00', '17:00']) },
            { day: 'Friday', timeSlots: createTimeSlots(['09:00', '10:00', '12:30', '14:30']) },
            { day: 'Saturday', timeSlots: createTimeSlots(['09:00', '10:00']) }
        ],
        consultationDuration: 20
    },
    // Doctor 5 - Dr. Kailash (Limited availability)
    {
        doctorId: 5,
        weekSchedule: [
            { day: 'Monday', timeSlots: createTimeSlots(['10:00', '18:00', '19:00']) },
            { day: 'Wednesday', timeSlots: createTimeSlots(['10:00', '11:00']) },
            { day: 'Friday', timeSlots: createTimeSlots(['15:00', '16:00', '18:00', '19:00']) }
        ],
        consultationDuration: 25
    }
];

export const getAppointmentScheduleByDoctorId = (doctorId: number): AppointmentSchedule | undefined => {
    return appointmentSchedules.find(schedule => schedule.doctorId === doctorId);
};

export const getSlotsByDay = (doctorId: number, dayName: string): TimeSlot[] => {
    const schedule = getAppointmentScheduleByDoctorId(doctorId);
    if (!schedule) return [];

    const daySchedule = schedule.weekSchedule.find(ds => ds.day === dayName);
    return daySchedule?.timeSlots || [];
};
