import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../../../../components/molecules/button/Button';
import './QuickActions.style.css'
import { useAuth } from '../../../../auth/useAuth';
import { useModal } from '../../../../components/atoms/modal/hook/useModal';
import { ModalClient } from '../../../../components/organisms/modalClient/ModalClient';

export const QuickActions = () => {
    const { state } = useAuth();
    const { isOpen, open, close } = useModal();
    const navigate = useNavigate();
    const isAdmin = state?.user?.role === "admin"

    return (
        <>
            <ul className="quick-actions">
                <li>

                    <ButtonComponent
                        type="button"
                        className='quick-buttons'
                        onClick={() => navigate("/appointment")}
                    >
                        Crear turno
                        <span aria-hidden="true">➕</span>
                    </ButtonComponent>

                </li>
                <li>
                    <ButtonComponent
                        type="button"
                        className='quick-buttons'
                        onClick={open}
                    >
                        Nuevo cliente
                        <span aria-hidden="true">👤</span>
                    </ButtonComponent>
                </li>
                <li>

                    <ButtonComponent
                        type="button"
                        className='quick-buttons'
                        disabled={!isAdmin}
                        onClick={() => navigate("/reports")}
                    >
                        Reportes
                        <span aria-hidden="true">📅</span>
                    </ButtonComponent>

                </li>
            </ul>
            {!isOpen ? null :
                <ModalClient isOpen={isOpen} open={open} close={close} />
            }
        </>
    )
}