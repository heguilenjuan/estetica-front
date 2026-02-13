import { useState } from "react"
import type { ClientCreate } from "../models/client.model"
import { createClient } from "../api/client.service";

export const useClient = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlerCreateClient = async (payload:ClientCreate) => {
        setError(null);
        setLoading(true);

        try {
            await createClient(payload);

        } catch (error) {
            setError((error as Error).message);
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