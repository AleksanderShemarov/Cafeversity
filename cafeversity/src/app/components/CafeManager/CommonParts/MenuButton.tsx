"use client";

import { IconLayoutSidebarRightCollapse, IconLayoutSidebarRightCollapseFilled } from "@tabler/icons-react";
import { ToolbarContext } from "./ToolbarContext";
import { useContext } from "react";


export default function MenuButton() {
    
    const { isMenuOpen, navigationToggle } = useContext(ToolbarContext);
    
    return (
        <button type="button" name="menu-button"
            className={`
                flex flex-row items-center gap-[1rem] text-[1.8rem]
                rounded-[0.5rem] px-[0.5rem] py-[0.2rem]
                ${isMenuOpen ? "inset-shadow-[0px_0px_2px_1px_#000000]" : ""}
                hover:cursor-pointer ${isMenuOpen ? "" : "hover:shadow-[0px_0px_2px_1px_#000000]"}
            `}
            onClick={navigationToggle}
        >
            Меню
            {
                !isMenuOpen
                ? <IconLayoutSidebarRightCollapse className="h-[3rem] w-[3rem] text-gray-600" />
                : <IconLayoutSidebarRightCollapseFilled className="h-[3rem] w-[3rem] text-gray-600" />
            }
        </button>
    );
}
