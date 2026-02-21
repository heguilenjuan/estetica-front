import type { HookModalResponse } from '../../../shared/components/organisms/modal/hook/useModal'
import { ModalComponent } from '../../../shared/components/organisms/modal/Modal'
import { ClientForm } from './ClientForm'
import './ModalClient.style.css'

export const ModalClient = ({ isOpen, close }: HookModalResponse) => {
    return (
    <ModalComponent isOpen={isOpen} onClose={close} title='Nuevo cliente'>
        <ClientForm onSuccess={close} />
    </ModalComponent>
    )
}