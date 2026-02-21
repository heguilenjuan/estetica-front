import { useRef } from "react";
import { useTabsContext } from "../../../context/TabsContext";

interface TabListProps {
    children: React.ReactNode;
    "aria-label": string;
}

export const TabList = ({ children, "aria-label": ariaLabel }: TabListProps) => {
    const { tabValues, setActiveTab, activeTab } = useTabsContext();
    const listRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const currentIndex = tabValues.indexOf(activeTab);
        let nextIndex: number | null = null;

        switch (e.key) {
            case "ArrowRight":
                nextIndex = (currentIndex + 1) % tabValues.length;
                break;
            case "ArrowLeft":
                nextIndex = (currentIndex - 1 + tabValues.length) % tabValues.length;
                break;
            case "Home":
                nextIndex = 0;
                break;
            case "End":
                nextIndex = tabValues.length - 1;
                break;
            default:
                return;
        }

        if (nextIndex !== null) {
            e.preventDefault();
            const nextValue = tabValues[nextIndex]
            setActiveTab(nextValue)

            const nextButton = listRef.current?.querySelector<HTMLButtonElement>(`#tab-${nextValue}`);
            nextButton?.focus();
        }
    }

    return(
        <div
            role="tablist"
            aria-label={ariaLabel}
            ref={listRef}
            onKeyDown={handleKeyDown}
            className="tab-list"
        >
            {children}
        </div>
    )
}