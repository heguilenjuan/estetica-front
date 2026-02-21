import { SearchInput } from "../../../shared/components/atoms/search/SearchInput";
import type { Client } from "../../clients/types/client.types";
import { useClientSelector } from "../hooks/useClientSelector"

export const ClientSelector = () => {
    const { query, results, loading, handleSearch, handleSelect } = useClientSelector();

    return (
        <div>
            <SearchInput<Client>
                placeholder="Busca por Nombre o DNI"
                value={query}
                results={results}
                loading={loading}
                onSearch={handleSearch}
                renderItem={(client: Client) => (
                    <span onClick={() => handleSelect(client)}>
                        {client.name} {client.lastName} — {client.dni}
                    </span>
                )}
            />

      {/*       {selectedClient && (
                <p>
                    ✓ {selectedClient.name} {selectedClient.lastname} seleccionado
                </p>
            )} */}
        </div>
    )
}