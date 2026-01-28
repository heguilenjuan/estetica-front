import type { User } from "../model/user.model"


export interface LoginResponse {
    token:string
    user:User
}

export const loginRequest = async (
    username:string,
    password:string
):Promise<LoginResponse> => {
    const res = await fetch('/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    if(!res.ok){
        let message = 'Error inesperado'
        try{
            const data = await res.json()
            message = data.message ?? message
        }catch{ /* empty */ }
        throw new Error(message)
    }   
    
    return res.json()
}