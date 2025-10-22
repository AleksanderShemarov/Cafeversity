"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ToolbarContext } from "./ToolbarContext";
import { IconReportAnalytics, IconChefHat, IconListCheck } from "@tabler/icons-react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";


export default function Navbar() {
    const navbarRef = useRef<HTMLDivElement>(null);
    const { isMenuOpen, navigationToggle } = useContext(ToolbarContext);
    const [ mounted, setMounted ] = useState<boolean>(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted) return;

        const handleClickOutside = (event: MouseEvent) => {
            const isMenuButton = (event.target as Element)?.closest('button[name="menu-button"]');

            if (navbarRef.current && !navbarRef.current.contains(event.target as Node) && !isMenuButton) {
                navigationToggle();
            }
        };

        if (isMenuOpen) {
                document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [mounted, isMenuOpen, navigationToggle]);

    if (!mounted) return null;

    return createPortal(
        (<AnimatePresence mode="wait">
            {isMenuOpen && (
                <motion.div ref={navbarRef} className="h-[100dvh] w-[35dvw] fixed top-0 right-0 z-50 bg-white/30 backdrop-blur-[7px] outline-1 outline-amber-100"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ 
                        ease: "easeInOut",
                        duration: 0.5
                    }}
                >
                    <motion.div className="h-[100%] flex flex-col justify-around content-around items-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="w-[75%] h-[18%] flex justify-center items-center gap-[1.25rem] bg-[#f0f0f0] rounded-[2.5rem] text-[2rem] font-semibold align-middle text-center hover:cursor-pointer hover:shadow-[0px_0px_21px_3px_#000000]">
                            <IconReportAnalytics className="w-[5rem] h-[5rem] text-black" />
                            Графікі & Справаздачы
                        </div>
                        <div className="w-[75%] h-[18%] flex justify-center items-center gap-[1.25rem] bg-[#f0f0f0] rounded-[2.5rem] text-[2rem] font-semibold align-middle text-center hover:cursor-pointer hover:shadow-[0px_0px_21px_3px_#000000]">
                            <IconChefHat className="w-[5rem] h-[5rem] text-black" />
                            Варка & Сэрвіроўка {/* Наяўнасць Страў */}
                        </div>
                        <div className="w-[75%] h-[18%] flex justify-center items-center gap-[1.25rem] bg-[#f0f0f0] rounded-[2.5rem] text-[2rem] font-semibold align-middle text-center hover:cursor-pointer hover:shadow-[0px_0px_21px_3px_#000000]">
                            <IconListCheck className="w-[5rem] h-[5rem] text-black" />
                            Апрацоўка Замоў
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>),
    document.body);
}
