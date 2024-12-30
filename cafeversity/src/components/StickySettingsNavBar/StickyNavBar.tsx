import { ReactNode } from "react";
import stickyStyles from "@/components/StickySettingsNavBar/StickyNavBar.module.css";   


export default function StickyNavBar({ navbarName, children }: { navbarName: string, children: ReactNode }) {
    return (
        <div id={stickyStyles.sticky_navbar}>
            <p id={stickyStyles.sticky_navbar_name}>{navbarName}</p>
            <hr />
            <div id={stickyStyles.sticky_navbar_links}>
                {children}
            </div>
        </div>
    )
}