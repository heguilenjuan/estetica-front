import type { ReactNode } from "react";
import HeaderComponent from "../components/organisms/header/Header";

type LayoutProps = {
    children: ReactNode;
}

const LayoutComponent = ({ children }: LayoutProps) => {
    return (
        <>
            <HeaderComponent />
            {children}
        </>
    )
}

export default LayoutComponent;