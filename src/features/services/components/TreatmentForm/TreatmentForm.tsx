import { useState, type ChangeEvent } from "react"
import { ButtonComponent } from "../../../../shared/components/atoms/button/Button"
import { InputComponent } from "../../../../shared/components/atoms/input/Input"
import "./TreatmentForm.style.css"
import type { TreatmentCreate } from "../../types/services.types"
import { useCreateTreatment } from "../../hooks/useTreatments"

interface TreatmentFormProps {
    onSuccess?: () => void;
}

export const TreatmentForm = ({ onSuccess }: TreatmentFormProps) => {
    const [newTreatment, setNewTreatment] = useState<TreatmentCreate>({
        categoryId: "",
        name: "",
        description: "",
        price: 0,
        costPrice: 0,
        durationMin: 0,
    })

    const { create, loading, error } = useCreateTreatment();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;

        setNewTreatment((prev) => ({
            ...prev,
            [name as keyof TreatmentCreate]: type === "number" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = await create(newTreatment);
        if (success) onSuccess?.();
    }

    return (
        <form className="form-treatment" onSubmit={handleSubmit}>
            <InputComponent
                label="ID de categoría"
                name="categoryId"
                id="categoryId"
                type="text"
                placeholder="Ej: abc123"
                defaultValue=""
                onChange={handleChange}
            />
            <InputComponent
                label="Nombre"
                name="name"
                id="name"
                type="text"
                placeholder="Ej: Corte de cabello"
                defaultValue=""
                onChange={handleChange}
            />
            <InputComponent
                label="Descripción"
                name="description"
                id="description"
                type="text"
                placeholder="Ej: Corte clásico para caballero"
                defaultValue=""
                onChange={handleChange}
            />
            <InputComponent
                label="Precio"
                name="price"
                id="price"
                type="number"
                placeholder="Ej: 5000"
                onChange={handleChange}
            />
            <InputComponent
                label="Precio de costo"
                name="costPrice"
                id="costPrice"
                type="number"
                placeholder="Ej: 2000"
                onChange={handleChange}
            />
            <InputComponent
                label="Duración (minutos)"
                name="durationMin"
                id="durationMin"
                type="number"
                placeholder="Ej: 30"
                onChange={handleChange}
            />

            <ButtonComponent
                className="form-treatment-btn"
                type="submit"
                disabled={loading}
            >
                {loading ? "Creando..." : "Crear tratamiento"}
            </ButtonComponent>
            {error && <p className="error">{error}</p>}
        </form>
    )
}
