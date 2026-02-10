import { useReducer, useEffect } from 'react';
import { AuthContext } from './auth.context';
import { authReducer, initialAuthState } from './auth.reducer';
import type { User } from '../models/user.model';

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState)

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    }
    const refreshSession = async () => {
        try {
            //deberia vlaidar con backend
            const user = {} as User;
            dispatch({ type: "REFRESH_SESSION", payload: user })
        } catch {
            dispatch({ type: "LOGOUT" })
        }
    }

    const updateProfile = async (data: Partial<User>) => {
        const updatedUser: User = await patchUser(data);
        dispatch({ type: "UPDATE_PROFILE", payload: updatedUser })
    }
    useEffect(() => {
        refreshSession();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                state,
                logout,
                updateProfile,
                refreshSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}