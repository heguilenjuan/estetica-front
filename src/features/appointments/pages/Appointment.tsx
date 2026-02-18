import { LayoutComponent } from "../../../Layout"
import { AppointmentForm } from "../components/AppointmentForm"
import { AppointmentSummary } from "../components/AppointmentSummary"
import '../styles/Appointment.styles.css'

export const AppointmentPage = () => {
    return (
        <LayoutComponent>
            <section className="appointment-container">
                <AppointmentForm />
                <AppointmentSummary />
            </section>
        </LayoutComponent>
    )
}