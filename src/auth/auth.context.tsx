import { createContext } from "react";
import type { User } from "../models/user.model";
import type { AuthState } from "./auth.types";


interface AuthContextType {
    state: AuthState;
    logout: () => void;
    updateProfile: (data:Partial<User>) => void;
    refreshSession: () => void;
}

export const AuthContext = createContext<AuthContextType |undefined>(undefined);
