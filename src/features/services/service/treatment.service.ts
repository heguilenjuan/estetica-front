import type { Treatment, TreatmentCreate } from "../types/services.types"

export const createTreatment = async (payload: TreatmentCreate): Promise<Treatment> => {
    const response = await fetch('/treatments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
    })

    if (!response.ok) throw new Error("Tratamiento no creado");

    return response.json();
}
