import { useDailyStats } from '../../hooks/useDailyStats'
import './DashboardStats.style.css'

export const DashboardStats = () => {
    +
    const { stats } = useDailyStats();

    return (
        <>
            <dl className="stats-card">
                <dt>
                    <span className="stats-title">Ingresos diarios</span>
                    <span className="stats-icon">💰</span>
                </dt>
                <dd>
                    <span className="stats-value">{stats?.dailyRevenue}</span>
                </dd>
            </dl>

            <dl className="stats-card">
                <dt>
                    <span className="stats-title">Nuevos clientes</span>
                    <span className="stats-icon">👥</span>
                </dt>
                <dd>
                    {stats?.newClientsToday}
                </dd>
            </dl>

            <dl className="stats-card">
                <dt>
                    <span className="stats-title">Turnos ocupados</span>
                    <span className="stats-icon">📊</span>
                </dt>
                <dd>
                    <span className="stats-value">{stats?.appointmentsOccupied}%</span>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "50%" }}></div>
                    </div>
                </dd>
            </dl>
        </>

    )
}
