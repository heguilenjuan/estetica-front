import { useEffect, useState } from "react";
import type { CalendarDayView } from "../Calendar.types";
import { nowInTimezone, startOfMonth, getYear, getMonth, addMonths } from "../utils/date";
import { buildMonthGrid } from "../domain/buildMonthGrid";
import { mergeBackendDays } from "../domain/mergeBackendDays";
import { buildNameMonth } from "../domain/buildNameMonth";

interface UseCalendarParams {
    calendarId: string;
}

interface UseCalendarResult {
    timezone: string | null;
    year: number;
    month: string;
    days: CalendarDayView[];
    selectedDay: string | null;
    goToNextMonth: () => void;
    goToPreviousMonth: () => void;
    selectDay: (day: CalendarDayView) => void
}

export const useCalendar = ({ calendarId }: UseCalendarParams): UseCalendarResult => {
    const [timezone, setTimezone] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [days, setDays] = useState<CalendarDayView[]>([]);


    useEffect(() => {
        const loadCalendar = async () => {
            const res = await fetch(`/calendars/${calendarId}`);
            const calendar = await res.json();
            setTimezone(calendar.timezone);
        }

        loadCalendar();
    }, [calendarId]);


    useEffect(() => {
        if (!timezone) return;
        const today = nowInTimezone(timezone);
        setCurrentMonth(startOfMonth(today));
        setSelectedDay(today.toISOString().split('T')[0]);
    }, [timezone]);

    useEffect(() => {
        if (!timezone || !currentMonth) return;

        const loadMotnh = async () => {
            const year = getYear(currentMonth);
            const month = getMonth(currentMonth);
            const daysMonth = buildMonthGrid(year, month);


            const res = await fetch(
                `/calendar/${calendarId}/month?year=${year}&month=${month}`
            );
            const backend = await res.json();

            const today = nowInTimezone(timezone);


            const mergedDays = mergeBackendDays({
                gridDays: daysMonth,
                today: today.toISOString().split('T')[0],
                backendDays: backend.days,
                selectedDay,
            })

            setDays(mergedDays);

        }

        loadMotnh();
    }, [calendarId, timezone, currentMonth])

    const goToNextMonth = () => {
        if (!currentMonth) return;
        setCurrentMonth(addMonths(currentMonth, 1));
    }

    const goToPreviousMonth = () => {
        if (!currentMonth) return;
        setCurrentMonth(addMonths(currentMonth, -1));
    }

    const selectDay = (day: CalendarDayView) => {
        setSelectedDay(day.date);
    }


    return {
        timezone,
        year: currentMonth ? getYear(currentMonth) : 0,
        month: currentMonth ? buildNameMonth(getMonth(currentMonth)) : '',
        days,
        selectedDay,
        goToNextMonth,
        goToPreviousMonth,
        selectDay
    }
}