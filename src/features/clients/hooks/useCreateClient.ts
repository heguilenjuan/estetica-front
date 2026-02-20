import { useState } from "react"
import type { ClientCreate } from "../types/client.types"
import { createClient } from "../service/client.service";

export const useCreateClient = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlerCreateClient = async (payload:ClientCreate) => {
        setError(null);
        setLoading(true);

        try {
            await createClient(payload);
            return true

        } catch (error) {
            setError((error as Error).message);
            return false
        } finally {
            setLoading(false);
        }
    }

    return {
        create: handlerCreateClient,
        error,
        loading
    }

}