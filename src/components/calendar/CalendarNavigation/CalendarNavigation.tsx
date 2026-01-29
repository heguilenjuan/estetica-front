
import './CalendarNavigation.style.css'

export const CalendarNavigation =  () => {
    return(
        <div className='calendarNavigation-box'>
            <button>&lt;</button>
            <p className='calendarNavigation-date'>19 de mayo - 2026</p>
            <button>&gt;</button>
        </div>
    )
}