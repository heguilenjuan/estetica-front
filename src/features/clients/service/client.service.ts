import type { Client, ClientCreate, ClientUpdate } from "../types/client.types"

export const getClients = async (): Promise<Client[]> => {
    const response = await fetch('/clients', {
        credentials: 'include'
    })

    if (!response.ok) throw new Error(`Error ${response.status}: no se pudieron obtener datos de los clientes`);

    return response.json();
}

export const createClient = async (payload: ClientCreate): Promise<Client> => {

    const response = await fetch('/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
    })

    if (!response.ok) throw new Error("User not created");

    return response.json();
}

export const searchClients = async (query: string): Promise<Client[]> => {
    const response = await fetch(`/clients/search?q=${encodeURIComponent(query)}`, {
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error(`Error ${response.status}: no se pudo buscar clientes`)
    }

    return response.json();
}

export const updateClient = async (id:string, payload:ClientUpdate):Promise<Client> => {
    const response = await fetch(`/clients/${id}`,{
        method:'PATCH',
        headers:{'Content-type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(payload)
    });

    if(!response.ok) throw new Error("Cliente not updated")

    return response.json();
}