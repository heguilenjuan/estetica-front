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
        setError(null);
        setLoading(true);

        try{
            if(!credentials.username || !credentials.password){
                setError("faltan credenciales")
                throw new Error("Missing credentials");
            }

            await new Promise(resolve => setTimeout(resolve, 2000))

            console.log("Has iniciado sesion tio.")
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