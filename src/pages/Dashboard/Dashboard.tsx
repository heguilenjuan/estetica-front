import { Calendar } from '../../components/calendar/Calendar'
import { SessionsOverview } from './components/SessionOverview'
import './Dashborad.style.css'
const DashboardPage = () => {
  return (
    <main> 
      <h2>Navbar</h2>
      <div>
        Estilo bredcrum? o
        btns de book Appointment, Add Client y Inventory, etc
      </div>
      <div className='dashboard-session'>
        <Calendar />
        <SessionsOverview />
      </div>

    </main>
  )
}

export default DashboardPage