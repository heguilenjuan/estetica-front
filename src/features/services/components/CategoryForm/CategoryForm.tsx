import { useState, type ChangeEvent } from "react"
import { ButtonComponent } from "../../../../shared/components/atoms/button/Button"
import { InputComponent } from "../../../../shared/components/atoms/input/Input"
import "./CategoryForm.style.css"
import type { CategoryCreate } from "../../types/services.types"
import { useCreateCategory } from "../../hooks/useCategories"

interface CategoryFormProps {
    onSuccess?: () => void;
}

export const CategoryForm = ({ onSuccess }: CategoryFormProps) => {
    const [newCategory, setNewCategory] = useState<CategoryCreate>({
        professionId: "",
        name: "",
        icon: "",
    })

    const { create, loading, error } = useCreateCategory();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setNewCategory((prev) => ({
            ...prev,
            [name as keyof CategoryCreate]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success = await create(newCategory);
        if (success) onSuccess?.();
    }

    return (
        <form className="form-category" onSubmit={handleSubmit}>
            <InputComponent
                label="ID de profesión"
                name="professionId"
                id="professionId"
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
                placeholder="Ej: Depilación"
                defaultValue=""
                onChange={handleChange}
            />
            <InputComponent
                label="Ícono"
                name="icon"
                id="icon"
                type="text"
                placeholder="Ej: scissors"
                defaultValue=""
                onChange={handleChange}
            />

            <ButtonComponent
                className="form-category-btn"
                type="submit"
                disabled={loading}
            >
                {loading ? "Creando..." : "Crear categoría"}
            </ButtonComponent>
            {error && <p className="error">{error}</p>}
        </form>
    )
}
