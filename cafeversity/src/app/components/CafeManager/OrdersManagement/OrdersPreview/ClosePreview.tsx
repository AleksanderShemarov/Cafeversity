"use client";

import { useRouter, useSearchParams } from "next/navigation";


export default function ClosePreviewButton() {

    const router = useRouter();
    const searchParams = useSearchParams();

    function clearPreview() {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('selected');
        router.replace(`?${params.toString()}`, { scroll: false });
    }

    return (
        <button type="button"
            className="
                text-[1.6rem] font-semibold rounded-[0.5rem] px-[0.75rem] py-[0.5rem]
                text-[white] bg-red-500
                hover:cursor-pointer hover:text-red-500 hover:bg-[white] hover:outline-2 hover:outline-red-500
            "
            onClick={clearPreview}
        >
            Зачыніць
        </button>
    );
}
