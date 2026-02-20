import { useTabsContext } from "../../../context/TabsContext";

interface TabPanelProps{
    value:string;
    children: React.ReactNode;
    keepMounted?: boolean
}

export const TabPanel = ({
    value,
    children,
    keepMounted
}:TabPanelProps) => {
    const {activeTab} = useTabsContext();
    const isActive = activeTab === value;

    if(!isActive && !keepMounted) return null;

    return(
        <div
            role="tabpanel"
            aria-labelledby={`tab-${value}`}
            id={`tabpanel-${value}`}
            tabIndex={0}
            hidden={!isActive && keepMounted}
            className="tab-panel"
        >
            {children}
        </div>
    )
}