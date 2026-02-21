import { useEffect } from "react";
import { useTabsContext } from "../../../context/TabsContext";
import { TabIcon } from "../tabIcon/TabIcon";
import "./TabTrigger.style.css";

interface TabTriggerProps {
    value: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    disabled?: boolean;
}

export const TabTrigger = ({
    value,
    icon,
    children,
    disabled
}: TabTriggerProps) => {

    const { activeTab, setActiveTab, registerTab } = useTabsContext()
    const isActive = activeTab === value;

    useEffect(() => {
        registerTab(value)
    }, [value, registerTab])

    return (
        <button
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${value}`}
            id={`tab-${value}`}
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            aria-disabled={disabled}
            onClick={() => !disabled && setActiveTab(value)}

            className={`tab-trigger ${isActive ? "tab-trigger--active" : ""} ${disabled ? "tab-trigger--disabled" : ""}`}
        >
            {icon && <TabIcon icon={icon} />}
            <span>{children}</span>
        </button>
    )

}