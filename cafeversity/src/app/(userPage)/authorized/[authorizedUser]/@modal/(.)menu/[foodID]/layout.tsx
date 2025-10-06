"use client";

import CardButton from "@/components/CardParts/CardButton";
import HorizontalLine from "@/components/OtherParts/HorizontalLine";
import { IconChevronLeft, IconFileDescription } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";


export default function ShortMainDishInfoLayout({ children }: { children: React.ReactNode }) {

    const dishShortInfoButtons = useTranslations("UserChoisenDishShortInfo.buttons");

    const router = useRouter();
    const pathname = usePathname();

    const [hoveredBtn, setHoveredBtn] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const buttonsHandler = (btnId: string|number) => {
        if (btnId === "backBtn") {
            router.back();
        } else if (btnId === "detailsBtn") {
            setLoading(true);
            setTimeout(() => {
                window.location.href = pathname;
            }, 250);
        }
    }

    return (
        <div style={{
            position: "fixed", inset: 0,
            backgroundColor: "#00000050",
            zIndex: 50, backdropFilter: "blur(2px)",
            display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <div style={{
                minHeight: "60vh", width: "60vw",
                borderRadius: "2rem", padding: "2rem",
                backgroundColor: "var(--short-info-background-color)",
                outline: "1.5px solid white"
            }}>
                {children}
                <HorizontalLine cssProps={{ border: "1px solid var(--short-info-horizontal-line-color)", marginLeft: "4rem", marginRight: "4rem" }} />
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-around", width: "100%", marginTop: "1rem" }}>
                    <CardButton btnId={"backBtn"}
                        btnName={
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "1.5rem", fontWeight: 600,
                                color: hoveredBtn === "backBtn" ? "red" : "var(--short-info-background-color)",
                            }}>
                                <IconChevronLeft style={{ width: "3rem", height: "3rem", color: hoveredBtn === "backBtn" ? "red" : "var(--short-info-background-color)" }} /> {dishShortInfoButtons("back")}
                            </div>
                        }
                        clicker={buttonsHandler}
                        hovering={() => setHoveredBtn("backBtn")}
                        leaving={() => setHoveredBtn("")}
                        style={{
                            backgroundColor: loading ? "red" : hoveredBtn === "backBtn" ? "inherit" : "red",
                            outline: loading ? "none" : hoveredBtn === "backBtn" ? "2px solid red" : "none",
                            cursor: loading ? "not-allowed" : hoveredBtn === "backBtn" ? "pointer" : "auto",
                            fontSize: "2rem", padding: "5px 10px", borderRadius: "1rem", minWidth: "11.5rem", height: "5.4rem"
                        }}
                        disabled={loading}
                    />
                    <CardButton btnId={"detailsBtn"}
                        btnName={
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "1.5rem", fontWeight: 600,
                                color: loading ? "var(--short-info-background-color)" : hoveredBtn === "detailsBtn" ? "#FFBD03" : "var(--short-info-background-color)",
                            }}>
                                {loading ? (
                                    <div style={{ 
                                        width: "2rem", 
                                        height: "2rem", 
                                        border: "2px solid transparent",
                                        borderTop: "2px solid currentColor",
                                        borderRadius: "50%",
                                        animation: "spin 1s linear infinite"
                                    }} />
                                ) : (
                                <>
                                    {dishShortInfoButtons("more")} <IconFileDescription style={{ width: "3rem", height: "3rem", color: hoveredBtn === "detailsBtn" ? "#FFBD03" : "var(--short-info-background-color)" }} />
                                </>
                                )}
                            </div>
                        }
                        clicker={buttonsHandler}
                        hovering={() => !loading ? setHoveredBtn("detailsBtn") : setHoveredBtn("")}
                        leaving={() => setHoveredBtn("")}
                        style={{
                            backgroundColor: loading ? "#FFBD03" : hoveredBtn === "detailsBtn" ? "inherit" : "#FFBD03",
                            outline: loading ? "none" : hoveredBtn === "detailsBtn" ? "2px solid #FFBD03" : "none",
                            cursor: loading ? "not-allowed" : hoveredBtn === "detailsBtn" ? "pointer" : "auto",
                            fontSize: "2rem", padding: "5px 10px", borderRadius: "1rem", minWidth: "11.5rem", height: "5.4rem",
                        }}
                        disabled={loading}
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
