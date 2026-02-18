import { SearchInput } from "../../../shared/components/atoms/search/SearchInput";
import type { Client } from "../../clients/models/client.model";
import { useClientSelector } from "../hooks/useClientSelector"

export const ClientSelector = () => {
    const { query, results, loading, selectedClient, handleSearch, handleSelect } = useClientSelector();

    return (
        <div>
            <SearchInput<Client>
                placeholder="Busca por nombre o dni"
                value={query}
                results={results}
                loading={loading}
                onSearch={handleSearch}
                renderItem={(client: Client) => (
                    <span onClick={() => handleSelect(client)}>
                        {client.name} {client.lastname} — {client.phoneNumber}
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