import { useState, type ChangeEvent } from "react"
import { ButtonComponent } from "../../../shared/components/atoms/button/Button"
import { InputComponent } from "../../../shared/components/atoms/input/Input"
import "./ClientForm.style.css"
import type { ClientCreate } from "../models/client.model"
import { useCreateClient } from "../hooks/useCreateClient"

export const ClientForm = () => {
    const [newClient, setNewClient] = useState<ClientCreate>({
        name: "",
        lastname: "",
        birthDate: "",
        phoneNumber: ""
    })


    const { create, loading, error } = useCreateClient();

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setNewClient((prev) => ({
            ...prev,
            [name as keyof ClientCreate]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await create(newClient);
    }

    return (
        <form className="form-client" onSubmit={handleSubmit}>
            <InputComponent
                label="Nombre"
                name="name"
                id="name"
                type="text"
                placeholder="Ej: Juan"
                defaultValue=""
                onChange={handleChange}
            />
            <InputComponent
                label="Apellido"
                name="lastname"
                id="lastname"
                type="text"
                placeholder="Ej: Gonzalez"
                defaultValue=""
                onChange={handleChange}
            />
            <InputComponent
                label="Fecha de Nacimiento"
                name="birthDate"
                id="birthDate"
                type="date"
                onChange={handleChange}
            />
            <InputComponent
                label="Numero de telefono"
                name="phoneNumber"
                id="phoneNumber"
                type="text"
                placeholder="Ej: 2914332255"
                onChange={handleChange}
            />

            <ButtonComponent
                className="form-client-btn"
                type="submit"
                disabled={loading}
            >
                {loading ? "Creando..." : "Crear usuario"}
            </ButtonComponent>
            {error && <p className="error">{error}</p>}
        </form>
    )
}