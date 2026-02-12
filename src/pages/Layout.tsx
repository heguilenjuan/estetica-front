import type { ReactNode } from "react";
import { HeaderComponent } from "../components/organisms/header/Header";

type LayoutProps = {
    children: ReactNode;
}

export const LayoutComponent = ({ children }: LayoutProps) => {
    return (
        <div style={{ "width": "100dvw" }}>
            <HeaderComponent />
            <main style={{ "width": "80%", "margin": "2rem auto" }}>
                {children}
            </main>
        </div>
    )
}