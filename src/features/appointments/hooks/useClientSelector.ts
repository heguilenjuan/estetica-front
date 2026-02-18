import { useState, useRef } from "react";
import type { Client } from "../../clients/models/client.model";
import { searchClients } from "../../clients/api/client.service";


interface UseClientSelectorReturn {
    query: string;
    results: Client[];
    loading: boolean;
    selectedClient: Client | null;
    handleSearch: (value: string) => void;
    handleSelect: (cliuent: Client) => void;
}

export const useClientSelector = (): UseClientSelectorReturn => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = async (value: string) => {
        setQuery(value);
        setSelectedClient(null);

        if (timerRef.current) clearTimeout(timerRef.current);

        if (!value.trim()) {
            setResults([])
            return;
        }

        timerRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await searchClients(value);
                setResults(data)
            } finally {
                setLoading(false);
            }
        },)
    };

    const handleSelect = async (client: Client) => {
        setSelectedClient(client);
        setQuery(`${client.name} ${client.lastname}`)
        setResults([])
    }

    return {
        query,
        results,
        loading,
        selectedClient,
        handleSearch,
        handleSelect,
    }


}