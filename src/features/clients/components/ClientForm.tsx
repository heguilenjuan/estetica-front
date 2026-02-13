import  { ButtonComponent } from "../../../shared/components/atoms/button/Button"
import  { InputComponent } from "../../../shared/components/atoms/input/Input"
import "./ClientForm.style.css"
export const ClientForm = () => {
    

    return (
        <form className="form-client">
            <InputComponent
                label="Nombre"
                name="name"
                id="name"
                type="text"
                placeholder="Ej: Juan"
                defaultValue=""
            />
            <InputComponent
                label="Apellido"
                name="lastname"
                id="lastname"
                type="text"
                placeholder="Ej: Gonzalez"
                defaultValue=""
            />
            <InputComponent
                label="Fecha de Nacimiento"
                name="birthDate"
                id="birthDate"
                type="date"
            />
            <InputComponent
                label="Numero de telefono"
                name="phoneNumber"
                id="phoneNumber"
                type="text"
                placeholder="Ej: 2914332255"
            />

            <ButtonComponent
                className="form-client-btn"
                type="submit"
            >
                Crear usuario
            </ButtonComponent>
        </form>
    )
}