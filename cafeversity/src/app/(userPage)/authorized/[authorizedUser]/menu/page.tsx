"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function MenuPage() {

    const pathname = usePathname();

    return (
        <>
            <p style={{ fontSize: "2rem", fontWeight: "700" }}>Menu page for authorized users.</p>
            <Link href={pathname.substring(0, pathname.lastIndexOf("/"))} style={{ fontSize: "1.8rem" }}>
                To the general page
            </Link>
        </>
    );
}
