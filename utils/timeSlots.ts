
import { TimeSlot, CategorizedSlots, DoctorSchedule } from '@/types/doctor';
import { DoctorScheduleSlot as ApptDoctorScheduleSlot } from '@/types/appointment';

export function categorizeTimeSlots(timeSlots: TimeSlot[]): CategorizedSlots {
    const categorized: CategorizedSlots = {
        morning: [],
        afternoon: [],
        evening: []
    };

    timeSlots.forEach(slot => {
        const hour = parseInt(slot.time.split(':')[0], 10);

        if (hour >= 6 && hour < 12) {
            categorized.morning.push(slot);
        } else if (hour >= 12 && hour < 17) {
            categorized.afternoon.push(slot);
        } else if (hour >= 17 && hour <= 20) {
            categorized.evening.push(slot);
        }
    });

    return categorized;
}

export function convertTo12Hour(time24: string): string {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function convertTo24Hour(time12: string): string {
    const [time, period] = time12.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    let hours24 = hours;
    if (period === 'PM' && hours !== 12) {
        hours24 = hours + 12;
    } else if (period === 'AM' && hours === 12) {
        hours24 = 0;
    }

    return `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


export function getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

export function generateTimeSlots(schedule: ApptDoctorScheduleSlot[], date: Date): TimeSlot[] {
    const dayName = getDayName(date).toLowerCase();
    const daysSchedule = schedule.find(s => s.day.toLowerCase() === dayName);

    if (!daysSchedule || !daysSchedule.is_available) {
        return [];
    }

    const slots: TimeSlot[] = [];
    const [startHour, startMinute] = daysSchedule.start_time.split(':').map(Number);
    const [endHour, endMinute] = daysSchedule.end_time.split(':').map(Number);

    let currentHour = startHour;
    let currentMinute = startMinute;

    const duration = daysSchedule.slot_duration || 30; // Default to 30 mins if not specified

    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
        const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

        slots.push({
            time: timeString,
            available: true, // Assuming all generated slots are available for now
            date: date.toISOString().split('T')[0]
        });

        currentMinute += duration;
        while (currentMinute >= 60) {
            currentHour++;
            currentMinute -= 60;
        }
    }

    return slots;
}
