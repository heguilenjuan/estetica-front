import { useState } from "react"
import type { TreatmentCreate } from "../types/services.types"
import { createTreatment } from "../service/treatment.service"

export const useCreateTreatment = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlerCreateTreatment = async (payload: TreatmentCreate) => {
        setError(null);
        setLoading(true);

        try {
            await createTreatment(payload);
            return true;
        } catch (error) {
            setError((error as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        create: handlerCreateTreatment,
        error,
        loading
    }
}
