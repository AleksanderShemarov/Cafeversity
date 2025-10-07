"use client";

import CardButton from "../CardParts/CardButton";
import ImageContainer from "../ImageEditor/ImageContainer";
import { startTransition, useEffect, useRef, useState } from "react";
import Image from "next/image";
import AdminHeaderOptions from "./AdminHeaderOptions";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IconDoorExit, IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { AdminHeaderTypes } from "@/app/(admin)/layout";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import saveAdminPageTheme from "@/app/actions/saveAdminPageTheme";


export default function AdminHeaderBlock({ data }: { data: AdminHeaderTypes }) {

    const [dark, setDark] = useState<"light"|"dark">(data.Theme);
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
    const [menuLineFocus, setMenuLineFocus] = useState<number|null>(null);

    const optionsRef = useRef<HTMLDivElement>(null);
    const optionsToggleRef = useRef<HTMLDivElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout|null>(null);

    // Routing to the greeting page (or admin's logging out)
    const router = useRouter();
    const greetHandle = async () => {
        const response = await fetch("http://localhost:3000/api/adminExit", {
            method: "GET",
            credentials: "include"
        });
        const responseData = await response.json();
        toast.success(responseData.message, { position: "top-center", style: { fontSize: "1.8rem" } });
        router.push(`/${data.Language}`);
    }

    // Checking a route path for showing admin's icon with hovering menu or an exit system button
    const routePath = usePathname();

    // Routing to the admin's setups page
    const setupsHandle = () => {
        const setUps = routePath.split("/");
        setUps[2] = "setups"
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

    const pageThemeHandler = () => {
        startTransition(async () => {
            const changed = await saveAdminPageTheme(dark);
            if (changed.success) {
                const newTheme = dark === "light" ? "dark" : "light";
                
                // 1. Обновляем локальное состояние
                setDark(newTheme);
                
                // 2. Обновляем localStorage
                localStorage.setItem('theme', newTheme);
                
                // 3. Триггерим custom event для синхронизации
                window.dispatchEvent(new CustomEvent('themeChange', {
                    detail: { theme: newTheme }
                }));
                
                // 4. Обновляем атрибут сразу
                document.documentElement.setAttribute('data-theme', newTheme);
                
                // 5. Soft refresh
                router.refresh();
            }
        });
    }

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
                    <CardButton
                        btnId={"light-dark-switcher"}
                        btnName={
                            <div style={{ position: "relative", width: "100%", height: "4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div key={dark}
                                        initial={{
                                            x: dark === "dark" ? -100 : 100,
                                            opacity: 0
                                        }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{
                                            x: dark === "dark" ? 100 : -100,
                                            opacity: 0
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        style={{
                                            display: "flex", alignItems: "center",
                                            gap: dark === "dark" ? "1.75rem" : "1rem",
                                            marginLeft: "0.5rem", marginRight: "0.5rem"
                                        }}
                                    >
                                    {dark === 'light' ? (
                                        <>
                                            <IconSunFilled style={{ height: "4rem", width: "4rem", color: "gold" }} />
                                            <p style={{ fontSize: "1.8rem", fontWeight: 600, margin: 0, color: "gold" }}>{adminHeader("AdminHeaderBlock.themes.light")}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p style={{ fontSize: "1.8rem", fontWeight: 600, margin: 0, color: "#E5E5E5" }}>{adminHeader("AdminHeaderBlock.themes.dark")}</p>
                                            <IconMoonFilled style={{ height: "3.5rem", width: "3.5rem", color: "#E5E5E5" }} />
                                        </>
                                    )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        }
                        clicker={pageThemeHandler}
                        style={{
                            paddingLeft: "6rem", paddingRight: "6rem",
                            color: dark !== 'dark' ? "whitesmoke" : "darkgray",
                            border: `2px solid ${dark !== 'dark' ? "gold" : "#E5E5E5"}`,
                            backgroundColor: "inherit",
                            cursor: "pointer",
                            borderRadius: "1rem",
                            height: "5rem",
                            width: "15rem",
                            overflow: "hidden",
                        }}
                    />

                    {routePath.split("/")[2] === "setups" ?
                        <button onClick={greetHandle}
                            style={{
                                border: "1px solid red", backgroundColor: "transparent",
                                color: "red", fontSize: "2rem", fontWeight: 600,
                                display: "inline-flex", flexDirection: "row", justifyContent: "space-between",
                                alignItems: "center", gap: "1rem", borderRadius: "1rem",
                                padding: "8px 16px", cursor: "pointer",
                            }}
                        >
                            <IconDoorExit style={{ color: "red" }} /> {adminHeader("AdminHeaderBlock.exit")}
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
