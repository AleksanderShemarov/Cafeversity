"use client";

import { forwardRef, ForwardRefExoticComponent, RefAttributes, useState } from "react";
import ImageContainer from "../ImageEditor/ImageContainer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon, IconClipboardText, IconCoffee, IconDumpling, IconProps, IconChartPie3, IconUsersGroup } from "@tabler/icons-react";


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
            { id: 1, text: adminHeaderOptions("AdminHeaderOptions.dashboard"), icon: IconChartPie3, url: `${page.slice(0, page.lastIndexOf("/"))}/dashboard` },
            { id: 2, text: adminHeaderOptions("AdminHeaderOptions.usersPanel"), icon: IconUsersGroup, url: `${page.slice(0, page.lastIndexOf("/"))}/usersPanel` },
            { id: 3, text: adminHeaderOptions("AdminHeaderOptions.cafesPanel"), icon: IconCoffee, url: `${page.slice(0, page.lastIndexOf("/"))}/cafesPanel` },
            { id: 4, text: adminHeaderOptions("AdminHeaderOptions.dishesPanel"), icon: IconDumpling, url: `${page.slice(0, page.lastIndexOf("/"))}/dishesPanel` },
            { id: 5, text: adminHeaderOptions("AdminHeaderOptions.ordersPanel"), icon: IconClipboardText, url: `${page.slice(0, page.lastIndexOf("/"))}/ordersPanel` },
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
                            <Link key={index} href={pageName.url === page ? "#" : pageName.url} style={{
                                // outline: "2px dotted orange",
                                minWidth: "fit-content",
                                position: "relative",
                                borderRadius: "1rem",
                                boxShadow: pageName.url === page ? "none" : "var(--admin-option-box-shadow)",
                                backgroundColor: pageName.url === page ? "var(--admin-choisen-option-background)" : "none",
                            }}>
                                <div onMouseEnter={() => pageName.url !== page && setIsHoveredItem(pageName.id)} onMouseLeave={() => setIsHoveredItem(null)}
                                    onClick={() => pageName.url === page ? {} : setIsOptionsOpen(false)}
                                    style={{
                                        padding: "1.5rem 0.5rem", position: "relative",
                                        height: "6.4rem",
                                        cursor: pageName.url === page ? "not-allowed" : "pointer",
                                        width: "auto",
                                    }}
                                >
                                    <p
                                        style={{
                                            visibility: "hidden",
                                            fontSize: "2rem",
                                            fontWeight: "400",
                                            margin: "0 0 0 0",
                                            textAlign: "center",
                                            whiteSpace: "wrap",
                                            height: "0",
                                            opacity: 0,
                                            pointerEvents: "none"
                                        }}
                                    >
                                        {pageName.text}
                                    </p>

                                    <motion.div
                                        initial={false}
                                        animate={{ top: isHoveredItem === pageName.id ? "5%" : "20%"}}
                                        transition={{ type: "spring", stiffness: 300 }}

                                        style={{
                                            width: "5rem",
                                            position: "absolute",
                                            left: "50%",
                                            transform: "translateX(-50%)",
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
                                            marginTop: 0, marginBottom: 0,
                                            margin: "0 auto",
                                            backgroundColor: "inherit",
                                        }}>
                                            <pageName.icon style={{ height: "5rem", width: "5rem", color: "var(--admin-icon-option-color)" }} />
                                        </div>
                                        }
                                    </motion.div>
                                    <motion.p
                                        initial={false}
                                        animate={{
                                            opacity: isHoveredItem === pageName.id ? 1 : 0,
                                            bottom: isHoveredItem === pageName.id ? "5%" : "50%",
                                        }}

                                        style={{
                                            margin: "0 0 0 0",
                                            textAlign: "center",
                                            fontSize: "2rem",
                                            fontWeight: "400",
                                            position: "absolute",
                                            textWrap: "nowrap",
                                            color: "var(--admin-icon-option-color)",
                                            width: "fit-content",
                                            left: "50%",
                                            transform: "translateX(-50%)",
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
