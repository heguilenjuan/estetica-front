import { LayoutComponent } from "../../../Layout"
import { SearchInput } from "../../../shared/components/atoms/search/SearchInput";
import { useClients } from "../hooks/useClients";
import { useClientSearch } from "../hooks/useClientSearch";
import type { Client } from "../models/client.model";
import '../styles/Clientpage.style.css'

export const ClientPage = () => {
    const { clients, loading: loadingAll } = useClients();
    const { query, loading: loadingSearch, handleSearch, results } = useClientSearch();

    const displayedClients = query.trim() ? results : clients;
    const loading = loadingAll || loadingSearch;

    return (
        <LayoutComponent>
            <div className="client-page">
                <div className="client-page-header">
                    <h1 className="client-page-title">Clientes</h1>
                    <SearchInput<Client>
                        placeholder="Buscar por nombre o apellido..."
                        value={query}
                        results={[]}
                        loading={loadingSearch}
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
                                    <td colSpan={5} className="client-table-empty">Cargando...</td>
                                </tr>
                            )}
                            {!loading && displayedClients.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="client-table-empty">
                                        {query.trim() ? "No se encontraron clientes." : "No hay clientes registrados."}
                                    </td>
                                </tr>
                            )}
                            {!loading && displayedClients.map((client) => (
                                <tr key={client.id} className="client-table-row">
                                    <td>{client.name}</td>
                                    <td>{client.lastname}</td>
                                    <td>{client.phoneNumber}</td>
                                    <td>{client.birthDate}</td>
                                    <td className="client-table-actions">
                                        <button type="button" className="client-action-btn client-action-view">Ver</button>
                                        <button type="button" className="client-action-btn client-action-edit">Editar</button>
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