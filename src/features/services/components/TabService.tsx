import { TabPanel } from "../../../shared/components/atoms/tabPanel/TabPanel"
import { TabTrigger } from "../../../shared/components/atoms/tabTrigger/TabTrigger"
import { TabList } from "../../../shared/components/molecule/tabList/TabList"
import { Tabs } from "../../../shared/components/molecule/tabs/Tabs"
import { CategoryList } from "./CategoryList/CategoryList"
import { ProfessionList } from "./ProfessionList/ProfessionList"
import { TreatmentList } from "./TreatmentList/TreatmentList"

const BriefcaseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
)

const FolderIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
)

const ListIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
)

export const TabService = () => {
    return (
        <Tabs defaultValue="profession">
            <TabList aria-label="Configuracion de servicios">
                <TabTrigger value="profession" icon={<BriefcaseIcon />}>
                    Profesiones
                </TabTrigger>
                <TabTrigger value="category" icon={<FolderIcon />}>
                    Categorias
                </TabTrigger>
                <TabTrigger value="treatments" icon={<ListIcon />}>
                    Tratamientos
                </TabTrigger>
            </TabList>

            <TabPanel value="profession">
                <ProfessionList />
            </TabPanel>

            <TabPanel value="category">
                <CategoryList />
            </TabPanel>

            <TabPanel value="treatments">
                <TreatmentList />
            </TabPanel>
        </Tabs>
    )
}
