import type { Profession, ProfessionCreate } from "../types/services.types";

export const getProfessions = async (): Promise<Profession[]> => {
    const res = await fetch('/professions', { credentials: 'include' });
    if (!res.ok) throw new Error("Error al obtener profesiones");
    return res.json();
};

export const createProfession = async (payload: ProfessionCreate): Promise<Profession> => {
    const res = await fetch('/professions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Error al crear profesión");
    return res.json();
};

export const updateProfession = async (id: string, payload: Partial<ProfessionCreate>): Promise<Profession> => {
    const res = await fetch(`/professions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Error al actualizar profesión");
    return res.json();
};

export const deleteProfession = async (id: string): Promise<void> => {
    const res = await fetch(`/professions/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok) throw new Error("Error al eliminar profesión");
};
