import { useRef, useState } from "react"
import type { Client } from "../types/client.types";
import { searchClients } from "../service/client.service";

export const useClientSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = async (value: string) => {
        setQuery(value);

        if (timeRef.current) clearTimeout(timeRef.current);

        if (!value.trim()) {
            setResults([])
            return;
        }

        timeRef.current = setTimeout(async () => {
            setLoading(true)
            try {
                const data = await searchClients(value);
                setResults(data);
            } finally {
                setLoading(false);
            }
        }, 300)

    };

    return { query, results, loading, handleSearch, setQuery, setResults }
}