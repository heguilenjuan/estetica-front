import type { AuthAction, AuthState } from "./auth.types";

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    
}
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                isAuthenticated: true,
                user: action.payload
            }
        case "LOGOUT":
            return {
                isAuthenticated: false,
                user: null
            };
        case "UPDATE_PROFILE":
            return {
                ...state,
                user: state.user ? { ...state.user, ...action.payload } : null
            }
        case "REFRESH_SESSION":
            return {
                isAuthenticated: true,
                user: action.payload
            };
        default:
            return state;
    }
}
