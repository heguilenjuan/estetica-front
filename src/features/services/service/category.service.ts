import type { Category, CategoryCreate, CategoryView } from "../types/services.types";

export const getCategories = async (): Promise<CategoryView[]> => {
    const res = await fetch('/categories', { credentials: 'include' });
    if (!res.ok) throw new Error("Error al obtener categorías");
    return res.json();
};

export const createCategory = async (payload: CategoryCreate): Promise<Category> => {
    const res = await fetch('/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Error al crear categoría");
    return res.json();
};

export const updateCategory = async (id: string, payload: Partial<CategoryCreate>): Promise<Category> => {
    const res = await fetch(`/categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Error al actualizar categoría");
    return res.json();
};

export const deleteCategory = async (id: string): Promise<void> => {
    const res = await fetch(`/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok) throw new Error("Error al eliminar categoría");
};
