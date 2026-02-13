import { useEffect, useState } from 'react';
import './Navbar.style.css'
import { ButtonComponent } from '../../atoms/button/Button';
import { useAuth } from '../../../../features/auth/hooks/useAuth';

export const NavbarComponent = () => {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKey = (e: { key: string; }) => e.key === 'Escape' && setOpen(false)
        if (open) window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open])

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);


    return (
        <>
            <button
                className='hamburger'
                aria-label={open ? "Cerrar menu" : "Abrir menu"}
                aria-controls='main-menu'
                aria-expanded={open}
                onClick={() => setOpen(isOpen => !isOpen)}
            >
                <span aria-hidden='true' />
                <span aria-hidden='true' />
                <span aria-hidden='true' />
            </button>
            <nav
                id='main-menu'
                className="hamburger-menu"
                aria-label='Menu principal'
                hidden={!open}
            >
                <ul>
                    <li>
                        <a href="">Clientes</a>
                    </li>
                    <li>
                        <a href="">Configuracion</a>
                    </li>
                    <li>
                        <a href="">Tratamientos</a>
                    </li>
                    <li>
                        <ButtonComponent
                            type='button'
                            onClick={() => logout()}
                        >
                            Cerrar sesion
                        </ButtonComponent>
                    </li>
                </ul>

            </nav>
        </>
    )
}