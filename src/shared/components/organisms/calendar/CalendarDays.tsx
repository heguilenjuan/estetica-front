import './Calendar.style.css'
import type { CalendarDaysProps, CalendarDayView } from './Calendar.types';

export const CalendarDays = ({
    days,
    onSelectDay,
}: CalendarDaysProps) => {

    const weeks = days.reduce<CalendarDayView[][]>((acc, current, index) => {
        const weekIndex = Math.floor(index / 7);
        if (!acc[weekIndex]) {
            acc[weekIndex] = []
        }
        acc[weekIndex].push(current)
        return acc
    }, [])

    return (
        <table className='calendar'>
            <thead>
                <tr>
                    <th scope="col">DOM</th>
                    <th scope="col">LUN</th>
                    <th scope="col">MAR</th>
                    <th scope="col">MIE</th>
                    <th scope="col">JUE</th>
                    <th scope="col">VIE</th>
                    <th scope="col">SAB</th>
                </tr>
            </thead>
            <tbody>
                {
                    weeks.map((week, index) => (
                        <tr key={`week- ${index}`}>
                            {week.map((day) => (
                                <td
                                    key={`day-${day.date}`}
                                    onClick={() => !day.isDisabled && onSelectDay(day)}
                                    className={[
                                        !day.isCurrentMonth && 'is-outside',
                                        day.isToday && 'is-today',
                                        day.isDisabled && 'is-disabled'
                                    ].filter(Boolean).join(' ')}
                                >
                                    {day.dayNumber}
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
