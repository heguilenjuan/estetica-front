import { useState, type ChangeEvent } from "react";
import { ButtonComponent } from "../../../../shared/components/atoms/button/Button";
import { InputComponent } from "../../../../shared/components/atoms/input/Input";
import "./ProfessionForm.style.css";
import type { Profession, ProfessionCreate } from "../../types/services.types";
import { useCreateProfession, useUpdateProfession } from "../../hooks/useProfession";

interface ProfessionFormProps {
    onSuccess?: () => void;
    initialData?: Profession;
}

export const ProfessionForm = ({ onSuccess, initialData }: ProfessionFormProps) => {
    const isEditing = !!initialData;

    const [formData, setFormData] = useState<ProfessionCreate>({
        name: initialData?.name ?? "",
        description: initialData?.description ?? "",
        color: initialData?.color ?? "#a78bfa",
    });

    const { create, loading: loadingCreate, error: errorCreate } = useCreateProfession();
    const { update, loading: loadingUpdate, error: errorUpdate } = useUpdateProfession();

    const loading = isEditing ? loadingUpdate : loadingCreate;
    const error = isEditing ? errorUpdate : errorCreate;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = isEditing
            ? await update(initialData!.id, formData)
            : await create(formData);
        if (success) onSuccess?.();
    };

    return (
        <form className="form-profession" onSubmit={handleSubmit}>
            <InputComponent
                label="Nombre"
                name="name"
                id="name"
                type="text"
                placeholder="Ej: Estética"
                defaultValue={formData.name}
                onChange={handleChange}
            />
            <InputComponent
                label="Descripción"
                name="description"
                id="description"
                type="text"
                placeholder="Ej: Tratamientos de belleza y cuidado"
                defaultValue={formData.description ?? ""}
                onChange={handleChange}
            />
            <InputComponent
                label="Color"
                name="color"
                id="color"
                type="color"
                defaultValue={formData.color ?? "#a78bfa"}
                onChange={handleChange}
            />

            <ButtonComponent className="form-profession-btn" type="submit" disabled={loading}>
                {loading
                    ? (isEditing ? "Guardando..." : "Creando...")
                    : (isEditing ? "Guardar cambios" : "Crear profesión")}
            </ButtonComponent>
            {error && <p className="error">{error}</p>}
        </form>
    );
};
