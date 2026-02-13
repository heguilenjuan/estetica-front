import type { CalendarDay } from "../../../models/calendar.model";
import type { CalendarDayView } from "../Calendar.types";

interface MergeParams {
    gridDays: CalendarDayView[];
    backendDays: CalendarDay[];
    selectedDay: string | null;
    today: string;
}

export const mergeBackendDays = (
    {
        gridDays,
        backendDays,
        selectedDay,
        today
    }: MergeParams
): CalendarDayView[] => {
    const backendByDate = new Map<string, CalendarDay>();

    for (const day of backendDays) {
        backendByDate.set(day.date, day);
    }

    return gridDays.map((day) => {
        const backendDay = backendByDate.get(day.date);

        const availableSlots = backendDay?.availableSlots ?? 0;

        return {
            ...day,
            isToday: day.date === today,
            isSelected: day.date === selectedDay,
            availableSlots,
            hasAvailability: availableSlots > 0,
            isDisabled:
                !day.isCurrentMonth || availableSlots === 0,
        };
    });
}
