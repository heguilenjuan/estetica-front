import { TabPanel } from "../../../shared/components/atoms/tabPanel/TabPanel"
import { TabTrigger } from "../../../shared/components/atoms/tabTrigger/TabTrigger"
import { TabList } from "../../../shared/components/molecule/tabList/TabList"
import { Tabs } from "../../../shared/components/molecule/tabs/Tabs"
import { CategoryList } from "./CategoryList/CategoryList"
import { ProfessionList } from "./ProfessionList/ProfessionList"
import { TreatmentList } from "./TreatmentList/TreatmentList"


export const TabService = () => {
    return (
        <Tabs defaultValue="treatments">
            <TabList aria-label="Configuracion de tratamientos">
                <TabTrigger value="treatments" >
                    Tratamientos
                </TabTrigger>
                <TabTrigger value="category">
                    Categorias
                </TabTrigger>
                <TabTrigger value="profession">
                    Profesiones
                </TabTrigger>
            </TabList>

            <TabPanel value="treatments">
                <TreatmentList />
            </TabPanel>

            <TabPanel value="category">
                <CategoryList />
            </TabPanel>

            <TabPanel value="profession">
                <ProfessionList />
            </TabPanel>
        </Tabs>
    )
}