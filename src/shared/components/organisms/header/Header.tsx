import { Avatar } from "../../atoms/avatar/Avatar";
import { NavbarComponent } from "../navbar/Navbar";
import { Link } from "react-router-dom";
import './Header.style.css'
import { useAuth } from "../../../../features/auth/hooks/useAuth";

export const HeaderComponent = () => {
    const { state } = useAuth()
    const nameUser = state ? state.user?.name: "";
    const lastNameUser = state ? state.user?.lastname: "";

    return (
        <header className="header-box">
            <div className="header-grid">
                <Link className="header-logo" to={"/"}>
                   LOGO
                </Link>
                <div className="header-right">
                    <Avatar />
                    <p>{nameUser} {lastNameUser}</p>
                    <NavbarComponent />
                </div>
            </div>
        </header>
    )
}