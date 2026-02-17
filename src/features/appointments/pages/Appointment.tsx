import { LayoutComponent } from "../../../Layout"
import { AppointmentForm } from "../components/AppointmentForm"
import { AppointmentSummary } from "../components/AppointmentSummary"

export const AppointmentPage = () => {
    return (
        <LayoutComponent>
            <div>
                <AppointmentForm />
                <AppointmentSummary />

            </div>
        </LayoutComponent>
    )
}