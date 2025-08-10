"use client";

import CardButton from "@/components/CardParts/CardButton";
import HorizontalLine from "@/components/OtherParts/HorizontalLine";
import { IconChevronLeft, IconFileDescription } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";


export default function ShortMainDishInfoLayout({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const pathname = usePathname();

    console.log("ShortDishInfo pathname -->", pathname);

    const buttonsHandler = (btnId: string|number) => {
        if (btnId === "backBtn") {
            router.back();
        } else if (btnId === "detailsBtn") {
            window.location.href = pathname;
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
                backgroundColor: "#f2f2f2ff",
                outline: "1.5px solid white"
            }}>
                {children}
                <HorizontalLine cssProps={{ border: "1px solid black", marginLeft: "4rem", marginRight: "4rem" }} />
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-around", width: "100%", marginTop: "1rem" }}>
                    <CardButton btnId={"backBtn"}
                        btnName={
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem", color: "#f2f2f2ff", fontWeight: 600 }}>
                                <IconChevronLeft style={{ width: "3rem", height: "3rem", color: "#f2f2f2ff" }} /> Back
                            </div>
                        }
                        clicker={buttonsHandler}
                        style={{
                            backgroundColor: "red", fontSize: "2rem", padding: "5px 10px", borderRadius: "1rem", minWidth: "11.5rem", height: "5.4rem"
                        }}
                    />
                    <CardButton btnId={"detailsBtn"}
                        btnName={
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem", color: "#f2f2f2ff", fontWeight: 600 }}>
                                More... <IconFileDescription style={{ width: "3rem", height: "3rem", color: "#f2f2f2ff" }} />
                            </div>
                        }
                        clicker={buttonsHandler}
                        style={{
                            backgroundColor: "#FFBD03", fontSize: "2rem", padding: "5px 10px", borderRadius: "1rem", minWidth: "11.5rem", height: "5.4rem"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
