import { useState } from "react";
import { ButtonComponent } from "../../../../shared/components/atoms/button/Button";
import { useModal } from "../../../../shared/components/organisms/modal/hook/useModal";
import { ModalComponent } from "../../../../shared/components/organisms/modal/Modal";
import { useDeleteProfession, useProfessions } from "../../hooks/useProfession";
import "../../styles/servicesList.style.css";
import { ProfessionForm } from "../ProfessionForm/ProfessionForm";
import type { Profession } from "../../types/services.types";

export const ProfessionList = () => {
    const { isOpen, open, close } = useModal();
    const { professions, loading, error, refresh } = useProfessions();
    const { remove } = useDeleteProfession();
    const [editingItem, setEditingItem] = useState<Profession | null>(null);

    const handleOpenCreate = () => {
        setEditingItem(null);
        open();
    };

    const handleOpenEdit = (item: Profession) => {
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
        if (!window.confirm("¿Eliminar esta profesión?")) return;
        const ok = await remove(id);
        if (ok) refresh();
    };

    return (
        <>
            <div className="service-list">
                <div className="service-list-header">
                    <div className="service-list-header-info">
                        <h2 className="service-list-title">Profesiones</h2>
                        <p className="service-list-count">{professions.length} profesiones registradas</p>
                    </div>
                    <ButtonComponent type="button" onClick={handleOpenCreate} className="btn-service-new">
                        + Nueva Profesion
                    </ButtonComponent>
                </div>

                <div className="service-table-wrapper">
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th>Color</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={4} className="service-table-empty">Cargando...</td>
                                </tr>
                            )}
                            {error && (
                                <tr>
                                    <td colSpan={4} className="service-table-empty">{error}</td>
                                </tr>
                            )}
                            {!loading && !error && professions.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="service-table-empty">No hay profesiones registradas.</td>
                                </tr>
                            )}
                            {!loading && !error && professions.map((profession) => (
                                <tr key={profession.id} className="service-table-row">
                                    <td>
                                        {profession.color
                                            ? <span className="service-color-dot" style={{ backgroundColor: profession.color }} />
                                            : "—"}
                                    </td>
                                    <td>{profession.name}</td>
                                    <td>{profession.description ?? "—"}</td>
                                    <td className="service-table-actions">
                                        <button
                                            type="button"
                                            className="service-action-btn service-action-edit"
                                            onClick={() => handleOpenEdit(profession)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="service-action-btn service-action-delete"
                                            onClick={() => handleDelete(profession.id)}
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
                    title={editingItem ? "Editar profesión" : "Nueva profesión"}
                >
                    <ProfessionForm
                        onSuccess={handleSuccess}
                        initialData={editingItem ?? undefined}
                    />
                </ModalComponent>
            )}
        </>
    );
};
