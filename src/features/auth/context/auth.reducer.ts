import type { AuthState, AuthAction } from "./auth.types";

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    user:null,
    loading:true
}

export const authReducer = (
    state:AuthState,
    action:AuthAction
): AuthState => {
    switch (action.type){
        case "START_LOADING":
            return {...state, loading:true};
        case "STOP_LOADING":
            return {...state, loading:false};
        case "LOGIN_SUCCESS":
            return {
                isAuthenticated:true,
                user:action.payload,
                loading:false
            }
        case "REFRESH_SESSION":
            return{
                isAuthenticated:true,
                user: action.payload,
                loading:false
            }
        case "LOGOUT":
            return{
                isAuthenticated:false,
                user:null,
                loading:false
            }
        default:
            return state;
    }
}