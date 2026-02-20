import { useState } from "react"
import type { CategoryCreate } from "../types/services.types"
import { createCategory } from "../service/category.service"

export const useCreateCategory = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlerCreateCategory = async (payload: CategoryCreate) => {
        setError(null);
        setLoading(true);

        try {
            await createCategory(payload);
            return true;
        } catch (error) {
            setError((error as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        create: handlerCreateCategory,
        error,
        loading
    }
}
