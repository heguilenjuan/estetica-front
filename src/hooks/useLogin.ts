import { useState } from "react";


interface LoginCredentials {
    username:string;
    password:string;
}


export const useLogin = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    const login = async () => {
        setLoading(true);
        setError(null);
        try{
            if(!credentials.username || !credentials.password){
                setError("faltan credenciales")
                throw new Error("Missing credentials");
            }
            console.log("haz iniciado sesion tio")

        } catch(err){
            setError((err as Error).message)
        }finally{
            setLoading(false)
        }
    }

    return {
        setCredentials,
        error,
        loading,
        login
    }
}