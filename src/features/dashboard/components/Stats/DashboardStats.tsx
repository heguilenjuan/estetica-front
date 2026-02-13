import './DashboardStats.style.css'

export const DashboardStats = () => {

    return (
        <>
            <dl className="stats-card">
                <dt>
                    <span className="stats-title">Ingresos diarios</span>
                    <span className="stats-icon">💰</span>
                </dt>
                <dd>
                    <span className="stats-value">$1,240.50</span>
                </dd>
            </dl>

            <dl className="stats-card">
                <dt>
                    <span className="stats-title">Nuevos clientes</span>
                    <span className="stats-icon">👥</span>
                </dt>
                <dd>
                    <span className="stats-value">12</span>
                </dd>
            </dl>

            <dl className="stats-card">
                <dt>
                    <span className="stats-title">Turnos ocupados</span>
                    <span className="stats-icon">📊</span>
                </dt>
                <dd>
                    <span className="stats-value">50%</span>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "50%" }}></div>
                    </div>
                </dd>
            </dl>
        </>

    )
}
