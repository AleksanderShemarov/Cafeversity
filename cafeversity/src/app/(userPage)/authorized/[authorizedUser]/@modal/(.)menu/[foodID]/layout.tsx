"use client";

import CardButton from "@/components/CardParts/CardButton";
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
            zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "center"
        }}>
            <div style={{
                minHeight: "65vh", width: "60vw",
                borderRadius: "2rem", padding: "2rem",
                backgroundColor: "#9f9f9fff",
                outline: "1.5px solid white"
            }}>
                {children}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem" }}>
                    <CardButton btnId={"backBtn"}
                        btnName={
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem", color: "red" }}>
                                <IconChevronLeft style={{ width: "3rem", height: "3rem", color: "red" }} /> Back
                            </div>
                        }
                        clicker={buttonsHandler}
                        style={{
                            border: "2px solid red", backgroundColor: undefined, fontSize: "1.8rem",
                            color: "black", padding: "5px 10px", borderRadius: "1rem",
                            minWidth: "10rem", height: "40px"
                        }}
                    />
                    <CardButton btnId={"detailsBtn"}
                        btnName={
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem" }}>
                                More... <IconFileDescription style={{ width: "3rem", height: "3rem", color: "black" }} />
                            </div>
                        }
                        clicker={buttonsHandler}
                        style={{
                            border: "2px solid black", backgroundColor: undefined, fontSize: "1.8rem",
                            color: "black", padding: "5px 10px", borderRadius: "1rem",
                            minWidth: "12rem", height: "40px"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
