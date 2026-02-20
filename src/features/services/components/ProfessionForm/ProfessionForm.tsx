import { useState, type ChangeEvent } from "react"
import { ButtonComponent } from "../../../../shared/components/atoms/button/Button"
import { InputComponent } from "../../../../shared/components/atoms/input/Input"
import "./ProfessionForm.style.css"
import type { ProfessionCreate } from "../../types/services.types"
import { useCreateProfession } from "../../hooks/useProfession"

interface ProfessionFormProps {
    onSuccess?: () => void;
}

export const ProfessionForm = ({ onSuccess }: ProfessionFormProps) => {
    const [newProfession, setNewProfession] = useState<ProfessionCreate>({
        name: "",
        description: "",
        color: "",
    })

    const { create, loading, error } = useCreateProfession();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setNewProfession((prev) => ({
            ...prev,
            [name as keyof ProfessionCreate]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = await create(newProfession);
        if (success) onSuccess?.();
    }

    return (
        <form className="form-profession" onSubmit={handleSubmit}>
            <InputComponent
                label="Nombre"
                name="name"
                id="name"
                type="text"
                placeholder="Ej: Estética"
                defaultValue=""
                onChange={handleChange}
            />
            <InputComponent
                label="Descripción"
                name="description"
                id="description"
                type="text"
                placeholder="Ej: Tratamientos de belleza y cuidado"
                defaultValue=""
                onChange={handleChange}
            />
            <InputComponent
                label="Color"
                name="color"
                id="color"
                type="color"
                onChange={handleChange}
            />

            <ButtonComponent
                className="form-profession-btn"
                type="submit"
                disabled={loading}
            >
                {loading ? "Creando..." : "Crear profesión"}
            </ButtonComponent>
            {error && <p className="error">{error}</p>}
        </form>
    )
}
