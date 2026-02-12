import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../../../../components/molecules/button/Button';
import './QuickActions.style.css'
import { useAuth } from '../../../../auth/useAuth';
import { useModal } from '../../../../components/atoms/modal/hook/useModal';
import { ModalComponent } from '../../../../components/atoms/modal/Modal';

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
                <ModalComponent isOpen={isOpen} onClose={close}>
                    <div className="modal-content">
                        <header className="modal-header">
                            <h2>Nuevo cliente</h2>
                            <button onClick={close}>✖</button>
                        </header>

                        <div className="modal-body">
                            <p>Formulario de cliente aquí</p>
                        </div>
                    </div>
                </ModalComponent>
            }
        </>
    )
}