import { useCallback, useRef, useState } from "react";
import { TabsContext } from "../../../context/TabsContext";

interface TabsProps {
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

export const Tabs = ({
    defaultValue,
    value,
    onChange,
    children,
    className
}: TabsProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const [tabValues, setTabValues] = useState<string[]>([]);

    const activeTab = value ?? internalValue;

    const setActiveTab = useCallback((newValue: string) => {
        if (!value) setInternalValue(newValue);
        onChange?.(newValue);
    }, [value, onChange])

    const registerTab = useCallback((tabValue: string) => {
        setTabValues(prev => {
            if (prev.includes(tabValue)) return prev;
            return [...prev, tabValue];
        });
    }, []);
    return (
        <TabsContext.Provider
            value={{
                activeTab,
                setActiveTab,
                registerTab,
                tabValues
            }}
        >
            <div className={`tabs ${className ?? ""}`}>
                {children}
            </div>
        </TabsContext.Provider>
    )
}