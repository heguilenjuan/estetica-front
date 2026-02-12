import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface Props {
    allowedRoles: string[];
}

export const RoleRoutes = ({ allowedRoles }: Props) => {
    const { state } = useAuth();

    console.log(state.user?.role)
    if (!state || !allowedRoles.includes(state.user?.role || "")) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />

}