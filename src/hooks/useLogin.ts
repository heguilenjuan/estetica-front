import { useState } from "react";


interface LoginCredentials {
    user:string;
    password:string;
}


export const useLogin = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        user: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    const login = async () => {
        setLoading(true);
        setError(null);

        try{
            if(!credentials.user || !credentials.password){
                throw new Error("Missing credentials");
            }
        } catch(err){
            setError((err as Error).message)
        }finally{
            setLoading(false)
        }
    }

    return {
        setCredentials,
        error,
        loading
    }
}