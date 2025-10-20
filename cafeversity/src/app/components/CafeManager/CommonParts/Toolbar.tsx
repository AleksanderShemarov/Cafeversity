import Weather from "./Weather";
import {
    IconLayoutSidebarRightCollapse,
    // IconLayoutSidebarRightCollapseFilled,
    IconLogout
} from "@tabler/icons-react";
// import { useRouter } from "next/navigation";
// import { useState, Suspense } from "react";
import { Suspense } from "react";


export default function Toolbar() {

    // const router = useRouter();
    
    // const [isMenuOpen, setIsmenuOpen] = useState<boolean>(false);

    return (
        <div className="h-[7dvh] mb-[4rem] outline-2 outline-black relative">
            <div className="flex flex-row items-center justify-between absolute top-[50%] translate-y-[-50%] m-0 w-full pl-[1rem] pr-[1rem]">
                <Suspense fallback={<p className="text-[1.5rem] font-semibold">Загрузка...</p>}>
                    <Weather />
                </Suspense>

                <button type="button" className="flex flex-row items-center gap-[1rem] text-[1.8rem] hover:cursor-pointer"
                    // onClick={() => setIsmenuOpen(prev => !prev)}
                >
                    Меню
                    {/* {!isMenuOpen
                    ? <IconLayoutSidebarRightCollapse className="h-[3rem] w-[3rem] text-gray-600" />
                    : <IconLayoutSidebarRightCollapseFilled className="h-[3rem] w-[3rem] text-gray-600" />
                    } */}
                    <IconLayoutSidebarRightCollapse className="h-[3rem] w-[3rem] text-gray-600" />
                </button>{/* Use as the separate component!!! */}

                <div className="flex flex-row items-center gap-[3rem]">
                    <div>
                        <p className="text-[1.5rem] font-semibold">Імя Прозвішча</p>
                        <p className="text-[1.2rem] text-right">Стан (Роля)</p>
                    </div>
                    <button type="button" className="flex flex-row items-center gap-[1rem] text-[1.8rem] hover:cursor-pointer"
                        // onClick={() => router.push("/by")}
                    >
                        Выхад
                        <IconLogout className="h-[3rem] w-[3rem] text-gray-600" />
                    </button>
                </div>{/* Use as the separate component!!! */}
            </div>
        </div>
    );
}
