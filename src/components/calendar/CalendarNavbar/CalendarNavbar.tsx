
import type { CalendarNavbarProps } from '../Calendar.types'
import './CalendarNavbar.style.css'

export const CalendarNavbar =  ({
    month,
    year,
    onPreviousMonth,
    onNextMonth
}:CalendarNavbarProps) => {
    return(
        <div className='calendarNavbar-box'>
            <button onClick={onPreviousMonth}>&lt;</button>
            <p className='calendarNavbar-date'>{month} - {year}</p>
            <button onClick={onNextMonth}>&gt;</button>
        </div>
    )
}