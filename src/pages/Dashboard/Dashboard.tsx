import { Calendar } from '../../components/calendar/Calendar'
import { SessionsOverview } from './components/SessionOverview'
import './Dashborad.style.css'
const DashboardPage = () => {
  return (
    <main className='dashboard-page'>
      <h2>Navbar</h2>
      <div>
        Estilo bredcrum? o
        btns de book Appointment, Add Client y Inventory, etc
      </div>
      <section >
        <Calendar />
        <SessionsOverview />
      </section>

    </main>
  )
}

export default DashboardPage