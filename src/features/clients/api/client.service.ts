import type { Client, ClientCreate, ClientUpdate } from "../models/client.model"

/* export const getClients = async() => {

}

export const getClient = async ({id}) => {

} */

export const createClient = async (payload: ClientCreate):Promise<Client> => {
    
    const response = await fetch('/clients', {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            name: payload.name, 
            lastname: payload.lastname,
            birthDate: payload.birthDate,
            phoneNumber: payload.phoneNumber
        })
    })

    if(!response.ok) throw new Error("User not created");

    return response.json();
}

export const updateClient = async (id: string, payload: ClientUpdate): Promise<Client> => {
    const response = await fetch(`/clients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
    });

    if(!response.ok) throw new Error("Client not updated");

    return response.json();
}