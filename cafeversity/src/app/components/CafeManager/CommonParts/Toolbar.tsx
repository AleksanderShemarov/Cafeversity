import Weather from "./Weather";
import { Suspense } from "react";
import MenuButton from "./MenuButton";
import Name_Exit from "./Name_Exit";


export default function Toolbar({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-[7dvh] mb-[4rem] outline-2 outline-black relative">
            <div className="flex flex-row items-center justify-between absolute top-[50%] translate-y-[-50%] m-0 w-full pl-[1rem] pr-[1rem]">
                <Suspense fallback={<p className="text-[1.5rem] font-semibold">Загрузка...</p>}>
                    <Weather />
                </Suspense>

                <MenuButton />

                <Name_Exit />
            </div>

            {children}
        </div>
    );
}
