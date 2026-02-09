import { Calendar } from '../../components/calendar/Calendar'
import QuickActions from './components/Actions/QuickActions'
import { SessionsOverview } from './components/Session/SessionOverview'
import DashboardStats from './components/Stats/DashboardStats'
import './Dashborad.style.css'


const DashboardPage = () => {
  return (
    <main className='dashboard-page'>
      <h2>Navbar</h2>
      <section aria-label='acciones rapidas'>
        <QuickActions />
      </section>
      <section aria-label='estado de la aplicacion'>
        <DashboardStats />
      </section>
      <section aria-label='agenda'>
        <Calendar />
        <SessionsOverview />
      </section>

    </main>
  )
}

export default DashboardPage