import type { CalendarDayView } from "../Calendar.types";

export const buildMonthGrid = (
  year: number,
  month: number
): CalendarDayView[] => {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay(); // 0 = domingo

  const gridStartDate = new Date(year, month, 1 - firstDayOfWeek);

  const days: CalendarDayView[] = [];

  for (let i = 0; i < 42; i++) {
    const d = new Date(
      gridStartDate.getFullYear(),
      gridStartDate.getMonth(),
      gridStartDate.getDate() + i
    );

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    const dateString = `${yyyy}-${mm}-${dd}`;

    days.push({
        date: dateString, // 👈 CLAVE
        dayNumber: d.getDate(),
        isCurrentMonth: d.getMonth() === month,
        isToday: false, // se setea en el merge
        isDisabled: false, // se setea en el merge
        isSelected: false,
    });
  }

  return days;
};
