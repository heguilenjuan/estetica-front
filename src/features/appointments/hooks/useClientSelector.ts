import { useState } from "react";
import type { Client } from "../../clients/models/client.model";
import { useClientSearch } from "../../clients/hooks/useClientSearch";


interface UseClientSelectorReturn {
    query: string;
    results: Client[];
    loading: boolean;
    selectedClient: Client | null;
    handleSearch: (value: string) => void;
    handleSelect: (cliuent: Client) => void;
}

export const useClientSelector = (): UseClientSelectorReturn => {
    const { query, results, loading, handleSearch, setQuery, setResults } = useClientSearch();
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const handleSelect = async (client: Client) => {
        setSelectedClient(client);
        setQuery(`${client.name} ${client.lastname}`)
        setResults([])
    }

    return {
        selectedClient,
        handleSelect,
        results,
        query,
        loading,
        handleSearch,
    }
}