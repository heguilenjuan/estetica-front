import type { ChangeEvent } from "react";
import { ButtonComponent } from "../../components/molecules/button/Button";
import { InputComponent } from "../../components/molecules/input/Input";
import { useLogin } from "../../hooks/useLogin";

import './Login.styles.css'
import { useAuth } from "../../auth/useAuth";
import { Navigate } from "react-router-dom";


export const LoginPage = () => {
    const { setCredentials, loading, login, error } = useLogin();
    const {state} = useAuth();

    if(state.isAuthenticated){
        return <Navigate to="/dashboard" replace />;
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setCredentials(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <main>
            <form
                className="form-login"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    login();
                }}
            >
                <fieldset>
                    <legend>Iniciar sesion</legend>
                    <InputComponent
                        label='Usuario: '
                        name='username'
                        id='username'
                        type='text'
                        placeholder='cachito28'
                        onChange={handleChange}
                        defaultValue=''

                    />
                    <InputComponent
                        label='Contraseña:'
                        name='password'
                        id='password'
                        type='password'
                        placeholder='**************'
                        onChange={handleChange}
                        defaultValue=''
                        error={error ? error : undefined}
                    />
                    <ButtonComponent
                        loading={loading}
                        type='submit'
                    >
                        Ingresar
                    </ButtonComponent>
                </fieldset>
            </form>
        </main>
    )
}