import type { User } from "../models/user.model"


export interface LoginResponse {
    user: User
}

export const loginRequest = async (
    username: string,
    password: string
): Promise<LoginResponse> => {

    const res = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({ username, password })
    })

    if(!res.ok)throw new Error("Credenciales invalidas");
    
    return res.json();
}

export const meRequest = async () => {
    const res = await fetch("/me", {
        credentials: "include"
    })
    if(!res.ok) throw new Error("No session");
    
    return res.json();
}

export const logoutRequest = async() => {
    await fetch("/logout", {
        method:"POST",
        credentials:"include"
    });
}