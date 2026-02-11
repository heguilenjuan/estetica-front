import { ButtonComponent } from '../../../../components/molecules/button/Button';
import './QuickActions.style.css'

export const QuickActions = () => {
    return (
        <ul className="quick-actions">
            <li>
                <ButtonComponent type="button" className='quick-buttons'>
                    Crear turno
                    <span aria-hidden="true">➕</span>
                </ButtonComponent>
            </li>
            <li>
                <ButtonComponent type="button" className='quick-buttons'>
                    Nuevo cliente
                    <span aria-hidden="true">👤</span>
                </ButtonComponent>
            </li>
            <li>
                <ButtonComponent type="button" className='quick-buttons'>
                    Reportes
                    <span aria-hidden="true">📅</span>
                </ButtonComponent>
            </li>
        </ul>
    )
}