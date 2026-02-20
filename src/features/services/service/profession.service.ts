import type { Profession, ProfessionCreate } from "../types/services.types"

export const createProfession = async (payload: ProfessionCreate): Promise<Profession> => {
    const response = await fetch('/professions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
    })

    if (!response.ok) throw new Error("Profesión no creada");

    return response.json();
}
