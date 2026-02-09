import './DashboardStats.style.css'

const DashboardStats = () => {

    return (
        <div className="dashboard-stats">
            <dl className="stats-card">
                <dt>
                    <span className="stats-title">Daily Revenue</span>
                    <span className="stats-icon">💰</span>
                </dt>
                <dd>
                    <span className="stats-value">$1,240.50</span>
                    <span className="stats-subtext">+12% vs yesterday</span>
                </dd>
            </dl>

            <dl className="stats-card">
                <dt>
                    <span className="stats-title">New Clients</span>
                    <span className="stats-icon">👥</span>
                </dt>
                <dd>
                    <span className="stats-value">12</span>
                    <span className="stats-subtext">High engagement today</span>
                </dd>
            </dl>

            <dl className="stats-card">
                <dt>
                    <span className="stats-title">Occupancy Rate</span>
                    <span className="stats-icon">📊</span>
                </dt>
                <dd>
                    <span className="stats-value">85%</span>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "85%" }}></div>
                    </div>
                </dd>
            </dl>
        </div>

    )
}

export default DashboardStats;