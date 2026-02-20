import { createContext, useContext } from "react";

interface TabsContextValue {
    activeTab: string;
    setActiveTab: (value: string) => void;
    registerTab: (value: string) => void;
    tabValues: string[];
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
    const ctx = useContext(TabsContext)
    if (!ctx) throw new Error(("useTabsContext debe usarse dentro de <Tabs>"));
    return ctx;
}