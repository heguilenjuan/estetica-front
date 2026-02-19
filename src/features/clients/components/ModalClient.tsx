import  { ButtonComponent } from '../../../shared/components/atoms/button/Button'
import  type { HookModalResponse } from '../../../shared/components/organisms/modal/hook/useModal'
import  { ModalComponent } from '../../../shared/components/organisms/modal/Modal'
import { ClientForm } from './ClientForm'
import './ModalClient.style.css'

export const ModalClient = ({ isOpen, close }: HookModalResponse) => {

    return (<ModalComponent isOpen={isOpen} onClose={close}>
        <div className="modal-content">
            <header className="modal-header">
                <h2>Nuevo cliente</h2>
                <ButtonComponent
                    type="button"
                    onClick={close}
                >
                    ✖
                </ButtonComponent>
            </header>
            <ClientForm onSuccess={close}/>
        </div>
    </ModalComponent>
    )
}