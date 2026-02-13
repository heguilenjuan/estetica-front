import { createContext } from "react";
import type { AuthState } from "./auth.types";


interface AuthContextType {
    state: AuthState;
    login:(username:string, password:string ) => Promise<void>;
    logout: () => Promise<void>;
    refreshSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType |undefined>(undefined);
