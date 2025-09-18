"use client";

import { forwardRef, ForwardRefExoticComponent, RefAttributes, useState } from "react";
import ImageContainer from "../ImageEditor/ImageContainer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon, IconClipboardText, IconCoffee, IconDumpling, IconProps } from "@tabler/icons-react";


interface AdminHeaderOptionsProps {
    isOptionsOpen: boolean,
    setIsOptionsOpen: (value: boolean) => void,
}

const AdminHeaderOptions = forwardRef<HTMLDivElement, AdminHeaderOptionsProps>(
    function AdminHeaderOptions({ isOptionsOpen, setIsOptionsOpen }, ref) {

        const adminHeaderOptions = useTranslations("AdminDashboard");
        
        const page = usePathname();

        const [isHoveredItem, setIsHoveredItem] = useState<number|null>(null);

        const pageNames: { id: number, text: string, icon: string|ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>, url: string }[] = [
            { id: 1, text: adminHeaderOptions("AdminHeaderOptions.dashboard"), icon: "/dashboard_icon.jpg", url: `${page.slice(0, page.lastIndexOf("/"))}/dashboard` },
            { id: 2, text: adminHeaderOptions("AdminHeaderOptions.usersPanel"), icon: "/users_icon.png", url: `${page.slice(0, page.lastIndexOf("/"))}/usersPanel` },
            { id: 3, text: "Панель Кафэ", icon: IconCoffee, url: `${page.slice(0, page.lastIndexOf("/"))}/cafesPanel` },
            { id: 4, text: "Панель Страў", icon: IconDumpling, url: `${page.slice(0, page.lastIndexOf("/"))}/dishesPanel` },
            { id: 5, text: "Панель Замоў", icon: IconClipboardText, url: `${page.slice(0, page.lastIndexOf("/"))}/ordersPanel` },
        ];

        return (
            <AnimatePresence>
                { isOptionsOpen &&
                    <motion.div ref={ref}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}

                        style={{
                            maxWidth: "100%", backgroundColor: "rgba(184, 135, 11, 0.215)", padding: "2rem 5rem",
                            position: "absolute", left: 0, right: 0,
                            marginTop: "0.5rem", zIndex: 1, backdropFilter: "blur(1rem)",
                            overflow: "hidden"
                        }}
                    >
                        <div style={{
                            display: "flex", flexDirection: "row", flexWrap: "wrap",
                            justifyContent: "space-between", alignItems: "center",
                            width: "100%"
                        }}>
                            {pageNames.map((pageName, index) => 
                            <Link key={index} href={pageName.url === page ? "#" : pageName.url}>
                                <div onMouseEnter={() => setIsHoveredItem(pageName.id)} onMouseLeave={() => setIsHoveredItem(null)}
                                    onClick={() => pageName.url === page ? {} : setIsOptionsOpen(false)}
                                    style={{
                                        // border: "2px solid",
                                        display: "flex", flexDirection: "column", alignItems: "center",
                                        padding: "1.5rem 5rem", position: "relative",
                                        // height: "5rem",
                                        height: "6.4rem", marginLeft: "1rem", marginRight: "1rem",
                                        cursor: pageName.url === page ? "default" : "pointer"
                                    }}
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{ top: isHoveredItem === pageName.id ? 0 : "20%"}}
                                        transition={{ type: "spring", stiffness: 300 }}

                                        style={{
                                            width: "5rem",
                                            position: "absolute"
                                        }}
                                    >
                                        {typeof pageName.icon === "string"
                                        ?
                                        <ImageContainer img_path={pageName.icon}
                                            style={{
                                                height: "90%", width: "90%",
                                                marginTop: 0, marginBottom: 0,
                                                margin: "0 auto",
                                                boxShadow: "wheat 0 0 2px 3px",
                                                backgroundColor: "whitesmoke"
                                            }}
                                        />
                                        :
                                        <div style={{
                                            // height: "90%", width: "100%",
                                            marginTop: 0, marginBottom: 0,
                                            margin: "0 auto",
                                            boxShadow: "wheat 0 0 2px 3px",
                                            backgroundColor: "whitesmoke",
                                            borderRadius: "50%",
                                        }}>
                                            <pageName.icon style={{ height: "5rem", width: "5rem", color: "black" }} />
                                        </div>
                                        }
                                    </motion.div>
                                    <motion.p
                                        initial={false}
                                        animate={{
                                            opacity: isHoveredItem === pageName.id ? 1 : 0,
                                            bottom: isHoveredItem === pageName.id ? 0 : "50%",
                                        }}

                                        style={{
                                            margin: "1rem 0 0 0",
                                            textAlign: "center",
                                            fontSize: "2rem",
                                            fontWeight: "400",
                                            position: "absolute",
                                            textWrap: "wrap",
                                            color: "black",
                                            width: "180%"
                                        }}
                                    >
                                        {pageName.text}
                                    </motion.p>
                                </div>
                            </Link>
                            )}
                        </div>
                    </motion.div>
                }
            </AnimatePresence> 
        );
    }
);

export default AdminHeaderOptions;
