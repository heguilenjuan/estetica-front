import NavbarComponent from "../navbar/Navbar";
import './Header.style.css'

const HeaderComponent = () => {
    return (
        <header className="header-box">
            <div className="header-grid">
                <a className="header-logo">
                    logo app si existiera
                </a>
                <div>
                    <span>Logeado arre</span>
                    <NavbarComponent />
                </div>
            </div>

        </header>
    )
}

export default HeaderComponent;