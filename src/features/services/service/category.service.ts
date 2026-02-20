import type { Category, CategoryCreate } from "../types/services.types"

export const createCategory = async (payload: CategoryCreate): Promise<Category> => {
    const response = await fetch('/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
    })

    if (!response.ok) throw new Error("Categoría no creada");

    return response.json();
}
