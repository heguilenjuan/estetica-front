import { LayoutComponent } from "../../../Layout"
import { TabService } from "../components/TabService"
import "../styles/servicesPage.style.css"

export const ServicesPage = () => {
    return (
        <LayoutComponent>
            <div className="services-page-header">
                <h1 className="services-page-title">Servicios</h1>
                <p className="services-page-subtitle">Administra las profesiones, categorias y tratamientos de tu negocio</p>
            </div>
            <TabService />
        </LayoutComponent>
    )
}
