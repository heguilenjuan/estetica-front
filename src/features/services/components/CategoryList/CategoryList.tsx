import { useState } from "react";
import { ButtonComponent } from "../../../../shared/components/atoms/button/Button";
import { useModal } from "../../../../shared/components/organisms/modal/hook/useModal";
import { ModalComponent } from "../../../../shared/components/organisms/modal/Modal";
import { useDeleteCategory, useGetCategories } from "../../hooks/useCategories";
import "../../styles/servicesList.style.css";
import { CategoryForm } from "../CategoryForm/CategoryForm";
import type { CategoryView } from "../../types/services.types";

export const CategoryList = () => {
    const { isOpen, open, close } = useModal();
    const { categories, loading, error, refresh } = useGetCategories();
    const { remove } = useDeleteCategory();
    const [editingItem, setEditingItem] = useState<CategoryView | null>(null);

    const handleOpenCreate = () => {
        setEditingItem(null);
        open();
    };

    const handleOpenEdit = (item: CategoryView) => {
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
        if (!window.confirm("¿Eliminar esta categoría?")) return;
        const ok = await remove(id);
        if (ok) refresh();
    };

    return (
        <>
            <div className="service-list">
                <div className="service-list-header">
                    <div className="service-list-header-info">
                        <h2 className="service-list-title">Categorias</h2>
                        <p className="service-list-count">{categories.length} categorias registradas</p>
                    </div>
                    <ButtonComponent type="button" onClick={handleOpenCreate} className="btn-service-new">
                        + Nueva Categoria
                    </ButtonComponent>
                </div>

                <div className="service-table-wrapper">
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Profesión</th>
                                <th>Ícono</th>
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
                            {!loading && !error && categories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="service-table-empty">No hay categorías registradas.</td>
                                </tr>
                            )}
                            {!loading && !error && categories.map((category) => (
                                <tr key={category.id} className="service-table-row">
                                    <td>{category.name}</td>
                                    <td>{category.professionName}</td>
                                    <td>{category.icon ?? "—"}</td>
                                    <td className="service-table-actions">
                                        <button
                                            type="button"
                                            className="service-action-btn service-action-edit"
                                            onClick={() => handleOpenEdit(category)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="service-action-btn service-action-delete"
                                            onClick={() => handleDelete(category.id)}
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
                    title={editingItem ? "Editar categoría" : "Nueva categoría"}
                >
                    <CategoryForm
                        onSuccess={handleSuccess}
                        initialData={editingItem ?? undefined}
                    />
                </ModalComponent>
            )}
        </>
    );
};
