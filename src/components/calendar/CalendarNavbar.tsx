import './Calendar.style.css'
import type { CalendarNavbarProps } from './Calendar.types'

export const CalendarNavbar =  ({
    month,
    year,
    onPreviousMonth,
    onNextMonth
}:CalendarNavbarProps) => {
    return(
        <div className='calendar-navbar'>
            <button onClick={onPreviousMonth}>&lt;</button>
            <p>{month} - {year}</p>
            <button onClick={onNextMonth}>&gt;</button>
        </div>
    )
}