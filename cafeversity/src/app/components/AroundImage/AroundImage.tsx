"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconChevronLeft, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState, startTransition } from "react";
import toggleFavourite from "@/app/actions/toggleFavourite";
import { toast } from "react-toastify";


export default function AroundImage({ liked, children }: { liked: boolean, children: React.ReactNode }) {

    const pathname = usePathname();
    const lastIdx = pathname.lastIndexOf("/");

    const [hovered, setHovered] = useState<boolean>(false);
    const [favourite, setFavourite] = useState<boolean>(liked);

    const putInOutOfFavourable = () => {
        startTransition(async () => {
            const parts = pathname.split("/");
            const userName = parts[2];
            const dishID = pathname.slice(lastIdx + 1);

            const result = await toggleFavourite(userName, Number(dishID));
            if (result.success) {
                setFavourite(prev => !prev);
                toast.success(result.message, { position: "top-right", style: { fontSize: "1.8rem" } });
            } else {
                toast.error(result.message, { position: "top-right", style: { fontSize: "1.8rem" } });
            }
        });
    }

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <div onMouseEnter={() => setHovered(prev => !prev)} onMouseLeave={() => setHovered(prev => !prev)}>
                <Link href={pathname.slice(0, lastIdx)}>
                    <IconChevronLeft style={{
                        height: "6.5rem", width: "6.5rem", padding: "0.5rem",
                        borderRadius: "50%", backgroundColor: "skyblue", color: "white",
                        boxShadow: hovered ? "0px 0px 18px 1px rgba(66, 68, 90, 1)" : "none"
                    }} />
                </Link>
            </div>
            {children}
            <div onClick={putInOutOfFavourable}>
                {favourite
                ? <IconHeartFilled style={{
                    height: "6.5rem", width: "6.5rem", padding: "0.5rem", borderRadius: "50%", color: "red"
                }} />
                : <IconHeart style={{
                    height: "6.5rem", width: "6.5rem", padding: "0.5rem", borderRadius: "50%", color: "red"
                }} />}
            </div>
        </div>
    );
}