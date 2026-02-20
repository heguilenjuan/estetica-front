import { useState } from "react"
import type { ProfessionCreate } from "../types/services.types"
import { createProfession } from "../service/profession.service"

export const useCreateProfession = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlerCreateProfession = async (payload: ProfessionCreate) => {
        setError(null);
        setLoading(true);

        try {
            await createProfession(payload);
            return true;
        } catch (error) {
            setError((error as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        create: handlerCreateProfession,
        error,
        loading
    }
}
