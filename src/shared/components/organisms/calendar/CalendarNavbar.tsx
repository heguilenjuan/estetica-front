import  { ButtonComponent } from '../../atoms/button/Button'
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
            <ButtonComponent onClick={onPreviousMonth}>&lt;</ButtonComponent>
            <p>{month} - {year}</p>
            <ButtonComponent onClick={onNextMonth}>&gt;</ButtonComponent>
        </div>
    )
}