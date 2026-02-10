import './QuickActions.style.css'

const QuickActions = () => {
    return (
        <ul className="quick-actions">
            <li>
                <button type="button" className='quick-buttons'>
                    Crear turno
                    <span aria-hidden="true">➕</span>
                </button>
            </li>
            <li>
                <button type="button" className='quick-buttons'>
                    Nuevo cliente
                    <span aria-hidden="true">👤</span>
                </button>
            </li>
            <li>
                <button type="button" className='quick-buttons'>
                    Reportes
                    <span aria-hidden="true">📅</span>
                </button>
            </li>
        </ul>
    )
}

export default QuickActions;