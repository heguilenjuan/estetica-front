import { useState, type ChangeEvent } from "react";
import { ButtonComponent } from "../../../../shared/components/atoms/button/Button";
import { InputComponent } from "../../../../shared/components/atoms/input/Input";
import "./TreatmentForm.style.css";
import type { TreatmentCreate, TreatmentView } from "../../types/services.types";
import { useCreateTreatment, useUpdateTreatment } from "../../hooks/useTreatments";

interface TreatmentFormProps {
    onSuccess?: () => void;
    initialData?: TreatmentView;
}

export const TreatmentForm = ({ onSuccess, initialData }: TreatmentFormProps) => {
    const isEditing = !!initialData;

    const [formData, setFormData] = useState<TreatmentCreate>({
        categoryId: initialData?.categoryId ?? "",
        name: initialData?.name ?? "",
        description: initialData?.description ?? "",
        price: initialData?.price ?? 0,
        costPrice: initialData?.costPrice ?? 0,
        durationMin: initialData?.durationMin ?? 0,
        isActive: initialData?.isActive ?? true,
    });

    const { create, loading: loadingCreate, error: errorCreate } = useCreateTreatment();
    const { update, loading: loadingUpdate, error: errorUpdate } = useUpdateTreatment();

    const loading = isEditing ? loadingUpdate : loadingCreate;
    const error = isEditing ? errorUpdate : errorCreate;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, isActive: event.target.checked }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = isEditing
            ? await update(initialData!.id, formData)
            : await create(formData);
        if (success) onSuccess?.();
    };

    return (
        <form className="form-treatment" onSubmit={handleSubmit}>
            <InputComponent
                label="ID de categoría"
                name="categoryId"
                id="categoryId"
                type="text"
                placeholder="Ej: cat-1"
                defaultValue={formData.categoryId}
                onChange={handleChange}
            />
            <InputComponent
                label="Nombre"
                name="name"
                id="name"
                type="text"
                placeholder="Ej: Corte de cabello"
                defaultValue={formData.name}
                onChange={handleChange}
            />
            <InputComponent
                label="Descripción"
                name="description"
                id="description"
                type="text"
                placeholder="Ej: Sesión completa"
                defaultValue={formData.description ?? ""}
                onChange={handleChange}
            />
            <InputComponent
                label="Precio"
                name="price"
                id="price"
                type="number"
                placeholder="Ej: 5000"
                defaultValue={String(formData.price)}
                onChange={handleChange}
            />
            <InputComponent
                label="Precio de costo"
                name="costPrice"
                id="costPrice"
                type="number"
                placeholder="Ej: 2000"
                defaultValue={String(formData.costPrice ?? 0)}
                onChange={handleChange}
            />
            <InputComponent
                label="Duración (minutos)"
                name="durationMin"
                id="durationMin"
                type="number"
                placeholder="Ej: 30"
                defaultValue={String(formData.durationMin)}
                onChange={handleChange}
            />
            <label className="form-treatment-checkbox">
                <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive ?? true}
                    onChange={handleCheckboxChange}
                />
                Activo
            </label>

            <ButtonComponent className="form-treatment-btn" type="submit" disabled={loading}>
                {loading
                    ? (isEditing ? "Guardando..." : "Creando...")
                    : (isEditing ? "Guardar cambios" : "Crear tratamiento")}
            </ButtonComponent>
            {error && <p className="error">{error}</p>}
        </form>
    );
};
