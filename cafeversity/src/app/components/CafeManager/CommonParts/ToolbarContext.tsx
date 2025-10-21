"use client";

import { createContext, useState } from "react";


interface NavigationContextType {
    isMenuOpen: boolean,
    navigationToggle: () => void,
}


export const ToolbarContext = createContext<NavigationContextType>(null!);


export default function ToolbarProvider({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsmenuOpen] = useState<boolean>(false);
    const navigationToggle = () => setIsmenuOpen(prev => !prev);
    
    return (
        <ToolbarContext.Provider value={{ isMenuOpen, navigationToggle }}>
            {children}
        </ToolbarContext.Provider>
    );
}
