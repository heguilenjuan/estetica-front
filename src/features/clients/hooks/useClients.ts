import { useEffect, useState } from "react"
import { getClients } from "../api/client.service";
import type { Client } from "../models/client.model";

export const useClients = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [clients, setClients] = useState<Client[]>([]);



    useEffect(() => {
        const fetchClients = async () => {
            setError(null);
            setLoading(true);

            try {
                const data = await getClients();
                setClients(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        }

        fetchClients()
    }, [])

    return {
        clients,
        error,
        loading
    }
}