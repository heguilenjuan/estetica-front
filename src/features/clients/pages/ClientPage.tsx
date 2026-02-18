import { LayoutComponent } from "../../../Layout"
import { SearchInput } from "../../../shared/components/atoms/search/SearchInput";
import { useClientSearch } from "../hooks/useClientSearch"
import type { Client } from "../models/client.model";
import '../styles/Clientpage.style.css'

export const ClientPage = () => {

    const { query, loading, handleSearch, results } = useClientSearch();

    return (
        <LayoutComponent>
            <div className="client-page">
                <div className="client-page-header">
                    <h1 className="client-page-title">Clientes</h1>
                    <SearchInput<Client>
                        placeholder="Buscar por nombre o apellido..."
                        value={query}
                        results={[]}
                        loading={loading}
                        onSearch={handleSearch}
                        renderItem={() => null}
                    />
                </div>

                <div className="client-table-wrapper">
                    <table className="client-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Teléfono</th>
                                <th>Fecha de nacimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={5} className="client-table-empty">
                                        Buscando...
                                    </td>
                                </tr>
                            )}
                            {!loading && results.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="client-table-empty">
                                        {query.trim() ? "No se encontraron clientes." : "Ingresá un nombre para buscar."}
                                    </td>
                                </tr>
                            )}
                            {results.map((client) => (
                                <tr key={client.id} className="client-table-row">
                                    <td>{client.name}</td>
                                    <td>{client.lastname}</td>
                                    <td>{client.phoneNumber}</td>
                                    <td>{client.birthDate instanceof Date ? client.birthDate.toLocaleDateString() : client.birthDate}</td>
                                    <td className="client-table-actions">
                                        <button
                                            type="button"
                                            className="client-action-btn client-action-view"
                                            title="Ver historial"
                                            onClick={() => {/* navigate to historial */ }}
                                        >
                                            Ver
                                        </button>
                                        <button
                                            type="button"
                                            className="client-action-btn client-action-edit"
                                            title="Editar cliente"
                                            onClick={() => {/* open edit modal */ }}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutComponent>
    )

}