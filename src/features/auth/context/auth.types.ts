import type { User } from "../types/user.types";


export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export type AuthAction =
    | { type: "LOGIN_SUCCESS"; payload: User }
    | { type: "LOGOUT" }
    | { type: "REFRESH_SESSION"; payload: User }
    | { type: "START_LOADING" }
    | { type: "STOP_LOADING" };