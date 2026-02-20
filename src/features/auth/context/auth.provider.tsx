import { useEffect, useReducer, type ReactNode } from "react";

import { AuthContext } from "./auth.context";
import { loginRequest, logoutRequest, meRequest } from "../service/auth.service";
import { authReducer, initialAuthState } from "./auth.reducer";

export function AuthProvider({children}:{children:ReactNode}){
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    const login = async (username:string, password:string) => {
        dispatch({type: "START_LOADING"});

        const data = await loginRequest(username, password);
        
        dispatch({
            type:"LOGIN_SUCCESS",
            payload:data.user
        });
    };

    const logout = async () => {
        await logoutRequest();
        dispatch({type: "LOGOUT"});
    }

    const refreshSession = async () => {
        try{
            const data = await meRequest();
            dispatch({type: "REFRESH_SESSION", payload:data.user})
        } catch{
            dispatch({type: "LOGOUT"})
        }
    }

    useEffect(() => {
        refreshSession();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                logout,
                refreshSession
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}