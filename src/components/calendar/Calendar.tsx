
import './Calendar.style.css'
import { CalendarDays } from "./CalendarDays/CalendarDays"
import { CalendarNavbar } from './CalendarNavbar/CalendarNavbar'
import { useCalendar } from './hooks/useCalendar';


export const Calendar = () => {
    const {days,  selectDay, goToNextMonth, goToPreviousMonth, month, year } = useCalendar({ calendarId: 'default' });

    console.log(days)
    return ( 
        <div className='calendar-container'>
            <CalendarNavbar month={month} year={year} onPreviousMonth={goToPreviousMonth} onNextMonth={goToNextMonth} />
            <CalendarDays  days={days} onSelectDay={selectDay}/>
        </div>

    )
}