"use client";

import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";


export default function Name_Exit({ name = "Імя", surname = "Прозвішча", role = "Стан (Роля)" }: { name?: string, surname?: string, role?: string }) {
    const router = useRouter();
    
    return (
        <div className="flex flex-row items-center gap-[3rem]">
            <div>
                <p className="text-[1.5rem] font-semibold">{name} {surname}</p>
                <p className="text-[1.2rem] text-right">{role}</p>
            </div>
            <button type="button"
                className="
                    flex flex-row items-center gap-[1rem] text-[1.8rem] rounded-[0.5rem]
                    hover:cursor-pointer hover:outline-2 hover:outline-black
                    focus:underline
                "
                onClick={() => router.push("/by")}
            >
                Выхад
                <IconLogout className="h-[3rem] w-[3rem] text-gray-600" />
            </button>
        </div>
    );
}
