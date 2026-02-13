
import './Calendar.style.css'
import { CalendarDays } from "./CalendarDays"
import { CalendarNavbar } from './CalendarNavbar';
import { useCalendar } from './hooks/useCalendar';


export const Calendar = () => {
    const {days,  selectDay, goToNextMonth, goToPreviousMonth, month, year } = useCalendar({ calendarId: 'default' });

    return ( 
        <div >
            <CalendarNavbar month={month} year={year} onPreviousMonth={goToPreviousMonth} onNextMonth={goToNextMonth} />
            <CalendarDays  days={days} onSelectDay={selectDay}/>
        </div>

    )
}