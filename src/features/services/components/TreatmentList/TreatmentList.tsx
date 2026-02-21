import { useMemo, useState } from "react";
import { ButtonComponent } from "../../../../shared/components/atoms/button/Button";
import { useModal } from "../../../../shared/components/organisms/modal/hook/useModal";
import { ModalComponent } from "../../../../shared/components/organisms/modal/Modal";
import { useDeleteTreatment, useGetTreatments } from "../../hooks/useTreatments";
import "../../styles/servicesList.style.css";
import { TreatmentForm } from "../TreatmentForm/TreatmentForm";
import type { TreatmentView } from "../../types/services.types";

const ListIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);

const SearchIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export const TreatmentList = () => {
    const { isOpen, open, close } = useModal();
    const { treatments, loading, error, refresh } = useGetTreatments();
    const [editingItem, setEditingItem] = useState<TreatmentView | null>(null);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const stats = useMemo(() => ({
        total: treatments.length,
        active: treatments.filter(t => t.isActive).length,
        inactive: treatments.filter(t => !t.isActive).length,
    }), [treatments]);

    const categories = useMemo(() => {
        const unique = Array.from(new Set(treatments.map(t => t.categoryName)));
        return unique.sort();
    }, [treatments]);

    const filtered = useMemo(() => {
        return treatments.filter(t => {
            const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
            const matchCategory = categoryFilter === "all" || t.categoryName === categoryFilter;
            return matchSearch && matchCategory;
        });
    }, [treatments, search, categoryFilter]);

    const handleOpenCreate = () => {
        setEditingItem(null);
        open?.();
    };

    const handleOpenEdit = (item: TreatmentView) => {
        setEditingItem(item);
        open?.();
    };

    const handleClose = () => {
        close();
        setEditingItem(null);
    };

    const handleSuccess = () => {
        handleClose();
        refresh();
    };

    const { remove } = useDeleteTreatment();

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Eliminar este tratamiento?")) return;
        const ok = await remove(id);
        if (ok) refresh();
    };

    return (
        <>
            <div className="service-list">
                <div className="service-list-header">
                    <div className="service-list-header-info">
                        <h2 className="service-list-title">Tratamientos</h2>
                    </div>
                </div>

                {!loading && !error && (
                    <div className="service-stats-row">
                        <div className="service-stat-badge">
                            <ListIcon />
                            <span className="service-stat-num">{stats.total}</span>
                            <span className="service-stat-label">total</span>
                        </div>
                        <div className="service-stat-badge">
                            <span className="service-stat-dot service-stat-dot--active" />
                            <span className="service-stat-num">{stats.active}</span>
                            <span className="service-stat-label">activos</span>
                        </div>
                        <div className="service-stat-badge">
                            <span className="service-stat-dot service-stat-dot--inactive" />
                            <span className="service-stat-num">{stats.inactive}</span>
                            <span className="service-stat-label">inactivos</span>
                        </div>
                    </div>
                )}

                <div className="service-box-filter">                
                    <div className="service-filter-row">
                           
                    <div className="service-search-wrapper">
                        <span className="service-search-icon"><SearchIcon /></span>
                        <input
                            type="text"
                            className="service-search-input"
                            placeholder="Buscar tratamiento..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="service-category-select"
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                    >
                        <option value="all">Todas</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    </div> 
                    <ButtonComponent type="button" onClick={handleOpenCreate} className="btn-service-new">
                        + Nuevo Tratamiento
                    </ButtonComponent>
                </div>

                <div className="service-table-wrapper">
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Profesión</th>
                                <th>Precio</th>
                                <th>Duración</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={7} className="service-table-empty">Cargando...</td>
                                </tr>
                            )}
                            {error && (
                                <tr>
                                    <td colSpan={7} className="service-table-empty">{error}</td>
                                </tr>
                            )}
                            {!loading && !error && filtered.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="service-table-empty">
                                        {treatments.length === 0
                                            ? "No hay tratamientos registrados."
                                            : "No se encontraron tratamientos con ese filtro."}
                                    </td>
                                </tr>
                            )}
                            {!loading && !error && filtered.map((treatment) => (
                                <tr key={treatment.id} className="service-table-row">
                                    <td>{treatment.name}</td>
                                    <td>{treatment.categoryName}</td>
                                    <td>{treatment.professionName}</td>
                                    <td>${treatment.price.toLocaleString()}</td>
                                    <td>{treatment.durationMin} min</td>
                                    <td>
                                        <span className={treatment.isActive ? "service-badge-active" : "service-badge-inactive"}>
                                            {treatment.isActive ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    <td className="service-table-actions">
                                        <button
                                            type="button"
                                            className="service-action-btn service-action-edit"
                                            onClick={() => handleOpenEdit(treatment)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="service-action-btn service-action-delete"
                                            onClick={() => handleDelete(treatment.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isOpen && (
                <ModalComponent
                    isOpen={isOpen}
                    onClose={handleClose}
                    title={editingItem ? "Editar tratamiento" : "Nuevo tratamiento"}
                >
                    <TreatmentForm
                        onSuccess={handleSuccess}
                        initialData={editingItem ?? undefined}
                    />
                </ModalComponent>
            )}
        </>
    );
};
