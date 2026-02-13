
import  { LayoutComponent } from '../../../Layout'
import { Calendar } from '../../../shared/components/organisms/calendar/Calendar'
import { QuickActions } from '../components/Actions/QuickActions'
import { SessionsOverview } from '../components/Session/SessionOverview'
import { DashboardStats } from '../components/Stats/DashboardStats'
import './Dashborad.style.css'


export const DashboardPage = () => {
  return (
    <LayoutComponent>
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
    </LayoutComponent>
  )
}