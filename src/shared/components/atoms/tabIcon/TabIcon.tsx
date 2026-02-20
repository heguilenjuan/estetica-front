interface TabIconProps {
    icon: React.ReactNode;
}

export const TabIcon = ({ icon }: TabIconProps) => {
    return (
        <span
            aria-label="true"
            className="tab-icon"
        >
            {icon}
        </span>
    )
}