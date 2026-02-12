import { NavLink } from 'react-router-dom';
import { ButtonComponent } from '../../../../components/molecules/button/Button';
import './QuickActions.style.css'
import { useAuth } from '../../../../auth/useAuth';

export const QuickActions = () => {
    const { state } = useAuth();

    return (
        <ul className="quick-actions">
            <li>
                <NavLink to={"/appointment"}>
                    <ButtonComponent
                        type="button"
                        className='quick-buttons'
                    >
                        Crear turno
                        <span aria-hidden="true">➕</span>
                    </ButtonComponent>
                </NavLink>
            </li>
            <li>
                <ButtonComponent
                    type="button"
                    className='quick-buttons'
                >
                    Nuevo cliente
                    <span aria-hidden="true">👤</span>
                </ButtonComponent>
            </li>
            <li>
                <NavLink to={"/reports"}>
                    <ButtonComponent
                        type="button"
                        className='quick-buttons'
                        disabled={state ? state.user?.role !== "admin" : true}
                    >
                        Reportes
                        <span aria-hidden="true">📅</span>
                    </ButtonComponent>
                </NavLink>
            </li>
        </ul>
    )
}