import { useState } from "react"
import type { ClientUpdate } from "../types/client.types";

export const useUpdateClient = () => {
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlerUpdateClient = async(id:string, payload: ClientUpdate) => {
        setError(null);
        setLoading(true);

        try{
            await updateClient(id, payload)
        }catch (error){
            setError((error as Error).message)
        }finally{
            setLoading(false)
        }
    }

    return {
        update: handlerUpdateClient,
        error,
        loading
    }
}