import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth.service";


interface LoginCredentials {
    username: string;
    password: string;
}


export const useLogin = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        username: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const login = async () => {
        setError(null);
        setLoading(true);

        try {
            const data = await loginRequest(credentials.username, credentials.password);
            if (data.token) {
                navigate("/dashboard", { replace: true })
            }
        } catch (err) {
            setError((err as Error).message)
        } finally {
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