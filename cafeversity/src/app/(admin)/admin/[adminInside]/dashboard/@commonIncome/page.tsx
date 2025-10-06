"use client";

import dynamic from "next/dynamic";
import LoadingCommonIncome from "./loading";
const NivoChart = dynamic(
    () => import("@/components/Charts/Nivo"),
    {
        ssr: false,
        loading: () => <LoadingCommonIncome />
    }
);


export default function CommonIncome() {

    const cafesIncomes: Record<string, number> = {
        "Кафэ Гэрадоту": 400,
        "Кафэ Эдгара Кодду": 200,
        "Тэрмаядзернае Кафэ": 150,
    }

    return (
        <NivoChart cafesIncomes={cafesIncomes} />
    );
}
