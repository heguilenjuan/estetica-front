import { ButtonComponent } from "../../../../shared/components/atoms/button/Button";
import { useModal } from "../../../../shared/components/organisms/modal/hook/useModal";
import { ModalComponent } from "../../../../shared/components/organisms/modal/Modal";
import type { CategoryView, Profession, TreatmentView } from "../../types/services.types"
import { TreatmentForm } from "../TreatmentForm/TreatmentForm";

interface TreatmentListProps {
    treatments: TreatmentView[];
    categories: CategoryView[];
    professions: Profession[];
}

export const TreatmentList = () => {

    const { isOpen, open, close } = useModal();
    return (
        <>
            <div>
                <div>
                    <div>
                        datos de total activos e inactivos
                    </div>
                    <div>
                        <ButtonComponent
                            type="button"
                            onClick={open}
                        >
                            + Nuevo tratamiento
                        </ButtonComponent>
                    </div>
                </div>
            </div>
            <div>
                <p>Lista</p>
            </div>

            {!isOpen ? null :
                <ModalComponent isOpen={isOpen} onClose={close} title="Nuevo tratamiento">
                    <TreatmentForm onSuccess={close}/>
                </ModalComponent>
            }
        </>
    )
}