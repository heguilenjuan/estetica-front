export interface CalendarDayView {
    date: string;
    dayNumber: number;

    isToday: boolean;
    isCurrentMonth: boolean;
    isSelected: boolean;
    isDisabled: boolean;

    meta?: {
        availableSlots?: number;
    }
}

export interface CalendarNavbarProps {
    month: string;
    year: number;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
}

export interface CalendarDaysProps {
    days: CalendarDayView[]
    onSelectDay: (day: CalendarDayView) => void
}
