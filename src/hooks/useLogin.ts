import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth.service";
import { useAuth } from "../auth/useAuth";

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
    const { login } = useAuth();

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        try {
            await login(credentials.username, credentials.password)
            navigate("/dashboard");

        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return {
        credentials,
        setCredentials,
        error,
        loading,
        login:handleLogin
    };
};
