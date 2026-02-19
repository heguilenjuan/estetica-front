import { ButtonComponent } from "../../../shared/components/atoms/button/Button"
import { InputComponent } from "../../../shared/components/atoms/input/Input"
import { useModal } from "../../../shared/components/organisms/modal/hook/useModal"
import { ModalClient } from "../../clients/components/ModalClient";
import '../styles/Appointment.styles.css'
import { ClientSelector } from "./ClientSelector";

export const AppointmentForm = () => {

    const { open, isOpen, close } = useModal();

    return (
        <>
            <form>
                <fieldset className="appointment-client">
                    <legend>
                        Seleccionar cliente
                    </legend>
                    <ClientSelector />
                    <ButtonComponent
                        type="button"
                        onClick={open}
                    >
                        +
                    </ButtonComponent>
                </fieldset>
                <fieldset>
                    <legend>
                        Elegir Tratamientos
                    </legend>
                    <div>
                        <InputComponent
                            type="checkbox"
                            name="treatment"
                        />
                        <span>Tratamiento perro</span>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Profesional
                    </legend>

                </fieldset>

                <fieldset>
                    <legend>
                        Fecha y hora (Calendario)
                    </legend>
                    <InputComponent
                        type="datetime-local"
                        name="date" />
                </fieldset>
                <fieldset>
                    <legend>
                        Pago y observaciones.

                    </legend>
                </fieldset>

            </form>
            {!isOpen ? null :
                <ModalClient isOpen={isOpen} open={open} close={close} />
            }
        </>

    )
}