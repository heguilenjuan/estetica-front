import { Avatar } from "../../molecules/avatar/Avatar";
import NavbarComponent from "../navbar/Navbar";
import './Header.style.css'

const HeaderComponent = () => {
    return (
        <header className="header-box">
            <div className="header-grid">
                <a className="header-logo">
                    logo app si existiera
                </a>
                <div className="header-right">
                    <span>Logeado arre</span>
                    <NavbarComponent />
                    <Avatar/>
                </div>
            </div>

        </header>
    )
}

export default HeaderComponent;