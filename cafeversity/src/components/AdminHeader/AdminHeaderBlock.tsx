"use client";

import AccessBtn from "../Buttons/DifferentButtons"
import ImageContainer from "../ImageEditor/ImageContainer"
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AdminHeaderOptions from "./AdminHeaderOptions";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IconDoorExit } from "@tabler/icons-react";
import { AdminHeaderTypes } from "@/app/(admin)/admin/[adminInside]/layout";
import { useTranslations } from "next-intl";


export default function AdminHeaderBlock({ data }: { data: AdminHeaderTypes }) {

    const [dark, setDark] = useState<string>(data.Theme);
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
    const [menuLineFocus, setMenuLineFocus] = useState<number|null>(null);

    const optionsRef = useRef<HTMLDivElement>(null);
    const optionsToggleRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout|null>(null);

    // Routing to the greeting page (or admin's logging out)
    const router = useRouter();
    const greetHandle = () => {
        router.push("/en");
    }

    // Checking a route path for showing admin's icon with hovering menu or an exit system button
    const routePath = usePathname();

    // Routing to the admin's setups page
    const setupsHandle = () => {
        // clearHoverTimeout();
        // setIsMenuVisible(false);
        const setUps = routePath.split("/");
        setUps[3] = "setups"
        router.push(setUps.join("/"));
    }

    // Clearing the timeout timer for before showing and hiding the hidden menu
    const clearHoverTimeout = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    }

    // Showing the hidden menu
    const showMenu = () => {
        clearHoverTimeout();
        setIsMenuVisible(true);
    }

    // Hiding the hidden menu
    const hideMenu = () => {
        clearHoverTimeout();
        hoverTimeoutRef.current = setTimeout(
            () => setIsMenuVisible(false), 300
        );
    }

    useEffect(() => {
        if (!isOptionsOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            const isClickOnOptions = optionsRef.current?.contains(target);
            const isClickOnButton = optionsToggleRef.current?.contains(target);

            if (!isClickOnOptions && !isClickOnButton) {
                setIsOptionsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOptionsOpen]);

    const adminHeader = useTranslations("AdminDashboard");

    return (
        <>
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "1rem 2.5rem", borderRadius: "1rem", backgroundColor: "#B8860B",
            }}>
                <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "4rem", cursor: "pointer" }}
                        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                        ref={optionsToggleRef}
                    >
                        <ImageContainer img_path="/menu_list_icon.webp" style={{
                            height: "90%", width: "90%",
                            marginTop: 0, marginBottom: 0,
                            boxShadow: "wheat 0 0 2px 3px",
                            margin: "0 auto",
                            backgroundColor: "whitesmoke"
                        }} />
                    </div>
                    <p style={{ fontSize: "3rem", margin: 0 }}>{adminHeader("AdminHeaderBlock.title")}</p>
                </div>
                <div style={{ display: "inline-flex", justifyContent: "space-between", alignItems: "center", gap: "4.5rem" }}>
                    <AccessBtn
                        buttonName={
                            dark !== 'light'
                            ? adminHeader("AdminHeaderBlock.themes.light")
                            : adminHeader("AdminHeaderBlock.themes.dark")
                        }
                        onClick={() => {
                            if (dark === 'light') {
                                setDark('dark');
                                alert("DARK THEME");
                            } else {
                                setDark('light');
                                alert("LIGHT THEME");
                            }
                        }}
                        additionalStyle={{
                            paddingLeft: "6rem", paddingRight: "6rem",
                            backgroundColor: dark !== 'light' ? "whitesmoke" : "darkgray",
                            color: dark !== 'dark' ? "whitesmoke" : "darkgray",
                            boxShadow: "gray 0 0 3px 2px",
                            cursor: "pointer"
                        }}
                    />

                    {routePath.split("/")[3] === "setups" ?
                        <button onClick={greetHandle}
                            style={{
                                border: "1px solid red", backgroundColor: "transparent",
                                color: "red", fontSize: "2rem", fontWeight: 600,
                                display: "inline-flex", flexDirection: "row", justifyContent: "space-between",
                                alignItems: "center", gap: "1rem", borderRadius: "1rem",
                                padding: "8px 16px", cursor: "pointer",
                            }}
                        >
                            <IconDoorExit style={{ color: "red" }} /> Exit
                        </button>
                    :
                        <div onMouseEnter={showMenu} onMouseLeave={hideMenu}
                            style={{ width: "7.5rem", position: "relative" }}
                        >
                            <ImageContainer img_path={data.Photo === "" ? null : data.Photo} style={{
                                height: "90%", width: "90%",
                                marginTop: 0, marginBottom: 0,
                                boxShadow: "black 0 0 2px 3px",
                                margin: "0 auto"
                            }} />

                            <AnimatePresence>
                            {isMenuVisible && 
                                // Zone with email, "settings' page" button and "signing out" button
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isMenuVisible ? 1 : 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}

                                    style={{
                                        position: "absolute", display: "flex", outline: "2px solid lightgray", right: "-1rem",
                                        background: "whitesmoke", borderRadius: "1.5rem", paddingLeft: "0.5rem",
                                        paddingRight: "0.5rem", top: "6.9rem", flexDirection: "column",
                                        zIndex: 10
                                    }}
                                    onMouseEnter={showMenu}
                                    onMouseLeave={hideMenu}
                                >
                                    <div style={{
                                        display: "inline-flex", justifyContent: "flex-start", alignItems: "center", gap: "1rem",
                                        // outline: "1px solid"
                                    }}>
                                        <Image src="/email_icon.jpg" alt="Email Icon" width={30} height={30}
                                            style={{ borderRadius: "0.5rem", background: "whitesmoke" }}
                                        >
                                        </Image>
                                        <p style={{ fontSize: "1.5rem" }}>{data.Email}</p>
                                    </div>
                                    <div id="menuLine1"
                                        style={{
                                            display: "inline-flex", justifyContent: "flex-start", alignItems: "center", gap: "1rem",
                                            // outline: "1px double"
                                            cursor: "pointer", background: menuLineFocus === 1 ? "lightgray" : "none",
                                            borderRadius: "1rem"
                                        }}
                                        onClick={setupsHandle}
                                        tabIndex={0}
                                        onMouseEnter={() => setMenuLineFocus(1)}
                                        onMouseLeave={() => setMenuLineFocus(null)}
                                    >
                                        <Image src="/settings-gear.png" alt="Sets Icon" width={30} height={30}
                                            style={{ borderRadius: "0.5rem", background: menuLineFocus === 1 ? "lightgray" : "whitesmoke" }}
                                        >
                                        </Image>
                                        <p style={{ fontSize: "1.5rem" }}>{adminHeader("AdminHeaderBlock.settings")}</p>
                                    </div>
                                    <div id="menuLine2"
                                        style={{
                                            display: "inline-flex", justifyContent: "flex-start", alignItems: "center", gap: "1rem",
                                            // outline: "1px dashed",
                                            cursor: "pointer", background: menuLineFocus === 2 ? "lightgray" : "none",
                                            borderRadius: "1rem"
                                        }}
                                        onClick={greetHandle}
                                        tabIndex={0}
                                        onMouseEnter={() => setMenuLineFocus(2)}
                                        onMouseLeave={() => setMenuLineFocus(null)}
                                    >
                                        <Image src="/exit_icon.png" alt="Exit Icon" width={30} height={30}
                                            style={{ borderRadius: "0.5rem", background: menuLineFocus === 2 ? "lightgray" : "whitesmoke" }}
                                        >
                                        </Image>
                                        <p style={{ fontSize: "1.5rem" }}>{adminHeader("AdminHeaderBlock.exit")}</p>
                                    </div>
                                </motion.div>
                            }
                            </AnimatePresence>
                        </div>
                    }
                </div>
            </div>

            <AdminHeaderOptions ref={optionsRef} isOptionsOpen={isOptionsOpen} setIsOptionsOpen={setIsOptionsOpen} />
        </>
    )
}
