import { useState, type ChangeEvent } from "react";
import { ButtonComponent } from "../../../../shared/components/atoms/button/Button";
import { InputComponent } from "../../../../shared/components/atoms/input/Input";
import "./CategoryForm.style.css";
import type { CategoryCreate, CategoryView } from "../../types/services.types";
import { useCreateCategory, useUpdateCategory } from "../../hooks/useCategories";

interface CategoryFormProps {
    onSuccess?: () => void;
    initialData?: CategoryView;
}

export const CategoryForm = ({ onSuccess, initialData }: CategoryFormProps) => {
    const isEditing = !!initialData;

    const [formData, setFormData] = useState<CategoryCreate>({
        professionId: initialData?.professionId ?? "",
        name: initialData?.name ?? "",
        icon: initialData?.icon ?? "",
    });

    const { create, loading: loadingCreate, error: errorCreate } = useCreateCategory();
    const { update, loading: loadingUpdate, error: errorUpdate } = useUpdateCategory();

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
        <form className="form-category" onSubmit={handleSubmit}>
            <InputComponent
                label="ID de profesión"
                name="professionId"
                id="professionId"
                type="text"
                placeholder="Ej: prof-1"
                defaultValue={formData.professionId}
                onChange={handleChange}
            />
            <InputComponent
                label="Nombre"
                name="name"
                id="name"
                type="text"
                placeholder="Ej: Depilación"
                defaultValue={formData.name}
                onChange={handleChange}
            />
            <InputComponent
                label="Ícono"
                name="icon"
                id="icon"
                type="text"
                placeholder="Ej: ✂️"
                defaultValue={formData.icon ?? ""}
                onChange={handleChange}
            />

            <ButtonComponent className="form-category-btn" type="submit" disabled={loading}>
                {loading
                    ? (isEditing ? "Guardando..." : "Creando...")
                    : (isEditing ? "Guardar cambios" : "Crear categoría")}
            </ButtonComponent>
            {error && <p className="error">{error}</p>}
        </form>
    );
};
