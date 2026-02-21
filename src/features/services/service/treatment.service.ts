import type { Treatment, TreatmentCreate, TreatmentView } from "../types/services.types";

export const getTreatments = async (): Promise<TreatmentView[]> => {
    const res = await fetch('/treatments', { credentials: 'include' });
    if (!res.ok) throw new Error("Error al obtener tratamientos");
    return res.json();
};

export const createTreatment = async (payload: TreatmentCreate): Promise<Treatment> => {
    const res = await fetch('/treatments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Error al crear tratamiento");
    return res.json();
};

export const updateTreatment = async (id: string, payload: Partial<TreatmentCreate>): Promise<Treatment> => {
    const res = await fetch(`/treatments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Error al actualizar tratamiento");
    return res.json();
};

export const deleteTreatment = async (id: string): Promise<void> => {
    const res = await fetch(`/treatments/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok) throw new Error("Error al eliminar tratamiento");
};
