import { useState } from "react";
import { ButtonComponent } from "../../../../shared/components/atoms/button/Button";
import { useModal } from "../../../../shared/components/organisms/modal/hook/useModal";
import { ModalComponent } from "../../../../shared/components/organisms/modal/Modal";
import { useDeleteTreatment, useGetTreatments } from "../../hooks/useTreatments";
import "../../styles/servicesList.style.css";
import { TreatmentForm } from "../TreatmentForm/TreatmentForm";
import type { TreatmentView } from "../../types/services.types";

export const TreatmentList = () => {
    const { isOpen, open, close } = useModal();
    const { treatments, loading, error, refresh } = useGetTreatments();
    const { remove } = useDeleteTreatment();
    const [editingItem, setEditingItem] = useState<TreatmentView | null>(null);

    const handleOpenCreate = () => {
        setEditingItem(null);
        open();
    };

    const handleOpenEdit = (item: TreatmentView) => {
        setEditingItem(item);
        open();
    };

    const handleClose = () => {
        close();
        setEditingItem(null);
    };

    const handleSuccess = () => {
        handleClose();
        refresh();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Eliminar este tratamiento?")) return;
        const ok = await remove(id);
        if (ok) refresh();
    };

    return (
        <>
            <div className="service-list">
                <div className="service-list-header">
                    <ButtonComponent type="button" onClick={handleOpenCreate}>
                        + Nuevo tratamiento
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
                            {!loading && !error && treatments.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="service-table-empty">No hay tratamientos registrados.</td>
                                </tr>
                            )}
                            {!loading && !error && treatments.map((treatment) => (
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
