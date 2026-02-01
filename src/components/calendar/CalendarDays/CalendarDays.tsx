import './CalendarDays.style.css';
import type { CalendarDaysProps } from '../Calendar.types';

export const CalendarDays = ({
    days,
    onSelectDay,
}: CalendarDaysProps) => {

    return (
        <div className='calendarDays-container'>
            <ul className='calendarDays-weekDays'>
                <li>DOM</li>
                <li>LUN</li>
                <li>MAR</li>
                <li>MIE</li>
                <li>JUE</li>
                <li>VIE</li>
                <li>SAB</li>
            </ul>

            <ul className='calendarDays-days'>
                {days ? days.map((day) => (
                    <li
                        key={`${day.dayNumber}-${day.date}`}
                        onClick={() => !day.isDisabled && onSelectDay(day)}
                        className={[
                            !day.isCurrentMonth && 'is-outside',
                            day.isToday && 'is-today',
                            day.isDisabled && 'is-disabled',
                        ].filter(Boolean).join(' ')}
                    >
                        {day.dayNumber}
                    </li>
                )): null}
            </ul>

        </div>
    )
}