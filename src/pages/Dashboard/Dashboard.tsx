import { Calendar } from '../../components/atoms/calendar/Calendar'
import LayoutComponent from '../layout'
import QuickActions from './components/Actions/QuickActions'
import { SessionsOverview } from './components/Session/SessionOverview'
import DashboardStats from './components/Stats/DashboardStats'
import './Dashborad.style.css'


const DashboardPage = () => {
  return (
    <LayoutComponent>
      <main className='dashboard-page'>
        <section aria-label='acciones rapidas'>
          <QuickActions />
        </section>
        <section className='dashboard-stats' aria-label='estadisticas generales'>
          <DashboardStats />
        </section>
        <section aria-label='agenda'>
          <Calendar />
          <SessionsOverview />
        </section>
      </main>
    </LayoutComponent>
  )
}

export default DashboardPage